


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight, 0.1,10000);
var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
directionalLight.position.set( 20, 0, 20 );
scene.add( directionalLight );
scene.add(new THREE.AmbientLight(0x404040));


var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Jorden
var sphere = new THREE.SphereGeometry(0.5, 32, 32);
var material = new THREE.MeshPhongMaterial();
var earthMesh = new THREE.Mesh( sphere, material);

scene.add(earthMesh);

//Controll
var controls = new THREE.OrbitControls(camera,renderer.domElement);
//controls.addEventListener('change', render);
controls.enableDamping = true;
controls.dampingFactor = 0.9;
controls.enableZoom = true;

camera.position.z = 4;

// read object
var manager = new THREE.LoadingManager();
 manager.onProgress = function (item, loaded, total)
 {
 console.log(item, loaded, total);
 };



 var loader = new THREE.OBJLoader(manager);
 loader.load('karta.obj', function (object) {

     console.log(object);
     scene.add(object);


     var asia = new THREE.Object3D();
     asia = object.getObjectByName("Asien");
     asia.scale.set(1,1,1);

     var europe = new THREE.Object3D();
     asia = object.getObjectByName("Europa");
     asia.scale.set(1,1,1);

     var oceanien = new THREE.Object3D();
     asia = object.getObjectByName("Oceanien");
     asia.scale.set(1,1,1);

     var northamerica = new THREE.Object3D();
     asia = object.getObjectByName("Nordamerika");
     asia.scale.set(1,1,1);

     var southamerica = new THREE.Object3D();
     asia = object.getObjectByName("Sydamerika");
     asia.scale.set(1,1,1);

     var africa = new THREE.Object3D();
     asia = object.getObjectByName("Afrika");
     asia.scale.set(1,1,1);





 } );


  function render()
  {
  requestAnimationFrame(render);
  controls.update();
  renderer.render(scene, camera);
  }
  render();




