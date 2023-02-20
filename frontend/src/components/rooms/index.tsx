import { Container as BootstrapContainer } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { SocketContext } from 'socket';

import { HttpError } from 'common/exceptions';
import { Spinner } from 'components/common';
import { AppRoute, LocalStorageVariable, SocketEvents } from 'common/enums';
import { roomActions } from 'store/actions';
import {
  useState,
  useEffect,
  useAppSelector,
  useAppDispatch,
  useContext,
} from 'hooks';
import { IRoom, IRoomAction, IRoomCreation } from 'common/interfaces';
import { getAllowedClasses, replaceIdParam } from 'common/helpers';
import { gameApi } from 'services/game-api.service';
import { CreateRoomModal, Container, ShareModal } from './components';
import styles from './styles.module.scss';

const Rooms: React.FC = () => {
  const { rooms, shareRoomId, isLoading } = useAppSelector(
    (state) => state.room,
  );
  const dispatch = useAppDispatch();
  const socket = useContext(SocketContext);

  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);

  const onCreatingRoom = (room: IRoom): void => {
    dispatch(roomActions.addRoom(room));
  };

  const onDeletingRoom = ({ roomId }: IRoomAction): void => {
    dispatch(roomActions.removeRoom(roomId));
  };

  const handleCreate = (): void => setIsCreateModalVisible(true);

  const handleCreationCancel = (): void => {
    setIsCreateModalVisible(false);
  };

  const handleShareCancel = (): void => {
    setIsShareModalVisible(false);
    dispatch(roomActions.setShareRoomId(null));
  };

  const handleCreationConfirm = (data: IRoomCreation): void => {
    dispatch(
      roomActions.createRoom({
        name: data.name,
        type: data.type,
      }),
    );
    setIsShareModalVisible(true);
  };

  useEffect(() => {
    if (shareRoomId) {
      gameApi
        .getShareLink(shareRoomId)
        .then(({ link }) => {
          setShareLink(link);
        })
        .catch((err) => {
          const httpError = err as HttpError;
          toast.error(httpError.message);
        });
    }
  }, [shareRoomId]);

  useEffect(() => {
    if (localStorage.getItem(LocalStorageVariable.ROOM_ID)) {
      localStorage.removeItem(LocalStorageVariable.ROOM_ID);
    }
    dispatch(roomActions.loadRooms());

    socket.on(SocketEvents.CREATE_ROOM, onCreatingRoom);
    socket.on(SocketEvents.DELETE_ROOM, onDeletingRoom);

    return (): void => {
      dispatch(roomActions.setShareRoomId(null));
      socket.off(SocketEvents.CREATE_ROOM, onCreatingRoom);
      socket.off(SocketEvents.DELETE_ROOM, onDeletingRoom);
    };
  }, []);

  return (
    <div className={getAllowedClasses(styles.roomsPage, 'bg-light')}>
      <BootstrapContainer className="h-100 position-relative d-flex flex-column align-items-center pt-5">
        <h1 className="h3 mb-5">Select the room</h1>
        {isLoading ? (
          <Spinner height={'12rem'} width={'12rem'} />
        ) : (
          <Container rooms={rooms} onCreate={handleCreate} />
        )}
        <CreateRoomModal
          showModal={isCreateModalVisible}
          onModalClose={handleCreationCancel}
          handleFunction={handleCreationConfirm}
        />
        {shareLink && shareRoomId && (
          <ShareModal
            showModal={isShareModalVisible}
            onModalClose={handleShareCancel}
            link={replaceIdParam(AppRoute.GAME, shareRoomId)}
            shareLink={shareLink}
          />
        )}
      </BootstrapContainer>
    </div>
  );
};

export { Rooms };
