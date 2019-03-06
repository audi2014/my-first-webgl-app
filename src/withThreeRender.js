import React from "react";

export default createScene => {
  return class extends React.Component {
    componentDidMount() {
      const { domElement, render, animate } = createScene({
        width: this.mount.clientWidth,
        height: this.mount.clientHeight
      });
      this.domElement = domElement;
      this.render = render;
      this.animate = animate;
      this.mount.appendChild(this.domElement);
      this.start();
    }

    componentWillUnmount() {
      this.stop();
      this.mount.removeChild(this.domElement);
    }
    start = () => {
      if (!this.frameId) {
        this.frameId = requestAnimationFrame(this.handleAnimate);
      }
    };
    stop = () => {
      cancelAnimationFrame(this.frameId);
    };
    handleAnimate = () => {
      this.animate();
      this.render();
      this.frameId = window.requestAnimationFrame(this.handleAnimate);
    };
    render() {
      return (
        <div
          style={{ width: "100%", height: "400px" }}
          ref={mount => {
            this.mount = mount;
          }}
        />
      );
    }
  };
};
