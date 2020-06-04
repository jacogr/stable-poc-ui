// SPDX-License-Identifier: Apache-2

import React, { useCallback } from 'react';
import styled from 'styled-components';

import { Button, ButtonRow, Card } from '../components';
import { useBalance, usePair, useIsFrozen } from '../hooks';
import Balance from '../partials/Balance';
import Transactions from '../partials/Transactions';

interface Props {
  className?: string;
}

function Account ({ className }: Props): React.ReactElement<Props> | null {
  const { userAddress, userPair } = usePair();
  const [,, hasZeroBalance] = useBalance(userAddress);
  const isFrozen = useIsFrozen(userAddress);

  const _onSend = useCallback(
    (): void => {
      window.location.hash = '/send';
    },
    []
  );

  if (!userPair) {
    return null;
  }

  return (
    <div className={className}>
      <ButtonRow>
        <Button
          isDisabled={isFrozen || hasZeroBalance}
          label='Send'
          onClick={_onSend}
        />
      </ButtonRow>
      {isFrozen && (
        <Card
          className='lockedCard'
          isError
        >
          This account is currently locked by the administrators and as such cannot make any transactions.
        </Card>
      )}
      <Balance address={userAddress} />
      <Transactions address={userAddress} />
    </div>
  );
}

export default React.memo(styled(Account)`
  .lockedCard {
    margin-bottom: -1rem;
  }
`);
