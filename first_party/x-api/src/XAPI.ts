import {
  APIs,
  defaultFeatures,
  defaultVariables,
  MAX_GIF_SIZE,
  MAX_IMAGE_SIZE,
  MAX_VIDEO_SIZE,
} from './constants';
import * as cookie from './cookie';
import type { CreateTweet } from './types';

export interface XApiOptions {
  cookie?: string;
  v1Api?: string;
  v2Api?: string;
  resourceApi?: string;
  graphqlApi?: string;
  debug?: boolean;
  httpClient?: any;
}

interface RequestInitEx extends RequestInit {
  params?: Record<string, unknown> | undefined;
}

export class XApi {
  private readonly _opt: Required<XApiOptions>;
  private readonly _cookies: Record<string, unknown>;
  private readonly logger: typeof console;

  constructor(options?: XApiOptions) {
    this._opt = Object.assign(
      {},
      {
        v1Api: 'https://api.twitter.com/1.1',
        v2Api: 'https://api.twitter.com/2',
        graphqlApi: 'https://twitter.com/i/api/graphql',
        resourceApi: 'https://upload.twitter.com/1.1/media/upload.json',
        debug: false,
        httpClient: self.fetch.bind(window),
      },
      options,
    ) as Required<XApiOptions>;

    this.logger = Object.create(console);
    if (this._opt.debug) this.logger = {} as unknown as typeof console;
    this._cookies = cookie.parse(this._opt.cookie);
  }

  private request(input: RequestInfo | URL, init?: RequestInitEx) {
    if (!init) {
      init = {};
    }

    init.headers = Object.assign(
      {},
      {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs=1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
        Cookie: this._opt.cookie,
        Referer: 'https://twitter.com/',
        'User-Agent':
          typeof navigator !== 'undefined'
            ? navigator.userAgent
            : 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'X-Csrf-Token': this._cookies['ct0'] ?? '',
        'X-Guest-Token': this._cookies['guest_token'] ?? '',
        'X-Twitter-Auth-Type': this._cookies['auth_token']
          ? 'OAuth2Session'
          : '',
        'X-Twitter-Active-User': 'yes',
        'X-Twitter-Client-Language': 'en',
      },
      init.headers,
    );

    if (init.params) {
      if (init.method === 'GET') {
        input =
          input +
          '?' +
          new URLSearchParams(
            Object.entries(init.params).map(([k, v]) => [
              k,
              JSON.stringify(v),
            ]) as any,
          );
      } else {
        init.body = JSON.stringify(init.params);
      }
    }

    return this._opt.httpClient(input, {
      ...{
        mode: 'cors',
        redirect: 'follow',
        credentials: 'include',
      },
      ...init,
    });
  }

  private async graphql(
    method: string,
    operation: string[],
    variables?: Record<string, unknown>,
    features?: Record<string, unknown>,
  ) {
    const [qid, op] = operation;
    const params = {
      queryId: qid,
      features: Object.assign({}, defaultFeatures, features),
      variables: Object.assign({}, defaultVariables, variables),
    };

    const r = await this.request(`${this._opt.graphqlApi}/${qid}/${op}`, {
      method,
      params,
    });

    this.logger.info(r);
    return r.json();
  }

  private async _checkMedia(category: string, size: number) {
    if (category.includes('image') && size > MAX_IMAGE_SIZE) {
      throw new Error('Over image max size');
    }
    if (category.includes('gif') && size > MAX_GIF_SIZE) {
      throw new Error('Over GIF max size');
    }
    if (category.includes('video') && size > MAX_VIDEO_SIZE) {
      throw new Error('Over video max size');
    }
  }

  public async tweet(text: string, options?: CreateTweet) {
    let variables: Record<string, unknown> = {
      tweet_text: text,
      dark_request: false,
      media: {
        media_entities: [],
        possibly_sensitive: false,
      },
      semantic_annotation_ids: [],
    };

    if (options?.draft || options?.schedule) {
      variables = {
        post_tweet_request: {
          auto_populate_reply_metadata: false,
          status: text,
          exclude_reply_user_ids: [],
          media_ids: [],
        },
      };

      if (options.medias) {
        for await (const media of options.medias) {
          const m = await this.uploadMedia(media);
        }
        // data['post_tweet_request']['media_ids'].push();
      }
    }

    return this.graphql('POST', APIs.CreateTweet, variables);
  }

  private _blobToBase64DataURL = (file: File) =>
    new Promise<string | undefined>((resolve) => {
      const reader = new FileReader();
      reader.onload = () =>
        resolve(reader.result?.toString().replace(/^.*,/, ''));
      reader.readAsDataURL(file);
    });

  public async uploadMedia(file: File, isDM = false) {
    const uploadType = isDM ? 'dm' : 'tweet';
    const mediaType = file.type;
    const mediaCategory = mediaType.includes('gif')
      ? `${uploadType}_gif`
      : `${uploadType}_${mediaType.split('/')[0]}`;

    this._checkMedia(mediaCategory, file.size);

    const formData = new FormData();
    const mediaData = await this._blobToBase64DataURL(file);

    if (!mediaData) {
      throw new Error('Failed to convert file to base64');
    }

    formData.append('media', file);
    formData.append('media_category', mediaCategory);
    formData.append('media_data', mediaData);

    const result = await this.request(this._opt.resourceApi, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(await result.json());

    console.log(result);
  }
}
