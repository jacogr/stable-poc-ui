// SPDX-License-Identifier: Apache-2

import { IconProps as Props } from './types';

import React from 'react';
import styled from 'styled-components';

import Icon from './Icon';

function IconCheck ({ className }: Props): React.ReactElement<Props> {
  return (
    <Icon className={className}>
      &#10003;
    </Icon>
  );
}

export default React.memo(styled(IconCheck)``);
