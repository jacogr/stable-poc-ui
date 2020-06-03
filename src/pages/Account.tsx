// SPDX-License-Identifier: MIT

import React, { useCallback } from 'react';
import styled from 'styled-components';

import { Button, ButtonRow, Title, Section } from '../components';

interface Props {
  className?: string;
}

function Account ({ className }: Props): React.ReactElement<Props> {
  const _onRequest = useCallback(
    (): void => {
      window.location.href = '/request';
    },
    []
  );

  const _onSend = useCallback(
    (): void => {
      window.location.href = '/send';
    },
    []
  );

  return (
    <div className={className}>
      <ButtonRow>
        <Button
          label='Send'
          onClick={_onSend}
        />
        <Button
          label='Request'
          onClick={_onRequest}
        />
      </ButtonRow>
      <Section>
        <Title>Balance</Title>
      </Section>
      <Section>
        <Title>Recent transactions</Title>
      </Section>
    </div>
  );
}

export default styled(Account)``;
