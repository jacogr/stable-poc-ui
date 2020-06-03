// SPDX-License-Identifier: MIT

import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

interface Props {
  className?: string;
}

const ITEMS = [
  ['/', 'Users'],
  ['/managers', 'Managers']
];

function Navigation ({ className }: Props): React.ReactElement<Props> {
  const { pathname } = useLocation();

  return (
    <div className={className}>
      {ITEMS.map(([url, label]) => (
        <a
          className={pathname === url ? 'isActive' : ''}
          href={`#${url}`}
          key={url}
        >
          {label}
        </a>
      ))}
    </div>
  );
}

export default React.memo(styled(Navigation)`
  background: #eee;
  left: 0;
  padding: 1rem;
  position: fixed;
  right: 0;
  text-align: center;
  top: 0;

  a {
    border-bottom: 2px solid transparent;
    color: inherit;
    margin: 0 1rem;
    padding-bottom: 0.75rem;
    text-decoration: none !important;
    text-transform: uppercase;

    &.isActive {
      border-bottom-color: #888;
    }
  }
`);
