import { AsyncMirror } from './AsyncMirror';
import { FolderAdapter } from './FolderAdapter';
import { InMemoryFileSystem as InMemory } from './InMemory';
import { OverlayFS } from './OverlayFS';
import type { ProviderConstructor } from './provider';

export const providers: { [provider: string]: ProviderConstructor } = {};
export default providers;
export { AsyncMirror, FolderAdapter, InMemory, OverlayFS };

export function registerProvider(..._providers: ProviderConstructor[]) {
  for (const provider of _providers) {
    providers[provider.Name] = provider;
  }
}

registerProvider(AsyncMirror, FolderAdapter, InMemory, OverlayFS);
