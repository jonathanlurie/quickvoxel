import FileOpener from './components/FileOpener.html';
import FileLister from './components/FileLister.html';
import ThreePlayground from './components/ThreePlayground.html';

import { ModalityCollection } from './core/ModalityCollection.js'; 

import * as PIXPIPE from 'pixpipejs'; 

//import { Image2D } from "pixpipejs";

var modalityCollection = new ModalityCollection();

/*
var threePlayground = new ThreePlayground({
  target: document.body 
})
*/


var meshOpener = new FileOpener({
  target: document.body,
  data: {
    modalityName: "mesh",
    modalityCollection: modalityCollection
  }
})



/*
var fileOpener = new FileOpener({
  target: document.body,
  data: {
    name: "you",
    leFoo: f,
    fileLister: fileLister
  }
});

var fileLister = new FileLister({
  target: document.body,
  data: {
    leFoo: f,
  }
});
*/

/*
fileOpener.up = function(){
  console.log("up");
  fileLister.updateFileList();
}
*/

/*
const listener = fileOpener.on( 'fileAdded', function(event){
  console.log( event.files );
  //console.log( `those files were just added ${event.files.map(function(f){return f.name}).join(" ")}` );
  fileLister.updateFileList();
});
*/




export default app;
