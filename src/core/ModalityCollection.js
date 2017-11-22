import { Modality } from './Modality.js';


/**
* An instance of ModalityCollection represent a list of modalities of various types
* and provide a convenient interface to deal with modalities (addind, removing, searching, etc.)
*/
class ModalityCollection {
  constructor(){
    this._modalities = [];
  }
  
  
  /**
  * Add a new modality
  * @param {File} file - File or Blob to be loaded
  * @param {String} type - one of the valid types
  * @param {Function} successCb - a callback called in case of success (no arg)
  * @param {Function} failCb - a callback called in case of failure (no arg)
  */
  addModality( file, type, successCb, failCb ){
    console.log("blah");
    console.log( file );
    if( Modality.isValidModalityType( type ) ){
      var m = new Modality();
      m.setFile( file, type );
      successCb();
    }else{
      failCb();
    }
  }
  
  
  /**
  * Remove a modality from the collection
  * @param {Number} index - the index of the modality to remove
  * @param {Function} successCb - a callback called in case of success (no arg)
  * @param {Function} failCb - a callback called in case of failure (no arg)
  */
  removeModality( index, successCb, failCb ){
    if( index<0 || index>=this._modalities.length){
      console.warn("The modality index is out of bound.");
      failCb();
    }
    
    var modRemoved = this._modalities[index];
    this._modalities.splice( index, 1 );
    successCb( modRemoved );
  }
  
  
  /**
  * Get the number of modalities
  * @return {Number}
  */
  getNumberOfModalities(){
    return this._modalities.length;
  }
  
  getModalityList(){
    
  }
  
  
}

export { ModalityCollection };
