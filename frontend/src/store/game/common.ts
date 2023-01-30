enum ActionType {
  SET_TEXT = 'setText',
  SET_COMMENTATOR_TEXT = 'setCommentatorText',
  SET_PARTICIPANTS = 'setParticipants',
  ADD_PARTICIPANT = 'addParticipant',
  REMOVE_PARTICIPANT = 'removeParticipant',
  TOGGLE_IS_READY = 'toggleIsReady',
  SET_SPENT_SECONDS = 'setSpentSeconds',
  TOGGLE_GAME_STARTED = 'toggleIsGameStarted',
  SET_SECONDS_BEFORE_GAME = 'setSecondsBeforeGame',
  DECREASE_SECONDS_BEFORE_GAME = 'decreaseSecondsBeforeGame',
  SET_SECONDS_FOR_GAME = 'setSecondsForGame',
  DECREASE_SECONDS_FOR_GAME = 'decreaseSecondsForGame',
  INCREASE_POSITION = 'increasePosition',
  PARTIAL_RESET = 'partialReset',
  RESET = 'reset',
}

export { ActionType };