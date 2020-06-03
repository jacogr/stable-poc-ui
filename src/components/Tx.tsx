// SPDX-License-Identifier: MIT

import { SubmittableExtrinsic } from '@polkadot/api/types';
import { KeyringPair } from '@polkadot/keyring/types';

import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import Button from './Button';
import ButtonRow from './ButtonRow';
import Checkmark from './Checkmark';
import Loader from './Loader';

interface Props {
  children: React.ReactNode;
  className?: string;
  label: string;
  pair: KeyringPair;
  tx: SubmittableExtrinsic<'promise'> | null;
}

function Tx ({ children, className, label, pair, tx }: Props): React.ReactElement<Props> {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const _goBack = useCallback(
    (): void => {
      window.history.back();
    },
    []
  );

  const _doSend = useCallback(
    (): void => {
      if (tx) {
        setIsSending(true);

        let unsubscribe: null | (() => void) = null;

        tx
          .signAndSend(pair, ({ status }): void => {
            if (status.isInBlock || status.isFinalized) {
              setIsCompleted(true);
              unsubscribe && unsubscribe();
            }
          })
          .then((u): void => {
            unsubscribe = u;
          })
          .catch((error): void => {
            console.error(error);
            setIsCompleted(true);
          });
      }
    },
    [pair, tx]
  );

  return (
    <div className={className}>
      {isSending
        ? !isCompleted
          ? <Loader />
          : <Checkmark />
        : children
      }
      <ButtonRow>
        {isCompleted && (
          <Button
            label='Done'
            onClick={_goBack}
          />
        )}
        {!isSending && (
          <Button
            isDisabled={!tx}
            label={label}
            onClick={_doSend}
          />
        )}
      </ButtonRow>
    </div>
  );
}

export default React.memo(styled(Tx)``);
