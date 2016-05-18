
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1,10000);
camera.position.set( 0, 0, -40 );

// ljuskälla, follows the camera. camera child to scene, light child to camera
scene.add(camera);
var flashlight = new THREE.SpotLight(0xffffff,0.6,1000);
flashlight.position.set(-45,46,1);
flashlight.target = camera;
camera.add(flashlight);

//var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
//directionalLight.position.set( 20, 0, 20 );
//scene.add( directionalLight );

scene.add(new THREE.AmbientLight(0x404040));



var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("containerRight").appendChild(renderer.domElement);

//document.getElementById("clickMe").onclick = doFunction(10);

var el = document.getElementById("clickMe");
if (el.addEventListener)
    el.addEventListener("click", doFunction, false);
else if (el.attachEvent) {
    el.attachEvent('onclick', doFunction);
}
var doFunction;

/****************************************
 SKAPAR GLOBEN
 ***************************************/
var sphere = new THREE.SphereGeometry(10.5, 32, 32);
var material = new THREE.MeshPhongMaterial({ color: 0x156289} );
var earthMesh = new THREE.Mesh( sphere, material);
scene.add(earthMesh);

var geometryStars = new THREE.SphereGeometry(50, 32, 32);
var materialStars = new THREE.MeshBasicMaterial();
materialStars.map = THREE.ImageUtils.loadTexture('Bilder/stars.png');
materialStars.side = THREE.BackSide;
var starMesh = new THREE.Mesh(geometryStars, materialStars);
scene.add(starMesh);


//Controll
var controls = new THREE.OrbitControls(camera,renderer.domElement);
//controls.addEventListener('change', render);
controls.enableDamping = true;
controls.dampingFactor = 0.9;
controls.enableZoom = true;

//Zoomar man ut mer så missar ljuset globen
controls.minDistance = 30;
controls.maxDistance = 60;



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

    /****************************************
     SKALA OM KONTINENTER
     ***************************************/

    var scAsia = 12;

    var Asia = object.getObjectByName("Asien");
    var positionAsia = Asia.geometry.attributes.position.array;
    for(i=0; i<=positionAsia.length; i +=3) {
        positionAsia[i+2] *= scAsia;
    }

    var scOceanien = 1;

    var Oceanien = object.getObjectByName("Oceanien");
    var positionOceanien = Oceanien.geometry.attributes.position.array;
    for(i=0; i<=positionOceanien.length; i +=3) {
        positionOceanien[i+2] *= scOceanien;
    }

    var scEurope = 2;

    var Europe = object.getObjectByName("Europa");
    var positionEurope= Europe.geometry.attributes.position.array;
    for(i=0; i<=positionEurope.length; i +=3) {
        positionEurope[i+2] *= scEurope;
    }

    var scNorthamerica = 1;

    var Northamerica = object.getObjectByName("Nordamerika");
    var positionNorthamerica = Northamerica.geometry.attributes.position.array;
    for(i=0; i<=positionNorthamerica.length; i +=3) {
        positionNorthamerica[i+2] *= scNorthamerica;
    }

    var scSouthamerica = 1.8;

    var Southamerica = object.getObjectByName("Sydamerika");
    var positionSouthamerica = Southamerica.geometry.attributes.position.array;
    for(i=0; i<=positionSouthamerica.length; i +=3) {
        positionSouthamerica[i+2] *= scSouthamerica;
    }

    var scAfrica = 3.2;

    var Africa = object.getObjectByName("Afrika");
    var positionAfrica = Africa.geometry.attributes.position.array;
    doFunction = function (scAfrika) {
        for(i=0; i<=positionAfrica.length; i +=3) {
            positionAfrica[i+2] *= scAfrica;
        }
    };



    scaleColor(positionAsia[i+2], Asia);
    scaleColor(positionOceanien[i+2], Oceanien);
    scaleColor(positionEurope[i+2], Europe);
    scaleColor(positionNorthamerica[i+2], Northamerica);
    scaleColor(positionSouthamerica[i+2], Southamerica);
    scaleColor(positionAfrica[i+2], Africa);


    /*****************************************************
     Funktion för att färga kontinenter beroende av höjd
     ****************************************************/

    function scaleColor(continentPosition, continentObj) {

        if (continentPosition >= 3) {
            continentObj.material.color.setHex(0x156249)
        }

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

    //The start location
    object.rotation.x = Math.PI/2 - Math.PI/8;
    object.rotation.z = Math.PI/2 + Math.PI/8;

    scene.add(object);

} );




function render()
{
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);

    starMesh.rotation.y += 0.0003;

}
render();


