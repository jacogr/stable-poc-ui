// SPDX-License-Identifier: MIT

import React from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
}

function AddUser ({ className }: Props): React.ReactElement<Props> {
  return (
    <div className={className}>
      AddUser (TODO)
    </div>
  );
}

export default React.memo(styled(AddUser)``);
