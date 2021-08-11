import { MessageActionTypes } from "../actionTypes";

function Message(state = MessageActionTypes.initialMessageState, action) {
  switch (action.type) {
    case MessageActionTypes.SET_MESSAGE:
      let messages = state.message;
      messages.push(action.message);

      return Object.assign({}, state, {
        ...state,
        message: [...messages],
      });
    case MessageActionTypes.MESSAGE_ERROR:
      return Object.assign({}, state, {
        ...state,
        error: action.error,
      });
    case MessageActionTypes.SET_PROCESSING:
      return Object.assign({}, state, {
        ...state,
        processing: action.processing,
      });
    default:
      return state;
  }
}

export default Message;
