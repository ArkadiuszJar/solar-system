"use strict";

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";

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

const loader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();

//Loading screen

const loadingScreen = document.querySelector(".loading-screen");
const loadingButton = document.querySelector(".loading-button");

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

//Loaded models

//earth

loader.load("/models/earth.glb", (glb) => {
	earth = glb.scene;
	earth.scale.set(0.001, 0.001, 0.001);
	earth.rotation.set(0, 0, 0);
	scene.add(earth);
});

//moon

loader.load("/models/moon.glb", (glb) => {
	moon = glb.scene;
	moon.scale.set(0.1, 0.1, 0.1);
	moon.rotation.set(0, 2, 0.4);
	moon.position.set(-4, 1, -4);
	scene.add(moon);
});

//sun

loader.load("/models/sun.glb", (glb) => {
	sun = glb.scene;
	sun.scale.set(0.05, 0.05, 0.05);
	sun.position.set(2000, 0, 0);
	scene.add(sun);
});

//mercury

loader.load("/models/mercury.glb", (glb) => {
	mercury = glb.scene;
	mercury.scale.set(0.001, 0.001, 0.001);
	mercury.position.set(1300, 0, 0);
	scene.add(mercury);
});

//venus

loader.load("/models/venus.glb", (glb) => {
	venus = glb.scene;
	venus.scale.set(0.001, 0.001, 0.001);
	venus.position.set(1000, 0, -100);
	scene.add(venus);
});

//mars

loader.load("/models/mars.glb", (glb) => {
	mars = glb.scene;
	mars.scale.set(0.001, 0.001, 0.001);
	mars.position.set(-300, 0, 0);
	scene.add(mars);
});

//jupiter

loader.load("/models/jupiter.glb", (glb) => {
	jupiter = glb.scene;
	jupiter.scale.set(0.001, 0.001, 0.001);
	jupiter.rotation.set(0, 2.5, 0);
	jupiter.position.set(-1400, 0, 0);
	scene.add(jupiter);
});

//saturn

loader.load("/models/saturn.glb", (glb) => {
	saturn = glb.scene;
	saturn.scale.set(0.001, 0.001, 0.001);
	saturn.rotation.set(0, -0.2, -0.2);
	saturn.position.set(-2000, 0, 0);
	scene.add(saturn);
});

//uranus

loader.load("/models/uranus.glb", (glb) => {
	uranus = glb.scene;
	uranus.scale.set(0.001, 0.001, 0.001);
	uranus.rotation.set(0, 2, 0);
	uranus.position.set(-3000, 0, 0);
	scene.add(uranus);
});

//neptune

loader.load("/models/neptune.glb", (glb) => {
	neptune = glb.scene;
	neptune.scale.set(0.001, 0.001, 0.001);
	neptune.rotation.set(0, 2, 0);
	neptune.position.set(-4000, 100, 0);
	scene.add(neptune);
});

// Skybox (background)
const skyboxMesh = new THREE.BoxGeometry(14000, 14000, 14000);
const skyboxMaterial = new THREE.MeshBasicMaterial({
	map: textureLoader.load("/images/spacebg1.jpg"),
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

//planets infos

const earthInfo = {
	p1: "Earth is the third planet from the Sun and the only astronomical object known to harbor life.",

	p2: "About 29.2% of Earth's surface is land consisting of continents and islands.",

	p3: "The remaining 70.8% is covered with water, mostly by oceans but alsolakes, rivers and other fresh water, which together constitute the hydrosphere.",

	p4: "Earth's gravity interacts with other objects in space, especially the Sun and the Moon, Earth's only natural satellite. Earth orbits around the Sun in 365.256 days, a period known as an Earth year. During this time, Earth rotates about its axis about 366.256 times.",

	radius: "6371 km",
	surfaceArea: "510,072,000 km²",
	surfaceGravity: "9.8 m/s²",
	averageTemperature: "14°C",
	satellites: "1",
};

const mercuryInfo = {
	p1: "Mercury is the smallest planet in the Solar System and the closest to the Sun. Its orbit around the Sun takes 87.97 Earth days, the shortest of all the Sun's planets.",

	p2: "It is named after the Roman god Mercurius (Mercury), god of commerce, messenger of the gods, and mediator between gods and mortals, corresponding to the Greek god Hermes ",

	p3: "Mercury is one of four terrestrial planets in the Solar System, and is a rocky body like Earth. Mercury is also smaller, albeit more massive,than the largest natural satellites in the Solar System, Ganymede and Titan.",

	p4: "Mercury consists of approximately 70% metallic and 30% silicate material.",

	radius: "2440 km",
	surfaceArea: "7,600,000 km²",
	surfaceGravity: "3.7 m/s²",
	averageTemperature: "430°C",
	satellites: "0",
};

const venusInfo = {
	p1: "Venus is the second planet from the Sun. It is named after the Roman goddess of love and beauty. As the second-brightest natural object in Earth's night sky after the Moon, Venus can cast shadows and, rarely, is visible to the naked eye in broad daylight.",

	p2: "Venus lies within Earth's orbit, and so never appears to venture far from the Sun, either setting in the west just after dusk or rising in the east a bit before dawn.",

	p3: "Venus is a terrestrial planet and is sometimes called Earth's sister planet due to their similar size, mass, proximity to the Sun, and bulk composition.",

	p4: "It is radically different from Earth in other respects. Venus has the densest atmosphere of the four terrestrial planets, consisting of more than 96% carbon dioxide. ",

	radius: "6052 km",
	surfaceArea: "460,000,000 km²",
	surfaceGravity: "8.8 m/s²",
	averageTemperature: "471°C",
	satellites: "0",
};

const marsInfo = {
	p1: "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, being larger than only Mercury. Mars carries the name of the Roman god of war, and is often referred to as the 'Red Planet' because the reddish iron oxide prevalent on its surface.",

	p2: "Mars is a terrestrial planet with a thin atmosphere, having surface features reminiscent both of the impact craters of the Moon and the valleys, deserts, and polar ice caps of Earth.",

	p3: "The rotational period and seasonal cycles of Mars are likewise similar to those of Earth, as is the tilt that produces the seasons.",

	p4: "Mars is the site of Olympus Mons, the largest volcano and second-highest known mountain in the Solar System..",

	radius: "3390 km",
	surfaceArea: "144,800,000 km²",
	surfaceGravity: "3.7 m/s²",
	averageTemperature: "-63°C",
	satellites: "2",
};

const jupiterInfo = {
	p1: "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half times that of all the other planets in the Solar System combined.",

	p2: "Jupiter is one of the brightest objects visible to the naked eye in the night sky, and has been known to ancient civilizations since before recorded history.",

	p3: "It is named after the Roman god Jupiter. When viewed from Earth, Jupiter can be bright enough for its reflected light to cast visible shadows, and is on average the third-brightest natural object in the night sky after the Moon and Venus.",

	p4: "Jupiter's prominent bands of clouds are composed of ammonia crystals, and are thought to be a result of the planet's rapid rotation.",

	radius: "69911 km",
	surfaceArea: "6,142,000,000 km²",
	surfaceGravity: "24.8 m/s²",
	averageTemperature: "-108°C",
	satellites: "79",
};

const saturnInfo = {
	p1: "Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius about nine times that of Earth.",

	p2: "It only has one-eighth the average density of Earth; however, with its larger volume, Saturn is over 95 times more massive. Saturn is named after the Roman god of agriculture; its astronomical symbol (♄) represents the god's sickle.",

	p3: "Saturn is the second-luminous planet in the Solar System, after the Sun, and is the most distant that can be seen with the naked eye.",

	p4: "Its most famous feature is its prominent ring system that is composed mostly of ice particles with a smaller amount of rocky debris and dust.",

	radius: "58232 km",
	surfaceArea: "4,272,000,000 km²",
	surfaceGravity: "10.4 m/s²",
	averageTemperature: "-138°C",
	satellites: "82",
};

const uranusInfo = {
	p1: "Uranus is the seventh planet from the Sun. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System.",

	p2: "Uranus is similar in composition to Neptune, and both have bulk chemical compositions which differ from that of the larger gas giants Jupiter and Saturn.",

	p3: "For this reason, scientists often classify Uranus and Neptune as 'ice giants' to distinguish them from the other giant planets.",

	p4: "Uranus' atmosphere is similar to Jupiter's and Saturn's in its primary composition of hydrogen and helium, but it contains more 'ices' such as water, ammonia, and methane, along with traces of other hydrocarbons.",

	radius: "25362 km",
	surfaceArea: "8,115,000,000 km²",
	surfaceGravity: "8.7 m/s²",
	averageTemperature: "-195°C",
	satellites: "27",
};

const neptuneInfo = {
	p1: "Neptune is the eighth and farthest known planet from the Sun in the Solar System. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet.",
	p2: "Neptune is 17 times the mass of Earth, slightly more massive than its near-twin Uranus. ",
	p3: "Neptune orbits the Sun once every 164.8 years at an average distance of 30.1 AU (4.5 billion km; 2.8 billion mi). It is named after the Roman god of the sea and has the astronomical symbol ♆, a stylised version of the god Neptune's trident.",
	p4: "Neptune is not visible to the naked eye and is the only planet in the Solar System found by mathematical prediction rather than by empirical observation.",

	radius: "24622 km",
	surfaceArea: "7,618,000,000 km²",
	surfaceGravity: "11.0 m/s²",
	averageTemperature: "-201°C",
	satellites: "14",
};

planetButton.addEventListener("click", () => {
	const planet = planetSelect.value;
	switch (planet) {
		case "mercury":
			controls.target = mercury.position;
			gsap.to(camera.position, {
				x: 1303,
				y: 0,
				z: 5,
				duration: 1,
			});
			planetTitle.textContent = "Mercury";
			infoTitle.textContent = "Mercury";
			infoP1.textContent = mercuryInfo.p1;
			infoP2.textContent = mercuryInfo.p2;
			infoP3.textContent = mercuryInfo.p3;
			infoP4.textContent = mercuryInfo.p4;
			infoRadius.textContent = mercuryInfo.radius;
			infoSurfaceArea.textContent = mercuryInfo.surfaceArea;
			infoSurfaceGravity.textContent = mercuryInfo.surfaceGravity;
			infoAverageTemperature.textContent = mercuryInfo.averageTemperature;
			infoSatellites.textContent = mercuryInfo.satellites;

			break;
		case "venus":
			controls.target = venus.position;
			gsap.to(camera.position, {
				x: 1003,
				y: 0,
				z: -95,
				duration: 1,
			});
			planetTitle.textContent = planetSelect.value;
			infoTitle.textContent = "Venus";
			infoP1.textContent = venusInfo.p1;
			infoP2.textContent = venusInfo.p2;
			infoP3.textContent = venusInfo.p3;
			infoP4.textContent = venusInfo.p4;
			infoRadius.textContent = venusInfo.radius;
			infoSurfaceArea.textContent = venusInfo.surfaceArea;
			infoSurfaceGravity.textContent = venusInfo.surfaceGravity;
			infoAverageTemperature.textContent = venusInfo.averageTemperature;
			infoSatellites.textContent = venusInfo.satellites;

			break;
		case "mars":
			controls.target = mars.position;
			gsap.to(camera.position, {
				x: -297,
				y: 0,
				z: 5,
				duration: 1,
			});

			planetTitle.textContent = "Mars";
			infoTitle.textContent = "Mars";
			infoP1.textContent = marsInfo.p1;
			infoP2.textContent = marsInfo.p2;
			infoP3.textContent = marsInfo.p3;
			infoP4.textContent = marsInfo.p4;
			infoRadius.textContent = marsInfo.radius;
			infoSurfaceArea.textContent = marsInfo.surfaceArea;
			infoSurfaceGravity.textContent = marsInfo.surfaceGravity;
			infoAverageTemperature.textContent = marsInfo.averageTemperature;
			infoSatellites.textContent = marsInfo.satellites;

			break;
		case "jupiter":
			controls.target = jupiter.position;

			gsap.to(camera.position, {
				x: -1397,
				y: 0,
				z: 5,
				duration: 1,
			});
			planetTitle.textContent = "Jupiter";
			infoTitle.textContent = "Jupiter";
			infoP1.textContent = jupiterInfo.p1;
			infoP2.textContent = jupiterInfo.p2;
			infoP3.textContent = jupiterInfo.p3;
			infoP4.textContent = jupiterInfo.p4;
			infoRadius.textContent = jupiterInfo.radius;
			infoSurfaceArea.textContent = jupiterInfo.surfaceArea;
			infoSurfaceGravity.textContent = jupiterInfo.surfaceGravity;
			infoAverageTemperature.textContent = jupiterInfo.averageTemperature;
			infoSatellites.textContent = jupiterInfo.satellites;

			break;
		case "saturn":
			controls.target = saturn.position;
			gsap.to(camera.position, {
				x: -1997,
				y: 0,
				z: 5,
				duration: 1,
			});
			planetTitle.textContent = "Saturn";
			infoTitle.textContent = "Saturn";
			infoP1.textContent = saturnInfo.p1;
			infoP2.textContent = saturnInfo.p2;
			infoP3.textContent = saturnInfo.p3;
			infoP4.textContent = saturnInfo.p4;
			infoRadius.textContent = saturnInfo.radius;
			infoSurfaceArea.textContent = saturnInfo.surfaceArea;
			infoSurfaceGravity.textContent = saturnInfo.surfaceGravity;
			infoAverageTemperature.textContent = saturnInfo.averageTemperature;
			infoSatellites.textContent = saturnInfo.satellites;

			break;
		case "uranus":
			controls.target = uranus.position;
			gsap.to(camera.position, {
				x: -2997,
				y: 0,
				z: 5,
				duration: 1,
			});

			planetTitle.textContent = "Uranus";
			infoTitle.textContent = "Uranus";
			infoP1.textContent = uranusInfo.p1;
			infoP2.textContent = uranusInfo.p2;
			infoP3.textContent = uranusInfo.p3;
			infoP4.textContent = uranusInfo.p4;
			infoRadius.textContent = uranusInfo.radius;
			infoSurfaceArea.textContent = uranusInfo.surfaceArea;
			infoSurfaceGravity.textContent = uranusInfo.surfaceGravity;
			infoAverageTemperature.textContent = uranusInfo.averageTemperature;
			infoSatellites.textContent = uranusInfo.satellites;

			break;
		case "neptune":
			controls.target = neptune.position;
			planetTitle.textContent = "Neptune";
			infoTitle.textContent = "Neptune";
			infoP1.textContent = neptuneInfo.p1;
			infoP2.textContent = neptuneInfo.p2;
			infoP3.textContent = neptuneInfo.p3;
			infoP4.textContent = neptuneInfo.p4;
			infoRadius.textContent = neptuneInfo.radius;
			infoSurfaceArea.textContent = neptuneInfo.surfaceArea;
			infoSurfaceGravity.textContent = neptuneInfo.surfaceGravity;
			infoAverageTemperature.textContent = neptuneInfo.averageTemperature;
			infoSatellites.textContent = neptuneInfo.satellites;

			gsap.to(camera.position, {
				x: -3997,
				y: 100,
				z: 5,
				duration: 1,
			});
			break;
		default:
			controls.target = earth.position;
			planetTitle.textContent = "Earth";
			infoTitle.textContent = "Earth";
			infoP1.textContent = earthInfo.p1;
			infoP2.textContent = earthInfo.p2;
			infoP3.textContent = earthInfo.p3;
			infoP4.textContent = earthInfo.p4;
			infoRadius.textContent = earthInfo.radius;
			infoSurfaceArea.textContent = earthInfo.surfaceArea;
			infoSurfaceGravity.textContent = earthInfo.surfaceGravity;
			infoAverageTemperature.textContent = earthInfo.averageTemperature;
			infoSatellites.textContent = earthInfo.satellites;
			gsap.to(camera.position, {
				x: 3,
				y: 0,
				z: 5,
				duration: 1,
			});
	}
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
