// SPDX-License-Identifier: MIT

import BN from 'bn.js';
import React from 'react';
import styled from 'styled-components';

import { InputAmount, InputEmail } from '../../components';

interface Props {
  className?: string;
  setAmount: (value: BN) => void;
  setRecipient: (value: string) => void;
}

function Inputs ({ className, setAmount, setRecipient }: Props): React.ReactElement<Props> {
  return (
    <div className={className}>
      <InputEmail
        autoFocus
        onChange={setRecipient}
        placeholder='recipient email address, eg. bob@example.com'
      />
      <InputAmount
        onChange={setAmount}
        placeholder='the amount to send, eg. 1.23'
      />
    </div>
  );
}

export default React.memo(styled(Inputs)``);
