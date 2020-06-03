// SPDX-License-Identifier: MIT

import React from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
}

function AppAdmin ({ className }: Props): React.ReactElement<Props> {
  return (
    <main className={className}>
      Admin
    </main>
  );
}

export default React.memo(styled(AppAdmin)``);
