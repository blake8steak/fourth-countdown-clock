import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Countdown from "./Components/Countdown/Countdown.js";
function App() {
  return (
    <div
      className="App"
      style={{
        overflow: "hidden"
      }}
    >
      <center>
        <div>
          <video
            autoPlay
            muted
            loop
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              minWidth: "100%",
              minHeight: "100%"
            }}
          >
            <source
              src={require("./Assets/americanFlag.mp4")}
              type="video/mp4"
            />
          </video>
        </div>
        <br />
        <div
          style={{
            position: "absolute",
            borderRadius: 25,
            left: "15%",
            top: "20%",
            backgroundColor: "#ffffff",
            width: "70%",
            height: "24%",
            minWidth: 500,
            minHeight: 250,
            opacity: 0.9
          }}
        >
          <Countdown />
          
        </div>
      </center>
    </div>
  );
}

export default App;
