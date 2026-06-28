import type { ContentClient, ContentClientConfig } from '../types';

export function createContentClient(config: ContentClientConfig = {}): ContentClient {
  return {
    enabled: config.enabled
  };
}
