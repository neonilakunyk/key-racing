enum SocketEvents {
  CONNECTION = 'connection',
  JOIN_ROOM = 'join/room',
  LEAVE_ROOM = 'leave/room',
  CREATE_ROOM = 'create/room',
  DELETE_ROOM = 'delete/room',
  ADD_PARTICIPANT = 'add/participant',
  REMOVE_PARTICIPANT = 'remove/participant',
  TOGGLE_PARTICIPANT_IS_READY = 'toggle/participantIsReady',
  TOGGLE_ME_IS_READY = 'toggle/meIsReady',
  INCREASE_ME_POSITION = 'increase/mePosition',
  INCREASE_PARTICIPANT_POSITION = 'increase/participantPosition',
}

export { SocketEvents };
