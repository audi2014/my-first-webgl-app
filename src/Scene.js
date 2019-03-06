import * as THREE from "three";
import {
  BloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass
} from "postprocessing";

export default ({ width, height }) => {
  debugger;
  //ADD SCENE
  const scene = new THREE.Scene();
  //ADD CAMERA
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 4;
  //ADD RENDERER
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor("#0ff0fa");
  renderer.setSize(width, height);

  //ADD CUBE
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: "#433F81" });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  //shader
  const composer = new EffectComposer(renderer);
  const effectPass = new EffectPass(camera, new BloomEffect());
  effectPass.renderToScreen = true;
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(effectPass);
  //

  const animate = () => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    composer.render();
    frameId = requestAnimationFrame(animate);
  };
  let frameId = null;
  return {
    domElement: renderer.domElement,
    start: () => {
      if (!frameId) {
        animate();
      }
    },
    stop: () => {
      cancelAnimationFrame(frameId);
    }
  };
};
