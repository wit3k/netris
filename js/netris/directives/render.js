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
					var ntScene = new NTScene();

					var renderLoop = function () {
						ntScene.startRenderLoop();
						requestAnimationFrame( renderLoop );
					};
					renderLoop();
				}
			}
		}
	]);
