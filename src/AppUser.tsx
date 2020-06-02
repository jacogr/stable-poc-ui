// SPDX-License-Identifier: MIT

import React from 'react';
import { Route, Switch } from 'react-router';
import styled from 'styled-components';

import Account from './pages/Account';
import Login from './pages/Login';

interface Props {
  className?: string;
}

function App ({ className }: Props): React.ReactElement<Props> {
  return (
    <main className={className}>
      <Login>
        <Switch>
          <Route path='/account'>
            <Account />
          </Route>
        </Switch>
      </Login>
    </main>
  );
}

export default styled(App)``;
