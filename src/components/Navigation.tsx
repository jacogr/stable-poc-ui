// SPDX-License-Identifier: Apache-2

import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

interface Props {
  className?: string;
  onLogout: () => void;
  routes: [string, string, string[]][];
  username: string;
}

function Navigation ({ className, onLogout, routes, username }: Props): React.ReactElement<Props> {
  const { pathname } = useLocation();

  return (
    <div className={className}>
      <div className='username'>{username}</div>
      <div className='routes'>
        {routes.map(([url, label, parts]) => (
          <a
            className={parts.some((part) => pathname.startsWith(part)) ? 'isActive' : ''}
            href={`#${url}`}
            key={url}
          >
            {label}
          </a>
        ))}
      </div>
      <div className='logout'>
        <a onClick={onLogout}>Logout</a>
      </div>
    </div>
  );
}

export default React.memo(styled(Navigation)`
  background: #002366;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  left: 0;
  padding: 1rem;
  position: fixed;
  right: 0;
  text-align: center;
  top: 0;

  a {
    border-bottom: 4px solid transparent;
    border-top: 4px solid transparent;
    color: inherit;
    cursor: pointer;
    margin: 0 1rem;
    padding: 0.75rem 0;
    text-decoration: none !important;
    text-transform: uppercase;

    &.isActive {
      border-bottom-color: white;
    }
  }

`);
