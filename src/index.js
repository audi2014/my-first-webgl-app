import React from "react";
import ReactDOM from "react-dom";
import MyScene from "./Scene";
import withThreeRender from "./withThreeRender";

const ThreeScene = withThreeRender(MyScene);

const rootElement = document.getElementById("root");
ReactDOM.render(<ThreeScene />, rootElement);
