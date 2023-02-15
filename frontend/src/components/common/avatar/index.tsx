import Avatar from 'react-avatar';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import React from 'react';

type Props = {
  size: string;
  name: string | undefined;
  src: string | undefined;
  round: boolean;
  className?: string;
  style?: React.CSSProperties;
  showTooltip?: boolean;
};

const UserAvatar: React.FC<Props> = ({
  size,
  name,
  src,
  round,
  className,
  style,
  showTooltip,
}) => (
  <OverlayTrigger
    key="bottom"
    placement="top"
    show={showTooltip}
    overlay={<Tooltip id={'tooltip-top'}>{name}</Tooltip>}
  >
    <Avatar
      size={size}
      name={name}
      title={' '}
      src={src}
      round={round}
      className={className}
      style={style}
    />
  </OverlayTrigger>
);

export { UserAvatar };
