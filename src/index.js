"use strict";

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import planets from "./planets.json" assert { type: "json" };

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
	20,
	window.innerWidth / window.innerHeight,
	0.1,
	1000000
);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let sun;
let earth;
let moon;
let mercury;
let venus;
let mars;
let jupiter;
let saturn;
let uranus;
let neptune;

let controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.maxDistance = 8;
controls.minDistance = 4;
controls.enablePan = false;

//Loaders

const loadingMenager = new THREE.LoadingManager();

loadingMenager.onStart = (itemsLoaded, itemsTotal) => {
	console.log("loading started");
};

loadingMenager.onLoad = () => {
	const loadingScreen = document.querySelector(".loading-screen");
	const loadingButton = document.querySelector(".loading-button");
	const loadingIcon = document.querySelector(".loading-icon");

	loadingIcon.style.display = "none";
	gsap.to(loadingButton, { opacity: 1, duration: 0.5, display: "block" });

	loadingButton.addEventListener("click", () => {
		gsap.fromTo(
			loadingScreen,
			{ opacity: 1 },
			{ opacity: 0, duration: 0.5, display: "none" }
		);

		gsap.to(camera.position, {
			x: 3,
			y: 0,
			z: 5,
			duration: 1,
		});
	});
};

loadingMenager.onProgress = () => {};

loadingMenager.onError = () => {
	console.log("loading error");
};

const loader = new GLTFLoader(loadingMenager);
const textureLoader = new THREE.TextureLoader();

//Loading screen

//Loaded. models

//earth

loader.load("./models/earth.glb", (glb) => {
	earth = glb.scene;
	earth.scale.set(0.001, 0.001, 0.001);
	earth.rotation.set(0, 0, 0);
	scene.add(earth);
});

//moon

loader.load("./models/moon.glb", (glb) => {
	moon = glb.scene;
	moon.scale.set(0.1, 0.1, 0.1);
	moon.rotation.set(0, 2, 0.4);
	moon.position.set(-4, 1, -4);
	scene.add(moon);
});

//sun

loader.load("./models/sun.glb", (glb) => {
	sun = glb.scene;
	sun.scale.set(0.05, 0.05, 0.05);
	sun.position.set(2000, 0, 0);
	scene.add(sun);
});

//mercury

loader.load("./models/mercury.glb", (glb) => {
	mercury = glb.scene;
	mercury.scale.set(0.001, 0.001, 0.001);
	mercury.position.set(1300, 0, 0);
	scene.add(mercury);
});

//venus

loader.load("./models/venus.glb", (glb) => {
	venus = glb.scene;
	venus.scale.set(0.001, 0.001, 0.001);
	venus.position.set(1000, 0, -100);
	scene.add(venus);
});

//mars

loader.load("./models/mars.glb", (glb) => {
	mars = glb.scene;
	mars.scale.set(0.001, 0.001, 0.001);
	mars.position.set(-300, 0, 0);
	scene.add(mars);
});

//jupiter

loader.load("./models/jupiter.glb", (glb) => {
	jupiter = glb.scene;
	jupiter.scale.set(0.001, 0.001, 0.001);
	jupiter.rotation.set(0, 2.5, 0);
	jupiter.position.set(-1400, 0, 0);
	scene.add(jupiter);
});

//saturn

loader.load("./models/saturn.glb", (glb) => {
	saturn = glb.scene;
	saturn.scale.set(0.001, 0.001, 0.001);
	saturn.rotation.set(0, -0.2, -0.2);
	saturn.position.set(-2000, 0, 0);
	scene.add(saturn);
});

//uranus

loader.load("./models/uranus.glb", (glb) => {
	uranus = glb.scene;
	uranus.scale.set(0.001, 0.001, 0.001);
	uranus.rotation.set(0, 2, 0);
	uranus.position.set(-3000, 0, 0);
	scene.add(uranus);
});

//neptune

loader.load("./models/neptune.glb", (glb) => {
	neptune = glb.scene;
	neptune.scale.set(0.001, 0.001, 0.001);
	neptune.rotation.set(0, 2, 0);
	neptune.position.set(-4000, 100, 0);
	scene.add(neptune);
});

// Skybox (background)
const skyboxMesh = new THREE.BoxGeometry(14000, 14000, 14000);
const skyboxMaterial = new THREE.MeshBasicMaterial({
	map: textureLoader.load("./images/spacebg1.jpg"),
	side: THREE.BackSide,
});

const skybox = new THREE.Mesh(skyboxMesh, skyboxMaterial);

scene.add(skybox);

// Lights
const light = new THREE.DirectionalLight(0xffffff, 2);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.15);

scene.add(light);
scene.add(ambientLight);

light.position.set(1, 0, 0);

camera.position.z = 5;
camera.position.x = 8;

//Layers

//switching between planets

const planetSelect = document.getElementById("planet-select");

const planetButton = document.querySelector(".planet__btn");

const infoPage = document.querySelector(".planet-info");
const infoPageNerds = document.querySelector(".planet-info-nerds");

const planetTitle = document.querySelector(".title");
const infoSubTitle = document.querySelector(".subtitle");
const infoTitle = document.querySelector(".info-title");

const infoP1 = document.querySelector(".info-text__p1");
const infoP2 = document.querySelector(".info-text__p2");
const infoP3 = document.querySelector(".info-text__p3");
const infoP4 = document.querySelector(".info-text__p4");
const infoRadius = document.querySelector(".planet-info-radius");
const infoSurfaceArea = document.querySelector(".planet-info-surface");
const infoSurfaceGravity = document.querySelector(".planet-info-gravity");
const infoAverageTemperature = document.querySelector(
	".planet-info-temperature"
);
const infoSatellites = document.querySelector(".planet-info-satellites");

const handleSwitchPlanetTextContent = (planetInfo) => {
	gsap.to(camera.position, {
		x: planetInfo.cameraPosition.x,
		y: planetInfo.cameraPosition.y,
		z: planetInfo.cameraPosition.z,
		duration: 1,
	});
	controls.target.set(
		planetInfo.planetPosition.x,
		planetInfo.planetPosition.y,
		planetInfo.planetPosition.z
	);
	planetTitle.textContent = planetInfo.name;
	infoTitle.textContent = planetInfo.name;
	infoP1.textContent = planetInfo.paragraphs[0];
	infoP2.textContent = planetInfo.paragraphs[1];
	infoP3.textContent = planetInfo.paragraphs[2];
	infoP4.textContent = planetInfo.paragraphs[3];
	infoRadius.textContent = planetInfo.radius;
	infoSurfaceArea.textContent = planetInfo.surfaceArea;
	infoSurfaceGravity.textContent = planetInfo.surfaceGravity;
	infoAverageTemperature.textContent = planetInfo.averageTemperature;
	infoSatellites.textContent = planetInfo.satellites;
};

planetButton.addEventListener("click", () => {
	const planet = planetSelect.value;
	const planetInfo = planets.find((e) => e.value === planet);
	handleSwitchPlanetTextContent(planetInfo);
});

planetTitle.addEventListener("click", () => {
	infoPage.classList.toggle("close");
	infoPageNerds.classList.toggle("close");
	infoSubTitle.textContent = "Close info";
	if (infoPage.classList.contains("close")) {
		infoSubTitle.textContent = "Click for more info";
	}
});

infoPageNerds.addEventListener("click", () => {
	infoPage.classList.toggle("close");
	infoPageNerds.classList.toggle("close");
	infoSubTitle.textContent = "Close info";
	if (infoPage.classList.contains("close")) {
		infoSubTitle.textContent = "Click for more info";
	}
});

infoPage.addEventListener("click", () => {
	infoPage.classList.toggle("close");
	infoPageNerds.classList.toggle("close");
	infoSubTitle.textContent = "Close info";
	if (infoPage.classList.contains("close")) {
		infoSubTitle.textContent = "Click for more info";
	}
});

infoSubTitle.addEventListener("click", () => {
	infoPage.classList.toggle("close");
	infoPageNerds.classList.toggle("close");
	infoSubTitle.textContent = "Close info";
	if (infoPage.classList.contains("close")) {
		infoSubTitle.textContent = "Click for more info";
	}
});

function animate() {
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
