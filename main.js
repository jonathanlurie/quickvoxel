import { Image3DGenericDecoder, UrlToArrayBufferReader } from 'pixpipejs';

const url2buf = new UrlToArrayBufferReader();
url2buf.addInput('static/andrew_mri_nov_2015.nii.gz');
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
  
}

function runViz(texture) {

}
