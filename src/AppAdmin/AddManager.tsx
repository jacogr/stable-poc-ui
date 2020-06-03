// SPDX-License-Identifier: Apache-2

import React from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
}

function AddManager ({ className }: Props): React.ReactElement<Props> {
  return (
    <div className={className}>
      AddManager (TODO)
    </div>
  );
}

export default React.memo(styled(AddManager)``);
