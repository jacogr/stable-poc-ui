// SPDX-License-Identifier: Apache-2

import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

interface Props {
  className?: string;
  routes: [string, string][];
  username: string;
}

function Navigation ({ className, routes, username }: Props): React.ReactElement<Props> {
  const { pathname } = useLocation();

  return (
    <div className={className}>
      <div className='username'>{username}</div>
      <div className='routes'>
        {routes.map(([url, label]) => (
          <a
            className={pathname === url ? 'isActive' : ''}
            href={`#${url}`}
            key={url}
          >
            {label}
          </a>
        ))}
      </div>
      <div className='spacer'>&nbsp;</div>
    </div>
  );
}

export default React.memo(styled(Navigation)`
  background: #eee;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  left: 0;
  padding: 1rem;
  position: fixed;
  right: 0;
  text-align: center;
  top: 0;

  .routes {
    a {
      border-bottom: 2px solid transparent;
      color: inherit;
      margin: 0 1rem;
      padding-bottom: 0.75rem;
      text-decoration: none !important;
      text-transform: uppercase;

      &.isActive {
        border-bottom-color: #002366;
      }
    }
  }
`);
