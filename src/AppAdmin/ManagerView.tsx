// SPDX-License-Identifier: Apache-2

import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { Button, ButtonRow, Section, Title } from '../components';
import { knownAddresses } from '../constants';
import { useAdmin } from '../hooks';

interface Props {
  className?: string;
}

function ManagerView ({ className }: Props): React.ReactElement<Props> {
  const { address } = useParams();
  const { adminAddress } = useAdmin();

  const _doRemove = useCallback(
    (): void => {
      window.location.hash = `/manager/remove/${address}`;
    },
    [address]
  );

  const name = knownAddresses[address];

  return (
    <div className={className}>
      <ButtonRow>
        <Button
          isDisabled={adminAddress === address}
          label='Remove'
          onClick={_doRemove}
        />
      </ButtonRow>
      {name && (
        <Section>
          <Title>Name</Title>
          <div>{name}</div>
        </Section>
      )}
      <Section>
        <Title>Address</Title>
        <div>{address}</div>
      </Section>
    </div>
  );
}

export default React.memo(styled(ManagerView)``);
