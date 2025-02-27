import React, { FC, MouseEventHandler, ReactNode } from 'react';
import { classNames } from '@src/lib/utils/classname';

export type LinkColor = 'primary' | 'secondary' | 'accent' | 'neutral' | 'success' | 'info' | 'warning' | 'error';

const getColorClassNames = (color: LinkColor) => {
  switch (color) {
    case 'primary':
      return 'link-primary';
    case 'secondary':
      return 'link-secondary';
    case 'accent':
      return 'link-accent';
    case 'neutral':
      return 'link-neutral';
    case 'success':
      return 'link-success';
    case 'info':
      return 'link-info';
    case 'warning':
      return 'link-warning';
    case 'error':
      return 'link-error';
    default:
      return '';
  }
};

interface LinkProps {
  color?: LinkColor;
  href?: string;
  target?: string;
  children: ReactNode | string;
  onClick?: MouseEventHandler;
}

export const Link: FC<LinkProps> = ({ color = 'primary', children, href, target, onClick }) => {
  return (
    <a href={href} target={target} onClick={onClick} className={classNames('link', getColorClassNames(color))}>
      {children}
    </a>
  );
};
