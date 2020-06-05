// SPDX-License-Identifier: Apache-2

import React from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
}

function Reports ({ className }: Props): React.ReactElement<Props> {
  return (
    <div className={className}>
      Reported users
    </div>
  );
}

export default React.memo(styled(Reports)``);
