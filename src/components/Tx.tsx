// SPDX-License-Identifier: Apache-2

import { SubmittableExtrinsic } from '@polkadot/api/types';
import { KeyringPair } from '@polkadot/keyring/types';

import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import Button from './Button';
import ButtonRow from './ButtonRow';
import IconCheck from './IconCheck';
import IconCross from './IconCross';
import Loader from './Loader';

interface Props {
  children: React.ReactNode;
  className?: string;
  label: string;
  pair: KeyringPair;
  tx: SubmittableExtrinsic<'promise'> | null;
}

interface DoneState {
  isCompleted: boolean;
  isOk: boolean;
}

function Tx ({ children, className, label, pair, tx }: Props): React.ReactElement<Props> {
  const [{ isCompleted, isOk }, setIsCompleted] = useState<DoneState>({ isCompleted: false, isOk: true });
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
          .signAndSend(pair, ({ events, status }): void => {
            if (status.isInBlock || status.isFinalized) {
              setIsCompleted({
                isCompleted: true,
                isOk: events.some(({ event: { method, section } }) => section === 'system' && method === 'ExtrinsicSuccess')
              });
              unsubscribe && unsubscribe();
            }
          })
          .then((u): void => {
            unsubscribe = u;
          })
          .catch((error): void => {
            console.error(error);
            setIsCompleted({ isCompleted: true, isOk: false });
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
          : isOk
            ? <IconCheck />
            : <IconCross />
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
