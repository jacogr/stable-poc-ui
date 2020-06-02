// SPDX-License-Identifier: MIT

import React from 'react';
import { Route, Switch } from 'react-router';
import styled from 'styled-components';

import { Card } from './components';
import Account from './pages/Account';
import Login from './pages/Login';

interface Props {
  className?: string;
}

function App ({ className }: Props): React.ReactElement<Props> {
  return (
    <div className={className}>
      <Card className='container'>
        <Login>
          <Switch>
            <Route path='/account'>
              <Account />
            </Route>
          </Switch>
        </Login>
      </Card>
    </div>
  );
}

export default styled(App)`
  text-align: center;

  > .container {
    display: inline-block;
    margin: 1rem auto;
  }
`;
