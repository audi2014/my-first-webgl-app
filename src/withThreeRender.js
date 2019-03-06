import React from "react";

export default createScene => {
  return class extends React.Component {
    componentDidMount() {
      const { domElement, start, stop } = createScene({
        width: this.mount.clientWidth,
        height: this.mount.clientHeight
      });
      this.domElement = domElement;
      this.start = start;
      this.stop = stop;
      this.mount.appendChild(this.domElement);
      this.start();
    }

    componentWillUnmount() {
      this.stop();
      this.mount.removeChild(this.domElement);
    }
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
