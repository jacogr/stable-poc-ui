// SPDX-License-Identifier: Apache-2

import React, { useCallback } from 'react';
import styled from 'styled-components';

import { Button, ButtonRow, Section, Table, Title } from '../components';
import { useManagers } from '../hooks';
import TdAddress from '../partials/TdAddress';

interface Props {
  className?: string;
}

function linkManager (address: string): () => void {
  return (): void => {
    window.location.hash = `/manager/view/${address}`;
  };
}

function Managers ({ className }: Props): React.ReactElement<Props> {
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
          label='Add Manager'
          onClick={_newManager}
        />
      </ButtonRow>
      <Section>
        <Title>Managers</Title>
        {!managers.length
          ? <div>no managers available</div>
          : (
            <Table className='managers'>
              {managers.map((address) => (
                <tr key={address}>
                  <TdAddress address={address} />
                  <td className='spacer'>&nbsp;</td>
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

export default React.memo(styled(Managers)`
  .managers {
    td {
      &.address {
        padding-left: 0.5rem;
      }

      &.icon {
        padding-right: 0;

        > div {
          display: inline-block;
          margin: 0;
        }
      }

      &.spacer {
        width: 100%;
      }
    }
  }
`);
