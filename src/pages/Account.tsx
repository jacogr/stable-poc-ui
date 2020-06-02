// SPDX-License-Identifier: MIT

import React from 'react';
import styled from 'styled-components';

import { Card, Title } from '../components';

interface Props {
  className?: string;
}

function Account ({ className }: Props): React.ReactElement<Props> {
  return (
    <div className={className}>
      <Card>
        <Title>Balance</Title>
      </Card>
      <Title>Recent transactions</Title>
    </div>
  );
}

export default styled(Account)``;
