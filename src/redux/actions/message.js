import axios from "axios";
import { MessageActionTypes } from "../actionTypes";

const CancelToken = axios.CancelToken;
let cancel;

export function setMessage(message) {
  return { type: MessageActionTypes.SET_MESSAGE, message };
}

export function messsageError() {
  return { type: MessageActionTypes.GET_MESSAGE };
}

export function setProcessing(processing) {
  return { type: MessageActionTypes.SET_PROCESSING, processing };
}

export function retrieveMessage() {
  return function (dispatch) {
    const timestamp = new Date();
    dispatch(setMessage(`starting call ${timestamp.toLocaleTimeString()}`));
    dispatch(setProcessing(true));
    axios
      .get("http://localhost:5000/api/call", {
        cancelToken: new CancelToken((c) => {
          cancel = c;
        }),
      })
      .then((response) => {
        // this would be a successful return from the call
        dispatch(setProcessing(false));
        return dispatch(setMessage(response.data.message));
      })
      .catch((error) => {
        // watch for the cancel and then report on the call
        if (axios.isCancel(error)) {
          dispatch(setProcessing(false));
          const timestamp2 = new Date();
          return dispatch(
            setMessage(
              `HTTP request was ended when axios cancel token was called ${timestamp2.toLocaleTimeString()}`
            )
          );
        }
        dispatch(setProcessing(false));
        return dispatch(setMessage("error caught"));
      });

    return;
  };
}

export function callCancel() {
  return function (dispatch) {
    if (cancel !== undefined) {
      cancel();
    }

    const callTimestamp = new Date();
    return dispatch(
      setMessage(`cancel called ${callTimestamp.toLocaleTimeString()}`)
    );
  };
}
