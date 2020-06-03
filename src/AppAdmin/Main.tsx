// SPDX-License-Identifier: MIT

import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { Button, ButtonRow, InputEmail } from '../components';

interface Props {
  className?: string;
}

function Main ({ className }: Props): React.ReactElement<Props> {
  const [username, setUsername] = useState('');

  const _doLookup = useCallback(
    (): void => {
      window.location.hash = `/user/${username}`;
    },
    [username]
  );

  return (
    <div className={className}>
      <InputEmail
        autoFocus
        placeholder='user to lookup, e.g. bob@example.com'
        onChange={setUsername}
      />
      <ButtonRow>
        <Button
          isDisabled={!username}
          label='Lookup'
          onClick={_doLookup}
        />
      </ButtonRow>
    </div>
  );
}

export default React.memo(styled(Main)``);
