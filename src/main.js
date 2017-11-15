import FileOpener from './components/FileOpener.html';
import FileLister from './components/FileLister.html';
import ThreePlayground from './components/ThreePlayground.html';

import { Foo } from './Foo.js';

var f = new Foo();


var threePlayground = new ThreePlayground({
  target: document.body
})


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

/*
fileOpener.up = function(){
  console.log("up");
  fileLister.updateFileList();
}
*/

const listener = fileOpener.on( 'fileAdded', function(event){
  console.log( event.files );
  //console.log( `those files were just added ${event.files.map(function(f){return f.name}).join(" ")}` );
  fileLister.updateFileList();
});





export default app;
