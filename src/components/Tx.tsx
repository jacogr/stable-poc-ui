// SPDX-License-Identifier: MIT

import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import Button from './Button';
import ButtonRow from './ButtonRow';
import Checkmark from './Checkmark';
import Loader from './Loader';

interface Props {
  children: React.ReactNode;
  className?: string;
  isCompleted: boolean;
  isDisabled?: boolean;
  label: string;
  onSend: () => void;
}

function Tx ({ children, className, isCompleted, isDisabled, label, onSend }: Props): React.ReactElement<Props> {
  const [isSending, setIsSending] = useState(false);

  const _goBack = useCallback(
    (): void => {
      window.history.back();
    },
    []
  );

  const _doSend = useCallback(
    (): void => {
      setIsSending(true);
      onSend();
    },
    [onSend]
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
            isDisabled={isDisabled}
            label={label}
            onClick={_doSend}
          />
        )}
      </ButtonRow>
    </div>
  );
}

export default React.memo(styled(Tx)``);
