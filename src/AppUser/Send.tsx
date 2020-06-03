// SPDX-License-Identifier: MIT

import React from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
}

function Send ({ className }: Props): React.ReactElement<Props> {
  return (
    <div className={className}>
      Send
    </div>
  );
}

export default styled(Send)``;
