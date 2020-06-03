// SPDX-License-Identifier: MIT

import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { Button, ButtonRow, InputEmail } from '../components';
import { useAdmin } from '../hooks';
import UserDetails from './UserDetails';

interface Props {
  className?: string;
}

function Main ({ className }: Props): React.ReactElement<Props> {
  const { deriveAddress } = useAdmin();
  const [address, setAddress] = useState('');
  const [username, setUsername] = useState('');

  const _doLookup = useCallback(
    () => setAddress(deriveAddress(username)),
    [deriveAddress, username]
  );

  return (
    <div className={className}>
      <InputEmail
        autoFocus
        placeholder='user to lookup, e.g. bob@example.com'
        onChange={setUsername}
      />
      <ButtonRow>
        <Button
          isDisabled={!username}
          label='Lookup'
          onClick={_doLookup}
        />
      </ButtonRow>
      {address && (
        <UserDetails
          address={address}
          username={username}
        />
      )}
    </div>
  );
}

export default React.memo(styled(Main)``);
