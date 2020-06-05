// SPDX-License-Identifier: Apache-2

import React from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
  date: Date;
}

function TdDate ({ className, date }: Props): React.ReactElement<Props> {
  return (
    <td className={className}>
      {date.toLocaleString()}
    </td>
  );
}

export default React.memo(styled(TdDate)`
  font-size: 0.8rem;
  opacity: 0.5;
  width: 1rem;
`);
