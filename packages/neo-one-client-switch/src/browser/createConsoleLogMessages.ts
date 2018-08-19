import { RawAction } from '@neo-one/client-core';
import { createConsoleLogMessages as createConsoleLogMessagesBase, LogOptions, SourceMaps } from '../common';
import { initializeSourceMap } from './initializeSourceMap';

export const createConsoleLogMessages = async (
  actions: ReadonlyArray<RawAction>,
  sourceMaps: SourceMaps,
  options: LogOptions,
): Promise<ReadonlyArray<string>> => {
  if (process.env.NODE_ENV === 'production') {
    return [];
  }

  initializeSourceMap();

  return createConsoleLogMessagesBase(actions, sourceMaps, options);
};
