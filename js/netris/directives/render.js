angular.module("netrisRender", [])
	.directive(
		"netrisRender",
		[function () {
			return {
				restrict: "E",
				scope: {
					playerId: "=playerId"
				},
				link: function (scope, elem, attr) {
					var tmpState = new NT.NTGameState();

					var keyboard = new THREEx.KeyboardState();

					var scene = new THREE.Scene();
					var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

					var renderer = new THREE.WebGLRenderer();
					renderer.setSize( window.innerWidth, window.innerHeight );
					document.body.appendChild( renderer.domElement );

					var geometry = new THREE.BoxGeometry( 1, 1, 1 );
					var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

					var cubes = []
					for (i = 0; i < 10; i++) {
						var cube = new THREE.Mesh( geometry, material );
						cube.position.x = -6 + (i * 1.5);
						cubes.push(cube);
						scene.add( cubes[cubes.length - 1] );
					}

					camera.position.z = 5;

					var render = function () {


						if (keyboard.pressed("left") || keyboard.pressed("j")) {
							tmpState.jumpLeft();
						}
						if (keyboard.pressed("right") || keyboard.pressed("l")) {
							tmpState.jumpRight();
						}
						if (keyboard.pressed("down") || keyboard.pressed("k")) {
							tmpState.jumpDown();
						}
						if (keyboard.pressed("up") || keyboard.pressed("space") || keyboard.pressed("i")) {
							tmpState.toggleNTVariant();
						}
						tmpState.gameLoop(false);


						requestAnimationFrame( render );

						for (i in cubes) {
							var cube = cubes[i];
							// cube.rotation.x += 0.1;
							cube.rotation.y += 0.1;
						}

						renderer.render(scene, camera);
					};

					render();

				}
			}
		}
	]);
