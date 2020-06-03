// SPDX-License-Identifier: MIT

import React from 'react';
import styled from 'styled-components';

import { Section, Title } from '../components';

interface Props {
  address: string;
  className?: string;
}

function Transactions ({ className }: Props): React.ReactElement<Props> {
  return (
    <Section className={className}>
      <Title>Recent transactions</Title>
    </Section>
  );
}

export default styled(Transactions)``;
