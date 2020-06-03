// SPDX-License-Identifier: MIT

import BN from 'bn.js';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { Button, ButtonRow, Checkmark, Loader } from '../../components';
import { usePairs } from '../../hooks';
import Inputs from './Inputs';

interface Props {
  className?: string;
}

function Send ({ className }: Props): React.ReactElement<Props> {
  const { deriveAddress } = usePairs();
  const [amount, setAmount] = useState(new BN(0));
  const [recipient, setRecipient] = useState('');
  const [isSendDisabled, setIsSendDisabled] = useState(true);
  const [isInSend, setIsInSend] = useState(false);
  const [isBusy, setIsBusy] = useState(true);

  const _doSend = useCallback(
    (): void => {
      const address = deriveAddress(recipient);

      console.log(address);
      setIsInSend(true);

      // do actual send via api...
      setTimeout(() => setIsBusy(false), 6000);
    },
    [deriveAddress, recipient]
  );

  const _goBack = useCallback(
    (): void => {
      window.location.hash = '/account';
    },
    []
  );

  useEffect((): void => {
    setIsSendDisabled(!recipient || amount.isZero());
  }, [amount, recipient]);

  return (
    <div className={className}>
      {isInSend
        ? isBusy
          ? <Loader />
          : <Checkmark />
        : (
          <Inputs
            setAmount={setAmount}
            setRecipient={setRecipient}
          />
        )
      }
      {(!isBusy || !isInSend) && (
        <ButtonRow>
          {isInSend
            ? (
              <Button
                label='Done'
                onClick={_goBack}
              />
            )
            : (
              <Button
                isDisabled={isSendDisabled}
                label='Send'
                onClick={_doSend}
              />
            )
          }
        </ButtonRow>
      )}
    </div>
  );
}

export default React.memo(styled(Send)``);
