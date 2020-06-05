// SPDX-License-Identifier: Apache-2

import React, { useCallback } from 'react';
import styled from 'styled-components';

import { Button, ButtonRow, Card } from '../components';
import { useBalance, useIsFrozen, useIsUser } from '../hooks';
import Balance from './Balance';
import Transactions from './Transactions';

interface Props {
  address: string;
  className?: string;
  isDisabled?: boolean;
  sendAction: string;
  sendLabel?: string;
  withInactive?: boolean;
  withoutFree?: boolean;
}

function Account ({ address, className, isDisabled, sendAction, sendLabel = 'Send', withInactive, withoutFree }: Props): React.ReactElement<Props> | null {
  const [,, isBalanceZero] = useBalance(address);
  const isFrozen = useIsFrozen(address);
  const isActive = useIsUser(address);

  const _onSend = useCallback(
    (): void => {
      window.location.hash = sendAction;
    },
    [sendAction]
  );

  return (
    <div className={className}>
      <ButtonRow>
        <Button
          isDisabled={isDisabled || isBalanceZero || (withInactive && (!isActive || isFrozen))}
          label={sendLabel}
          onClick={_onSend}
        />
      </ButtonRow>
      {withInactive && (
        <>
          {!isActive && (
            <Card
              className='lockedCard'
              isWarning
            >
              This account is currently inactive and requires activation by the administrators before it is allowed to make transactions.
            </Card>
          )}
          {isFrozen && (
            <Card
              className='lockedCard'
              isError
            >
              This account is currently locked by the administrators and as such cannot make any transactions.
            </Card>
          )}
        </>
      )}
      <Balance address={address} />
      <Transactions
        address={address}
        withoutFree={withoutFree}
      />
    </div>
  );
}

export default React.memo(styled(Account)`
  .lockedCard {
    margin-bottom: -1rem;
  }
`);
