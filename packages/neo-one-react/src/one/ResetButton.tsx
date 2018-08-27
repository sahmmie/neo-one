import * as React from 'react';
import { MdRefresh } from 'react-icons/md';
import { BehaviorSubject } from 'rxjs';
import { FromStream } from '../FromStream';
import { WithNetworkClient } from './DeveloperToolsContext';
import { ToolbarButton } from './ToolbarButton';
import { WithAddError } from './WithAddError';

export function ResetButton() {
  const disabled$ = new BehaviorSubject(false);

  return (
    <WithAddError>
      {(addError) => (
        <WithNetworkClient>
          {({ client, oneClient, projectID }) => (
            <FromStream props$={disabled$}>
              {(disabled) => {
                if (oneClient === undefined) {
                  // tslint:disable-next-line no-null-keyword
                  return null;
                }

                const onClick = () => {
                  disabled$.next(true);
                  oneClient
                    .executeTaskList({
                      plugin: '@neo-one/server-plugin-project',
                      options: {
                        command: 'reset',
                        projectID,
                      },
                    })
                    .then(() => {
                      client.reset();
                      disabled$.next(false);
                    })
                    .catch((error) => {
                      addError(error);
                      disabled$.next(false);
                    });
                };

                return (
                  <ToolbarButton
                    data-test-button="neo-one-reset-button"
                    data-test-tooltip="neo-one-reset-tooltip"
                    help="Reset Network"
                    onClick={onClick}
                    disabled={disabled}
                  >
                    <div>
                      <MdRefresh />
                    </div>
                  </ToolbarButton>
                );
              }}
            </FromStream>
          )}
        </WithNetworkClient>
      )}
    </WithAddError>
  );
}
