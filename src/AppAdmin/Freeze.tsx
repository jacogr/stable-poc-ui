// SPDX-License-Identifier: MIT

import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

interface Props {
  className?: string;
}

function Freeze ({ className }: Props): React.ReactElement<Props> {
  const { address } = useParams();

  return (
    <div className={className}>
      Freeze {address}
    </div>
  );
}

export default React.memo(styled(Freeze)``);
