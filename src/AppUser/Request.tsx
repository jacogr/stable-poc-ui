// SPDX-License-Identifier: MIT

import React from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
}

function Request ({ className }: Props): React.ReactElement<Props> {
  return (
    <div className={className}>
      Request
    </div>
  );
}

export default React.memo(styled(Request)``);
