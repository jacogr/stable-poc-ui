// SPDX-License-Identifier: Apache-2

import { IconProps } from './types';

import React from 'react';
import styled from 'styled-components';

interface Props extends IconProps {
  children: React.ReactNode;
}

function Icon ({ children, className }: Props): React.ReactElement<Props> {
  return (
    <div className={className}>
      <div>{children}</div>
    </div>
  );
}

export default React.memo(styled(Icon)`
  line-height: 80px;
  margin-bottom: 0.5rem;
  text-align: center;

  > div {
    // background: #eee;
    border-radius: 40px;
    color: #888;
    display: inline-block;
    font-size: 80px;
    width: 80px;
  }
`);
