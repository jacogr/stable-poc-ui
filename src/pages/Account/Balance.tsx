// SPDX-License-Identifier: MIT

import React from 'react';
import styled from 'styled-components';

import { Card, Section } from '../../components';

interface Props {
  address: string;
  className?: string;
}

function Balance ({ className }: Props): React.ReactElement<Props> {
  return (
    <Section className={className}>
      <Card>
        <div className='balance'>0.000</div>
      </Card>
    </Section>
  );
}

export default styled(Balance)`
  .balance {
    font-size: 3.5rem;
    font-weight: 200;
    margin: 0.5rem 0;
    min-width: 15rem;
    text-align: right;
  }
`;
