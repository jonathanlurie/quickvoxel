import * as THREE from 'three';
import { Image3DGenericDecoder, UrlToArrayBufferReader } from 'pixpipejs';

const url2buf = new UrlToArrayBufferReader();
url2buf.addInput('');
url2buf.update();

const bufferPromise = new Promise((resolve) => {
  url2buf.on('ready', function bufferReady() {
    resolve(this.getOutput());
  });
})

bufferPromise.then((buf) => {
  const decoder = new Image3DGenericDecoder();
  decoder.addInput(buf);
  decoder.update();
  runViz(buildTexture(decoder.getOutput()));
});

function buildTexture(buffer) {
	return null;
}


class ViewPort {
	constructor(renderer) {
		const { width, height } = canvas.getBoundingClientRect(); 
		const [ FOV, ASPECT, NEAR, FAR ] = [ 45, width / height, 0.1, 20000 ];
		this.camera = new THREE.PerpsectiveCamera(FOV, ASPECT, NEAR, FAR);
		this.renderer = renderer;
	}
}

function runViz(texture) {
	const renderer = new THREE.WebGLRenderer();
	document.addChild(renderer.domElement);
}
