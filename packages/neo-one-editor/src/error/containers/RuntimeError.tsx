/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// tslint:disable
import * as React from 'react';
import { Header } from '../components/Header';
import { StackTrace } from './StackTrace';

import { StackFrame } from '../StackFrame';
import { ErrorLocation } from '../parseCompileError';

const wrapperStyle: any = {
  display: 'flex',
  flexDirection: 'column',
};

export type ErrorRecord = {
  error: Error;
  unhandledRejection: boolean;
  contextSize: number;
  stackFrames: StackFrame[];
};

type Props = {
  errorRecord: ErrorRecord;
  editorHandler: (errorLoc: ErrorLocation) => void;
};

export function RuntimeError({ errorRecord, editorHandler }: Props) {
  const { error, unhandledRejection, contextSize, stackFrames } = errorRecord;
  const errorName = unhandledRejection ? 'Unhandled Rejection (' + error.name + ')' : error.name;

  // Make header prettier
  const message = error.message;
  let headerText = message.match(/^\w*:/) || !errorName ? message : errorName + ': ' + message;

  headerText = headerText
    // TODO: maybe remove this prefix from fbjs?
    // It's just scaring people
    .replace(/^Invariant Violation:\s*/, '')
    // This is not helpful either:
    .replace(/^Warning:\s*/, '')
    // Break the actionable part to the next line.
    // AFAIK React 16+ should already do this.
    .replace(' Check the render method', '\n\nCheck the render method')
    .replace(' Check your code at', '\n\nCheck your code at');

  return (
    <div style={wrapperStyle}>
      <Header headerText={headerText} />
      <StackTrace
        stackFrames={stackFrames}
        errorName={errorName}
        contextSize={contextSize}
        editorHandler={editorHandler}
      />
    </div>
  );
}
