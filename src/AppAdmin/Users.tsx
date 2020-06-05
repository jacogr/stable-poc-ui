// SPDX-License-Identifier: Apache-2

import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { Button, ButtonRow, InputEmail, Section, Table, Title } from '../components';
import { useAdmin, useUsers } from '../hooks';
import Balance from '../partials/Balance';
import TdAddress from '../partials/TdAddress';

interface Props {
  className?: string;
}

function linkUser (address: string): () => void {
  return (): void => {
    window.location.hash = `/user/view/${address}`;
  };
}

function Main ({ className }: Props): React.ReactElement<Props> {
  const { deriveAddress } = useAdmin();
  const users = useUsers();
  const [username, setUsername] = useState('');

  const _doLookup = useCallback(
    (): void => {
      window.location.hash = `/user/view/${deriveAddress(username)}/${username}`;
    },
    [deriveAddress, username]
  );

  return (
    <div className={className}>
      <Section>
        <Title>Lookup user</Title>
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
      </Section>
      <Section>
        <Title>Users</Title>
        {!users.length
          ? <div>no users available</div>
          : (
            <Table className='users'>
              {users.map((address) => (
                <tr key={address}>
                  <TdAddress address={address} />
                  <td className='balance'>
                    <Balance address={address} />
                  </td>
                  <td>
                    <Button
                      isThin
                      label='View'
                      onClick={linkUser(address)}
                    />
                  </td>
                </tr>
              ))}
            </Table>
          )
        }
      </Section>
    </div>
  );
}

export default React.memo(styled(Main)`
  .users {
    td {
      &.balance {
        text-align: right;
        width: 100%;
      }
    }
  }
`);
