
/**
* Gives the list of acceptable modality types and wether (true) or not (false) they
* are actual types.
*/
const MODALITY_TYPES = {
  mesh: true,
  volume: true,
  unknown: false
}

/**
* A modality is the duo made of an HTML5 File object (or Blob) and its
* once-loaded-and-parsed counterpart, which will generally be a Pixpipe object
* such as a Image3D or a Mesh3D. This guarrantis some integrity and provide the
* flexibility of not always having to load and parse a file directly when the
* user selects it from a file dialog but rather when it will be necessary and used
*
*/
class Modality {
  
  constructor(){
    this._file = null;
    this._object = null;
    this._type = "unknown";
    
    // a modality is valid until the file is read and an atempt to parsing is 
    // performed. Then, is the generic parser that goes with the given modality
    // type fails, the _isValid switches to false, FOR EVER.
    this._isValid = true;
  }
  
  
  /**
  * [STATIC]
  * Get the object that list the comaptible modalities.
  * @return {Object}
  */
  static getModalityTypes(){
    return MODALITY_TYPES;
  }
  
  
  /**
  * Get if the given modality type is a valid one
  * @param {String} modType - a type of modality
  * @return {boolean} true if valid, false if invalid
  */
  static isValidModalityType( modType ){
    return (modType in  MODALITY_TYPES);
  }
  
  
  /**
  * Set the file and type of this modality
  * @param {File} f - HTML File object
  * @param {String} type - 
  */
  setFile( f, type ){
    if( type in MODALITY_TYPES && MODALITY_TYPES[type] ){
      this._file = f;
      this._type = t
    }else{
      console.warn(`The modality ${type} is a possible choice.\nPossible choices are ${Object.keys(MODALITY_TYPES).join('" "')}`);
    }
  }
  
  
  parseFile(){
    if( !this._isValid ){
      return null;
    }else{
      // TODO
    }
  }
  
  
  /**
  * Get the object, result of the parsed file. If the file was never read before,
  * this method will perform an attempt of reading and parsing it. 
  * @return {Object} most likely a Pixpipe object, or null if incompatible with the given type.
  */
  GetObject(){
    if( !this._object ){
      this.parseFile();
      if(!this._isValid){
        console.warn(`ERROR: The file ${this._file.name} is not a valid ${this._type}.`);
      }
    }
    
    return this._object;
  }
  
  
  /**
  * Tells if this modality has ever been atte;pted to be loaded.
  * @return {Boolean} true if an attempt of loading was done, false if never tried
  */
  hasAttemptedToLoad(){
    var neverTried = (!this._object && this._isValid)
    return !neverTried;
  }
  
  
  /**
  * Get if the modality is valid and loaded, IOW, we can do something with it.
  * @return {Boolean} true if ready, false if not
  */
  isReady(){
    return ( this._object && this._isValid );
  }
  
  
  /**
  * Return if valid. Note that with no attempt of loading, a modality is considered
  * valid. It will get invalid only if the attempt of reading it failed.
  * @return {Boolean} true if valid, false if not
  */
  ifValid(){
    return this._isValid;
  }
  
}
