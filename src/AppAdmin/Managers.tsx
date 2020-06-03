// SPDX-License-Identifier: Apache-2

import React, { useCallback } from 'react';
import styled from 'styled-components';

import { Button, ButtonRow, Section, Title } from '../components';
import { useApi, useManagers } from '../hooks';

interface Props {
  className?: string;
}

function Managers ({ className }: Props): React.ReactElement<Props> {
  const api = useApi();
  const managers = useManagers();

  const _newManager = useCallback(
    (): void => {
      window.location.hash = '/new/manager';
    },
    []
  );

  const isDisabled = !api.tx.templateModule;

  return (
    <div className={className}>
      <ButtonRow>
        <Button
          isDisabled={isDisabled}
          label='New Manager'
          onClick={_newManager}
        />
      </ButtonRow>
      <Section>
        <Title>Managers</Title>
        {!managers.length
          ? <div>no managers available</div>
          : managers.map((address) => (
            <div key={address}>{address}</div>
          ))}
      </Section>
    </div>
  );
}

export default React.memo(styled(Managers)``);
