// SPDX-License-Identifier: MIT

import React, { useCallback } from 'react';
import styled from 'styled-components';

import { Button, ButtonRow } from '../components';
import { useApi } from '../hooks';

interface Props {
  className?: string;
}

function Managers ({ className }: Props): React.ReactElement<Props> {
  const api = useApi();

  const _newManager = useCallback(
    (): void => {
      // TODO
    },
    []
  );

  const isDisabled = !api.tx.templateModule;

  return (
    <div className={className}>
      <ButtonRow>
        <Button
          isDisabled={isDisabled}
          label='New Manager'
          onClick={_newManager}
        />
      </ButtonRow>
      Managers (TODO)
    </div>
  );
}

export default React.memo(styled(Managers)``);
