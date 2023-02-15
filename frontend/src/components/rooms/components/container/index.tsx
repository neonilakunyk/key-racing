import { CreateButton } from '../create-button';
import { Item } from '../item';
import { IRoom } from 'common/interfaces';
import { getAllowedClasses } from 'common/helpers';
import styles from './styles.module.scss';

type Props = {
  rooms: IRoom[];
  onCreate: () => void;
};

const Container: React.FC<Props> = ({ rooms, onCreate }) => (
  <div className={getAllowedClasses(styles.roomsContainer, 'py-2 w-100')}>
    {rooms.map((room: IRoom) => (
      <Item key={room.id} room={room} />
    ))}
    <CreateButton onClick={onCreate} />
  </div>
);

export { Container };
