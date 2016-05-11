


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
var sphere = new THREE.SphereGeometry(10.5, 32, 32);
var material = new THREE.MeshPhongMaterial({ color: 0x156289} );
var earthMesh = new THREE.Mesh( sphere, material);

scene.add(earthMesh);

//Controll
var controls = new THREE.OrbitControls(camera,renderer.domElement);
//controls.addEventListener('change', render);
controls.enableDamping = true;
controls.dampingFactor = 0.9;
controls.enableZoom = true;

camera.position.z = 4;



/****************************************
            LÄS IN KARTAN
 ***************************************/
var manager = new THREE.LoadingManager();
manager.onProgress = function (item, loaded, total)
{
    console.log(item, loaded, total);
};

var loader = new THREE.OBJLoader(manager);
loader.load('thisistheultimatemap.obj', function (object) {

    console.log('object');
     console.log(object);


    /****************************************
     SKALA OM KONTINENTER
     ***************************************/
    var Asia = object.getObjectByName("Asien");
    var positionAsia = Asia.geometry.attributes.position.array;
    for(i=0; i<=positionAsia.length; i +=3) {
        positionAsia[i+2] *= 1;
    }

    var Oceanien = object.getObjectByName("Oceanien");
    var positionOceanien = Oceanien.geometry.attributes.position.array;
    for(i=0; i<=positionOceanien.length; i +=3) {
        positionOceanien[i+2] *= 1;
    }

    var Europe = object.getObjectByName("Europa");
    var positionEurope= Europe.geometry.attributes.position.array;
    for(i=0; i<=positionEurope.length; i +=3) {
        positionEurope[i+2] *= 1;
    }

    var Northamerica = object.getObjectByName("Nordamerika");
    var positionNorthamerica = Northamerica.geometry.attributes.position.array;
    for(i=0; i<=positionNorthamerica.length; i +=3) {
        positionNorthamerica[i+2] *= 1;
    }

    var Southamerica = object.getObjectByName("Sydamerika");
    var positionSouthamerica = Southamerica.geometry.attributes.position.array;
    for(i=0; i<=positionSouthamerica.length; i +=3) {
        positionSouthamerica[i+2] *= 1;
    }

    var Africa = object.getObjectByName("Afrika");
    var positionAfrica = Africa.geometry.attributes.position.array;
    for(i=0; i<=positionAfrica.length; i +=3) {
        positionAfrica[i+2] *= 1;
    }


    /*var asia = object.getObjectByName("Asien");
    asia.scale.set(1,1,1);

    var europe = object.getObjectByName("Europa");
    europe.scale.set(1,1,1);

    var oceanien = object.getObjectByName("Oceanien");
    oceanien.scale.set(1,1,1);

    var northamerica = object.getObjectByName("Nordamerika");
    northamerica.scale.set(1,1,1);

    var southamerica = object.getObjectByName("Sydamerika");
    southamerica.scale.set(1,1,1);

    var africa = object.getObjectByName("Afrika");
    africa.scale.set(1,1,1);*/

    /****************************************
            GÖR KARTAN TILL EN SFÄR
     ***************************************/


    object.children.forEach(function(element) {

        var position = element.geometry.attributes.position.array;
        var uvposition = element.geometry.attributes.uv.array;

        console.log(position);

        for (i = 0, j=0; i <= position.length; i += 3, j+=2) {


            var theta = (uvposition[j+1])*-Math.PI; //U
            var phi = (uvposition[j]-0.5)*2*-Math.PI; //V


            var r = position[i+2]+10;
            var x = r*Math.sin(theta)*Math.cos(phi);
            var y = r*Math.sin(theta)*Math.sin(phi);
            var z = r*Math.cos(theta);

            position[i] = x;
            position[i+1] = y;
            position[i+2] = z;
        }

        element.geometry.computeFaceNormals();
        element.geometry.normalsNeedUpdate = true;
    });




     scene.add(object);

} );


  function render()
  {
  requestAnimationFrame(render);
  controls.update();
  renderer.render(scene, camera);
  }
  render();




