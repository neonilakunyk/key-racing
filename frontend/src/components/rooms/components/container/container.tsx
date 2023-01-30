import { CreateButton, Item } from '../components';
import { IRoom } from '../../../../common/interfaces/interfaces';
import { getAllowedClasses } from '../../../../helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  rooms: IRoom[];
  onCreate: () => void;
};

export const Container: React.FC<Props> = ({
  rooms,
  onCreate,
}) => (
  <div className={getAllowedClasses(styles.roomsContainer, 'py-2 w-100')}>
    {rooms.map((room: IRoom) => (
      <Item key={room.id} room={room} />
    ))}
    <CreateButton onClick={onCreate} />
  </div>
);
