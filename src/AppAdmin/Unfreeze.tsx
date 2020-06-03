// SPDX-License-Identifier: MIT

import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { Tx } from '../components';
import { useAdmin } from '../hooks';

interface Props {
  className?: string;
}

function Unfreeze ({ className }: Props): React.ReactElement<Props> {
  const { username } = useParams();
  const { deriveAddress } = useAdmin();
  const [address] = useState(deriveAddress(username));
  const [isCompleted, setIsCompleted] = useState(false);

  const _doUnfreeze = useCallback(
    (): void => {
      // do actual send via api...
      setTimeout(() => setIsCompleted(true), 1500);
    },
    [address]
  );

  return (
    <Tx
      className={className}
      isCompleted={isCompleted}
      label='Yes, unfreeze this user'
      onSend={_doUnfreeze}
    >
      Unfreeze {username}
    </Tx>
  );
}

export default React.memo(styled(Unfreeze)``);
