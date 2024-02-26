import type { OptionKinds } from './components';
import type { Manifest } from './register.interface';

export interface Preferences {
  hideDefaults?: OptionKinds[];
  options?: unknown[];
}

export abstract class PublishAddon {
  protected abstract register(): Manifest;
  protected abstract preferences(): Preferences;
}
