import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { retrieveMessage, callCancel } from "./redux/actions/message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  const messages = useSelector((state) => state.Message.message);
  const processing = useSelector((state) => state.Message.processing);

  const clickStart = (event) => {
    event.preventDefault();
    dispatch(retrieveMessage());
  };

  const clickStop = (event) => {
    event.preventDefault();
    dispatch(callCancel());
  };

  return (
    <div>
      <h1>Cancel Requests with Axios</h1>
      <button onClick={clickStart}>start HTTP</button>
      <button onClick={clickStop}>stop HTTP</button>
      {processing && <FontAwesomeIcon icon={faSync} spin size="2x" />}
      {messages !== null &&
        messages.map((value) => {
          return <p key={value}>{value}</p>;
        })}
    </div>
  );
}

export default App;
