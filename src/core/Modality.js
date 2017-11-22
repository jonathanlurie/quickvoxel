
import * as PIXPIPE from 'pixpipejs'; 

/**
* Gives the list of acceptable modality types and wether (true) or not (false) they
* are actual types.
*/
const MODALITY_TYPES = {
  mesh: "mesh",
  volume: "volume",
  unknown: "unknown"
}

const MODALITY_COMPATIBLE = {
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
    if( type in MODALITY_TYPES && MODALITY_COMPATIBLE[type] ){
      this._file = f;
      this._type = type
    }else{
      console.warn(`The modality ${type} is a possible choice.\nPossible choices are ${Object.keys(MODALITY_TYPES).join('" "')}`);
    }
  }
  
  
  
  /**
  * Get the object, result of the parsed file. If the file was never read before,
  * this method will perform an attempt of reading and parsing it.
  * @param {Function} successCb - callback to use the modality object (called with the object as argument)
  * @param {Function} failCb - callback to use if the modality cannot retrieve the assicated object
  */
  GetObject( successCb, failCb ){
    var that = this;
    
    if( !this._object ){
      if(this._isValid){
        
        if( this._type === MODALITY_TYPES.unknown ){
          failCb();
          return;
        }
        
        var file2Buff = new PIXPIPE.FileToArrayBufferReader();
        file2Buff.addInput( this._file );
          
        if( this._isTextFile() ){
          file2Buff.setMetadata("readAsText", true);
        }
        
        file2Buff.on("ready", function(){
          var buff = this.getOutput();
          var object = null;
          
          if( this._type === MODALITY_TYPES.volume ){
            var generic3DDecoder = new pixpipe.Image3DGenericDecoderAlt();
            generic3DDecoder.addInput( buff );
            generic3DDecoder.update();
            object = generic3DDecoder.getOutput();
          }else if( this._type === MODALITY_TYPES.mesh ){
            var meshParser = new pixpipe.MniObjDecoder();
            meshParser.addInput( buff );
            meshParser.update();
            object = meshParser.getOutput();
          }
          
          if( object ){
            that._object = object;
            successCb( that._object );
          }else{
            that._isValid = false;
            failCb();
          }
          
        });

        file2Buff.update();
      }else{
        console.warn(`ERROR: The file ${this._file.name} is not a valid ${this._type}.`);
      }
    }else{
      successCb( this._object )
    }
  }
  
  
  /**
  * [NOTICE] This is very basic but accurate for the moment. This method should
  * be improved as new file types are included.  
  * Get if the given file to load is a text file or a binary file
  * @return {Boolean} true for text file, false for binary file
  */
  _isTextFile(){
    return !( this._type == "volume" );
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
  
  
  /**
  * Get the name of this modalitie's file
  * @return {String} the filename
  */
  getFilename(){
    return this._file.name;
  }
  
  
  /**
  * Get the type of a modality
  * @return {String} type ("volume", "mesh")
  */
  getType(){
    return this._type;
  }
  
} /* END of class Modality */

export { Modality };
