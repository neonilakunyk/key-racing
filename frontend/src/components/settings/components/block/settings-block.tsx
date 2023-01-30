import React from 'react';

type Props = {
  title: string;
};

export const SettingsBlock: React.FC<Props> = ({ children, title }) => {
  return (
    <div className="d-flex flex-column fs-5">
      <h4>{title}</h4>
      <div>{children}</div>
    </div>
  );
};
