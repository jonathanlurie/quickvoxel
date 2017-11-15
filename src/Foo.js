class Foo {
  constructor(){
    this._files = [];
  }
  
  addFiles( fileArr ){
    for(var i=0; i<fileArr.length; i++){
      this._files.push( fileArr[i] );
    }
  }
  
  getFiles(){
    return this._files;
  }
  
  

}

export { Foo }
