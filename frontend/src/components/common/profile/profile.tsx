import { UserAvatar } from 'components/common/common';
import { getAllowedClasses } from 'helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  userName: string;
  avatarSize: string;
  textSize: string;
  textColor: string;
  userAvatar?: string;
};

export const Profile: React.FC<Props> = ({ userName, userAvatar, textSize, textColor, avatarSize }) => (
  <div className="d-flex align-items-center">
    <UserAvatar
      size={avatarSize}
      name={userName}
      src={userAvatar}
      round={true}
      className={getAllowedClasses(styles.userAvatar)}
      showTooltip={false}
    />
    <span className={getAllowedClasses(styles.userName, textSize, textColor)}>
      {userName}
    </span>
  </div>
);
