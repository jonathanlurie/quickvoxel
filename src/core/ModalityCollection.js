import { Modality } from './Modality.js';


/**
* An instance of ModalityCollection represent a list of modalities of various types
* and provide a convenient interface to deal with modalities (addind, removing, searching, etc.)
*/
class ModalityCollection {
  constructor(){
    this._listOfModalities = [];
  }
  
  
  addModality( file, type, sucessCb, failCb ){
    if( Modality.isValidModalityType( type ) ){
      var m = new Modality();
      m.setFile( file, type );
      sucessCb();
    }else{
      failCb();
    }
  }
  
  
}

export { ModalityCollection };
