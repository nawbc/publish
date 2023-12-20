import { AsyncMirrorProvider } from './AsyncMirror';
import { FolderAdapter } from './FolderAdapter';
import { MemoryProvider } from './Memory';
import { OverlayFSProvider } from './OverlayFS';
import type { ProviderConstructor } from './provider';

export const providers: { [provider: string]: ProviderConstructor } = {};
export default providers;
export {
  AsyncMirrorProvider,
  FolderAdapter,
  MemoryProvider,
  OverlayFSProvider,
};

export function registerProvider(..._providers: ProviderConstructor[]) {
  for (const provider of _providers) {
    providers[provider.Name] = provider;
  }
}

registerProvider(
  AsyncMirrorProvider,
  FolderAdapter,
  MemoryProvider,
  OverlayFSProvider,
);
