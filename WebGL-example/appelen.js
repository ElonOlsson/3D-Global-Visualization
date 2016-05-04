

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
 loader.load('objecWorldMapTest.obj', function (object) {

     scene.add(object);
 } );



function render()
{
    requestAnimationFrame(render);

    controls.update();
    renderer.render(scene, camera);
}
render();

