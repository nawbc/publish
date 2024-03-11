export type CreateTweet = {
  medias?: File[];
  draft?: boolean;
  schedule?: number;
  reply_params?: any;
  quote_params?: any;
  poll_params?: any;
};
