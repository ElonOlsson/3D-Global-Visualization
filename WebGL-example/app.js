

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight, 0.1,10000);
var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
directionalLight.position.set( 20, 0, 20 );
scene.add( directionalLight );
scene.add(new THREE.AmbientLight(0x404040));


var renderer = new THREE.WebGLRenderer();
renderer.setSize(window. innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Jorden
var sphere = new THREE.SphereGeometry(0.5, 32, 32);
var material = new THREE.MeshPhongMaterial();
material.shininess = 8;
material.map = THREE.ImageUtils.loadTexture('earthmap1k.jpg');
material.bumpMap = THREE.ImageUtils.loadTexture('earthbump1k.jpg');
material.bumpScale =  0.08;
material.specularMap = THREE.ImageUtils.loadTexture('earthspec1k.jpg');
material.specular = new THREE.Color('grey');

var earthMesh = new THREE.Mesh( sphere, material);

scene.add(earthMesh);

//Clouden
var geometryCloud = new THREE.SphereGeometry(0.51, 32, 32);
var materialCloud = new THREE.MeshPhongMaterial();

//materialCloud.map = new THREE.ImageUtils.loadTexture('clouds.png');
materialCloud.map = new THREE.ImageUtils.loadTexture('earthcloudmaptrans.jpg')
materialCloud.side = THREE.DoubleSide;
materialCloud.opacity = 0.2;
materialCloud.transparent = true;
materialCloud.depthWrite = false;

var cloudMesh = new THREE.Mesh(geometryCloud,materialCloud);
earthMesh.add(cloudMesh);

//Galaxerna
var geometryStars = new THREE.SphereGeometry(100, 32, 32);
var materialStars = new THREE.MeshBasicMaterial();

materialStars.map = THREE.ImageUtils.loadTexture('abc123.jpg');
materialStars.side = THREE.BackSide;

var starMesh = new THREE.Mesh(geometryStars, materialStars);
scene.add(starMesh);

	var controls = new THREE.OrbitControls(camera,renderer.domElement);
	//controls.addEventListener('change', render);
	controls.enableDamping = true;
	controls.dampingFactor = 0.9;
	controls.enableZoom = true;

	camera.position.z = 4;



function render()
{
	requestAnimationFrame(render);

	earthMesh.rotation.y += 0.003;
	cloudMesh.rotation.y += 0.004;
	starMesh.rotation.x += 0.0002;

	controls.update();
	renderer.render(scene, camera);
}
render();


