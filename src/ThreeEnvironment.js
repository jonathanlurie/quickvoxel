import * as THREE from 'three';

class ThreeEnvironment {
  
  /**
  * constructor, need the DOM element to setup the THREE js environment
  * @param {DOMElement} domEl - a div
  */
  constructor( domEl ){
    this._parentDiv = domEl;
    this._camera = null;
    this._scene = null;
    this._objectContainer = null;
    this._renderer = null;
    
    this._initThreeEnv();
    this._animate();
  }
  
  
  _initThreeEnv(){
    var objectContainer = new THREE.Object3D();
    this._camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 3500 );
    this._camera.position.z = 50;
    
    this._scene = new THREE.Scene();
    
    var axesHelper = new THREE.AxesHelper( 5 );
    this._scene.add( axesHelper );

    this._scene.add( new THREE.AmbientLight( 0x444444 ) );

    var light1 = new THREE.DirectionalLight( 0xffffff, 0.5 );
    light1.position.set( 1, 1, 1 );
    this._scene.add( light1 );

    var light2 = new THREE.DirectionalLight( 0xffffff, 1.5 );
    light2.position.set( 0, -1, 0 );
    this._scene.add( light2 );
    this._scene.add( objectContainer );

    this._renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
    this._renderer.setClearColor( 0xffffff, 0 );
    this._renderer.setPixelRatio( window.devicePixelRatio );
    this._renderer.setSize( window.innerWidth, window.innerHeight );
    this._renderer.gammaInput = true;
    this._renderer.gammaOutput = true;

    this._parentDiv.appendChild( this._renderer.domElement );
    window.addEventListener( 'resize', this._onWindowResize.bind(this), false );
  }
  
  
  _onWindowResize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize( window.innerWidth, window.innerHeight );
  }
  
  
  _animate() {
    requestAnimationFrame( this._animate.bind(this) );
    this._render();
  }
  
  
  _render(){
    
    //var time = Date.now() * 0.001;
    //objectContainer.rotation.x = time * 0.25;
    //objectContainer.rotation.y = time * 0.5;
    this._renderer.render( this._scene, this._camera );
  }
  
  
  addCube(){
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    var cube = new THREE.Mesh( geometry, material );
    this._objectContainer.add( cube );
  }
  
  
} /* END of class ThreeEnvironment */

export { ThreeEnvironment };
