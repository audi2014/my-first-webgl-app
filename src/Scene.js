import * as THREE from "three";
export default ({ width, height }) => {
  //ADD SCENE
  const scene = new THREE.Scene();
  //ADD CAMERA
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 4;
  //ADD RENDERER
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor("#0ff0fa");
  renderer.setSize(width, height);
  //

  //ADD CUBE
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: "#433F81" });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  return {
    domElement: renderer.domElement,
    render: () => renderer.render(scene, camera),
    animate: () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
    }
  };
};

// import * as THREE from "three";
// import EffectComposer, {
//   RenderPass,
//   ShaderPass,
//   CopyShader
// } from "three-effectcomposer-es6";

// import "./styles.css";

// const VERTEX = `
// varying vec2 vUv;
// void main() {
//     vec4 mvPosition = modelViewMatrix * vec4(position, 1.);
//     gl_Position = projectionMatrix * mvPosition;
//     vUv = uv;
// }
// `;
// const FRAGMENT = `
// // Edge detection Pass
// #define Sensitivity (vec2(0.3, 1.5) * iResolution.y / 400.0)
// float checkSame(vec4 center, vec4 samplef)
// {
//     vec2 centerNormal = center.xy;
//     float centerDepth = center.z;
//     vec2 sampleNormal = samplef.xy;
//     float sampleDepth = samplef.z;
//     vec2 diffNormal = abs(centerNormal - sampleNormal) * Sensitivity.x;
//     bool isSameNormal = (diffNormal.x + diffNormal.y) < 0.1;
//     float diffDepth = abs(centerDepth - sampleDepth) * Sensitivity.y;
//     bool isSameDepth = diffDepth < 0.1;
//     return (isSameNormal && isSameDepth) ? 1.0 : 0.0;
// }
// void mainImage( out vec4 fragColor, in vec2 fragCoord )
// {
//     vec4 sample0 = texture(iChannel0, fragCoord / iResolution.xy);
//     vec4 sample1 = texture(iChannel0, (fragCoord + vec2(1.0, 1.0)) / iResolution.xy);
//     vec4 sample2 = texture(iChannel0, (fragCoord + vec2(-1.0, -1.0)) / iResolution.xy);
//     vec4 sample3 = texture(iChannel0, (fragCoord + vec2(-1.0, 1.0)) / iResolution.xy);
//     vec4 sample4 = texture(iChannel0, (fragCoord + vec2(1.0, -1.0)) / iResolution.xy);
//     float edge = checkSame(sample1, sample2) * checkSame(sample3, sample4);
//     fragColor = vec4(edge, sample0.w, 1.0, 1.0);
// }
// `;

// class ThreeScene extends React.Component {
//   componentDidMount() {
//     const width = this.mount.clientWidth;
//     const height = this.mount.clientHeight;
//     //ADD SCENE
//     this.scene = new THREE.Scene();
//     //ADD CAMERA
//     this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
//     this.camera.position.z = 4;
//     //ADD RENDERER
//     this.renderer = new THREE.WebGLRenderer({ antialias: true });
//     this.renderer.setClearColor("#0ff0fa");
//     this.renderer.setSize(width, height);
//     //
//     this.mount.appendChild(this.renderer.domElement);
//     //SHADER
//     const drawShader = {
//       uniforms: {
//         tDiffuse: { type: "t", value: null }
//       },
//       vertexShader: VERTEX,
//       fragmentShader: FRAGMENT
//     };

//     this.composer = new EffectComposer(this.renderer);
//     this.composer.addPass(new RenderPass(this.scene, this.camera));
//     this.pass = new ShaderPass(drawShader);
//     this.pass.renderToScreen = true;
//     //ADD CUBE
//     const geometry = new THREE.BoxGeometry(1, 1, 1);
//     const material = new THREE.MeshBasicMaterial({ color: "#433F81" });
//     this.cube = new THREE.Mesh(geometry, material);
//     this.scene.add(this.cube);

//     this.start();
//   }

//   componentWillUnmount() {
//     this.stop();
//     this.mount.removeChild(this.renderer.domElement);
//   }
//   start = () => {
//     if (!this.frameId) {
//       this.frameId = requestAnimationFrame(this.animate);
//     }
//   };
//   stop = () => {
//     cancelAnimationFrame(this.frameId);
//   };
//   animate = () => {
//     this.cube.rotation.x += 0.01;
//     this.cube.rotation.y += 0.01;
//     this.renderScene();
//     this.frameId = window.requestAnimationFrame(this.animate);
//   };
//   renderScene = () => {
//     this.renderer.render(this.scene, this.camera);
//   };
//   render() {
//     return (
//       <div
//         style={{ width: "100%", height: "400px" }}
//         ref={mount => {
//           this.mount = mount;
//         }}
//       />
//     );
//   }
// }
