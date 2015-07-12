var NTScene = function () {
  this.gameStates = new Object();
  this.userId = "tmp";
  this.keyboard = new THREEx.KeyboardState();
  this.scene = new THREE.Scene();
  this.camera = null,
  this.renderer = new THREE.WebGLRenderer();
  this.geometry = new THREE.BoxGeometry( 1, 1, 1 );

  this.addPlayer = function (userId, state) {
    this.gameStates[userId] = state;
  }

  this.initSinglePlayer = function () {
    this.addPlayer(this.userId, new NT.NTGameState());
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );
    this.camera.position.z = 5;
  }

  this.renderLoop = function () {
  	if (this.keyboard.pressed("left") || this.keyboard.pressed("j")) {
  		this.gameStates[this.userId].jumpLeft();
  	}
  	if (this.keyboard.pressed("right") || this.keyboard.pressed("l")) {
  		this.gameStates[this.userId].jumpRight();
  	}
  	if (this.keyboard.pressed("down") || this.keyboard.pressed("k")) {
  		this.gameStates[this.userId].jumpDown();
  	}
  	if (this.keyboard.pressed("up") || this.keyboard.pressed("space") || this.keyboard.pressed("i")) {
  		this.gameStates[this.userId].toggleNTVariant();
  	}
  	this.gameStates[this.userId].gameLoop(false);

  	this.renderer.render(this.scene, this.camera);
  };

  this.startRenderLoop = function () {
    this.renderLoop();
  }

  this.initSinglePlayer();
}
