// SPDX-License-Identifier: Apache-2

import React, { useCallback } from 'react';
import styled from 'styled-components';

import { Button, ButtonRow, Section, Table, Title } from '../components';
import { useIsSsc, useManagers } from '../hooks';

interface Props {
  className?: string;
}

function linkManager (address: string): () => void {
  return (): void => {
    window.location.hash = `/manager/view/${address}`;
  };
}

function Managers ({ className }: Props): React.ReactElement<Props> {
  const isSsc = useIsSsc();
  const managers = useManagers();

  const _newManager = useCallback(
    (): void => {
      window.location.hash = '/manager/new';
    },
    []
  );

  return (
    <div className={className}>
      <ButtonRow>
        <Button
          isDisabled={!isSsc}
          label='Add Manager'
          onClick={_newManager}
        />
      </ButtonRow>
      <Section>
        <Title>Managers</Title>
        {!managers.length
          ? <div>no managers available</div>
          : (
            <Table>
              {managers.map((address) => (
                <tr key={address}>
                  <td>{address}</td>
                  <td>
                    <Button
                      isThin
                      label='View'
                      onClick={linkManager(address)}
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

export default React.memo(styled(Managers)``);
