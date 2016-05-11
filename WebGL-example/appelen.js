


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



/*var loader = new THREE.OBJLoader();
loader.load('karta.obj', function(sfar, mat) {

    var material = new THREE.MultiMaterial(mat);
    //var hej = new THREE.SphereGeometry(0.5, 32, 32, sfar);
    var object = new THREE.Mesh(sfar, mat);
    scene.add(object);
    }
);*/

// read object
var manager = new THREE.LoadingManager();
manager.onProgress = function (item, loaded, total)
{
    console.log(item, loaded, total);
};

var loader = new THREE.OBJLoader(manager);
loader.load('karta.obj', function (object) {

    console.log('object');
     console.log(object);

    object.children.forEach(function(element)) {

        var position = element.geometry.attributes.position.array;

        console.log(position);

        for (i = 0; i <= position.length; i += 3) {
            // var phi = position[i];
            // var r = position[i + 1];
            // var theta = position[i + 2];

            // var r = 1;
            // var x = r*Math.sin(2)*Math.cos(2);
            // var y = r*Math.sin(2)*Math.sin(2);
            // var z = r*Math.cos(2);

            // position[i] = x;
            // position[i + 1] = y;
            // position[i + 2] = z;
        }

    };




     scene.add(object);


     //var asia = new THREE.Object3D();
     var asia = object.getObjectByName("Asien");
     asia.scale.set(1,1,1);

    // var europe = new THREE.Object3D();
     var europe = object.getObjectByName("Europa");
     europe.scale.set(1,1,1);

     //var oceanien = new THREE.Object3D();
     var oceanien = object.getObjectByName("Oceanien");
     oceanien.scale.set(1,1,1);

     //var northamerica = new THREE.Object3D();
     var northamerica = object.getObjectByName("Nordamerika");
     northamerica.scale.set(1,1,1);

     //var southamerica = new THREE.Object3D();
     var southamerica = object.getObjectByName("Sydamerika");
     southamerica.scale.set(1,1,1);

     //var africa = new THREE.Object3D();
     var africa = object.getObjectByName("Afrika");
     africa.scale.set(1,3,1);

} );


  function render()
  {
  requestAnimationFrame(render);
  controls.update();
  renderer.render(scene, camera);
  }
  render();




