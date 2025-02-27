import { FC, ReactNode } from 'react';
import { classNames } from '@src/lib/utils/classname';

export interface PanelHeaderProps {
  children?: ReactNode;
  className?: string;
}

export interface PanelProps {
  children?: ReactNode;
  className?: string;
}

export interface PanelBodyProps {
  children?: ReactNode;
  className?: string;
}

const PanelHeader: FC<PanelHeaderProps> = ({ children, className }) => {
  return <div className={classNames('p-6 text-neutral-100 text-xl font-base', className || '')}>{children}</div>;
};

const PanelBody: FC<PanelBodyProps> = ({ children, className }) => {
  return <div className={classNames('p-6', className || '')}>{children}</div>;
};

const PanelRoot: FC<PanelProps> = ({ children, className }) => {
  return (
    <div className={classNames('bg-neutral-900 bg-opacity-70 rounded-2xl shadow-xl', className || '')}>{children}</div>
  );
};

export const Panel = PanelRoot as typeof PanelRoot & {
  Body: typeof PanelBody;
  Header: typeof PanelHeader;
};

Panel.Body = PanelBody;
Panel.Header = PanelHeader;
