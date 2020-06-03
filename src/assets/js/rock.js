import { TweenLite } from "gsap/TweenLite";

import yoyo from "../utils/yoyoUtil";
const THREE = require("three");
require("../utils/legacyJSONLoaderUtil");

const publicPath = process.env.PUBLIC_URL;

/**
 * 3D Rocks
 *
 * @class Rocks
 * @constructor
 * @requires THREE, TweenLite, yoyo
 */
class Rocks {
	constructor() {
		let group = new THREE.Object3D();
		let sphere = Rocks.getSphere();
		group.add(sphere);
		let light = Rocks.getLight();
		group.add(light);

		// rocks
		let rocksMaterial = new THREE.MeshLambertMaterial({
			color: "#0a0a0a",
			side: THREE.DoubleSide,
			flatShading: THREE.FlatShading
		});

		let fromColor = new THREE.Color("#0a0a0a");
		let toColor = new THREE.Color("#ffffff");

		let loader = new THREE.LegacyJSONLoader();
		loader.load(
			publicPath + "/3D/rocks.json",
			function(geometry) {
				let rocks = new THREE.Mesh(geometry, rocksMaterial);
				rocks.position.set(-70, 0, -30);
				group.add(rocks);

				let cache = { angle: 0, y: 11, intensity: 0, color: 0 };
				function update() {
					rocks.rotation.x = cache.angle;

					light.intensity = cache.intensity;

					light.position.y = cache.y;
					sphere.position.y = cache.y;

					sphere.material.color = fromColor.clone().lerp(toColor, cache.color);
				}

				this.in = function() {
					TweenLite.to(cache, 1, {
						angle: 0.3,
						y: 20,
						intensity: 15,
						color: 1,
						onUpdate: update
					});
				};

				this.out = function(way) {
					let y = way === "up" ? 11 : 20;
					TweenLite.to(cache, 1, {
						angle: 0,
						y: y,
						intensity: 0,
						color: 0,
						onUpdate: update
					});
				};

				let idleTween = TweenLite.to({ x: -2, z: -45 }, 2, {
					x: 2,
					z: -35,
					paused: true,
					onUpdate: function() {
						light.position.z = this.target.z;
						sphere.position.z = this.target.z;
					},
					onComplete: yoyo,
					onReverseComplete: yoyo
				});

				this.start = function() {
					idleTween.resume();
				};

				this.stop = function() {
					idleTween.pause();
				};
			}.bind(this)
		);

		this.el = group;
		this.in = function() {};
		this.out = this.in;
		this.start = this.in;
		this.stop = this.in;
	}

	/**
	 * Get white sphere
	 *
	 * @method getSphere
	 * @return {THREE.Mesh}
	 */
	static getSphere() {
		let material = new THREE.MeshBasicMaterial({
			color: "#0a0a0a",
			fog: false
		});
		let geometry = new THREE.SphereGeometry(5, 20, 20);
		let mesh = new THREE.Mesh(geometry, material);

		mesh.position.set(0, 11, -40);

		return mesh;
	}
	/**
	 * Get light
	 *
	 * @method getLight
	 * @return {THREE.Light}
	 */
	static getLight() {
		let light = new THREE.PointLight("#ffffff", 0, 50);
		light.position.set(0, 11, -40);

		return light;
	}
}

export default Rocks;