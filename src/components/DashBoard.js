import React from "react";
import { useAuth } from "../context/authContext";

const DashBoard = () => {
  const { currentUser } = useAuth();
  return (
    <div>{currentUser ? <h1>Hi {currentUser}</h1> : <h1>Hi there</h1>}</div>
  );
};

export default DashBoard;
