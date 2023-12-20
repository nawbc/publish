import type { Manifest } from './register.interface';

export abstract class PublishPlugin {
  protected abstract register(): Manifest;
}
