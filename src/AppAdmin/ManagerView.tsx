// SPDX-License-Identifier: Apache-2

import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import { Button, ButtonRow, Section, Title } from '../components';
import { useAdmin, useIsFrozen } from '../hooks';

interface Props {
  className?: string;
}

function ManagerView ({ className }: Props): React.ReactElement<Props> {
  const { address } = useParams();
  const { adminAddress } = useAdmin();
  const isFrozen = useIsFrozen(address);

  const _doRemove = useCallback(
    (): void => {
      window.location.hash = `/manager/remove/${address}`;
    },
    [address, isFrozen]
  );

  return (
    <div className={className}>
      <ButtonRow>
        <Button
          isDisabled={adminAddress === address}
          label='Remove'
          onClick={_doRemove}
        />
      </ButtonRow>
      <Section>
        <Title>Address</Title>
        <div>{address}</div>
      </Section>
    </div>
  );
}

export default React.memo(styled(ManagerView)``);
