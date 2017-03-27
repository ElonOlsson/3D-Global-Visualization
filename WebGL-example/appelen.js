var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(0, 0, -40);
scene.add(camera);

/*******************************************
 LIGHT SOURCE
 ********************************************/
// ljuskälla, follows the camera. camera child to scene, light child to camera
var flashlight = new THREE.PointLight(0xffffff, 1, 100);
flashlight.target = camera;
flashlight.position.copy(camera.position);
scene.add(flashlight);

scene.add(new THREE.AmbientLight(0x404040));


var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container").appendChild(renderer.domElement);

/*******************************************
 DECLARATIONS
 ********************************************/
var Asia, Europe, Africa, Southamerica, Northamerica, Oceanien;
var theta, phi, r;
var x, y, z;
var continentsObjects = [Asia, Europe, Africa, Southamerica, Northamerica, Oceanien];

/****************************************
 CREATE SPHERE
 ***************************************/
var sphere = new THREE.SphereGeometry(10.5, 32, 32);
var material = new THREE.MeshPhongMaterial({shininess: 20, color: 0x3a6698});
var earthMesh = new THREE.Mesh(sphere, material);
scene.add(earthMesh);

/****************************************
 CREATE BACKGROUND
 ***************************************/
var geometryStars = new THREE.SphereGeometry(50, 32, 32);
var materialStars = new THREE.MeshBasicMaterial();
materialStars.map = THREE.ImageUtils.loadTexture('Bilder/spaceb.png');
materialStars.side = THREE.BackSide;
var starMesh = new THREE.Mesh(geometryStars, materialStars);
scene.add(starMesh);


/****************************************
 ORBIT CONTROLS
 ***************************************/
var controls = new THREE.OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.dampingFactor = 0.9;
controls.enableZoom = true;

//Zoomar man ut mer än 82 så missar ljuset globen
controls.minDistance = 30;
controls.maxDistance = 50;

//updatera så att ljuset följer kameran
controls.addEventListener('change', light_update)
function light_update() {
    flashlight.position.copy(camera.position);
}


/****************************************
 LOAD WORLD MAP
 ***************************************/
var manager = new THREE.LoadingManager();
manager.onProgress = function (item, loaded, total) {
    console.log(item, loaded, total);
};

createWorld(2, 2, 2, 2, 2, 2);
//AF, AS, EU, OC, SA, NA
function createWorld(scAfrica, scAsia, scEurope, scOceanien, scSouthamerica, scNorthamerica) {
    var loader = new THREE.OBJLoader(manager);
    loader.load('thisistheultimatemap.obj', function (object) {

        //ta istället bort objectet i arrayen med alla object i? dvs continentsObjects[x]
        for(var i=0; i < continentsObjects.length; i++){
            scene.remove(continentsObjects[i]);
        }

        console.log('object');

        /****************************************
         CREATE CONTINENTS
         ***************************************/
        var scaleFactorsArray = [scAsia, scEurope, scAfrica, scSouthamerica, scNorthamerica, scOceanien];

        console.log(continentsObjects.length);
        var continentsName = ["Asien", "Europa", "Afrika", "Sydamerika", "Nordamerika", "Oceanien"];
        for(var k = 0; k<continentsObjects.length; k++){
            continentsObjects[k] = object.getObjectByName(continentsName[k]);
            var position = continentsObjects[k].geometry.attributes.position.array;
            var UVposition = continentsObjects[k].geometry.attributes.uv.array;

            for (var i = 0, j = 0; i <= position.length; i += 3, j += 2) {
                theta = (UVposition[j + 1]) * -Math.PI; //U
                phi = (UVposition[j] - 0.5) * 2 * -Math.PI; //V
                r = (position[i + 2] * scaleFactorsArray[k] + 10);

                x = r * Math.sin(theta) * Math.cos(phi);
                y = r * Math.sin(theta) * Math.sin(phi);
                z = r * Math.cos(theta);

                position[i] = x;
                position[i + 1] = y;
                position[i + 2] = z;

            }

            console.log(continentsObjects[k]);
            continentsObjects[k].geometry.computeFaceNormals();
            continentsObjects[k].geometry.computeVertexNormals();
            continentsObjects[k].geometry.normalsNeedUpdate = true;

            continentsObjects[k].rotation.x = Math.PI / 2 - Math.PI / 8;
            continentsObjects[k].rotation.z = Math.PI / 2 + Math.PI / 8;
            scene.add(continentsObjects[k]);
        }


        /*****************************************************
         CHANGE COLOR
        *****************************************************/

        var color = [0xd5832, 0x4e8342, 0x6fa13f, 0x9ab438, 0xcedf43, //gröna
            0xecee47, 0xeebb1f, //gula
            0xffa330, 0xff8e30, 0xff7930, 0xdd5b2f, //orangea
            0xcc4d3f, 0xcc3f3f];


        function scaleColor(scale) {
            if (scale >= 1 && scale < 1.5) {
                var material = new THREE.MeshPhongMaterial({color: color[0]});
            }

            else if (scale >= 1.5 && scale < 2) {
                var material = new THREE.MeshPhongMaterial({color: color[1]});
            }

            else if (scale >= 2 && scale < 2.5) {
                var material = new THREE.MeshPhongMaterial({color: color[2]});
            }

            else if (scale >= 2.5 && scale < 3) {
                var material = new THREE.MeshPhongMaterial({color: color[3]});
            }

            else if (scale >= 3 && scale < 4) {
                var material = new THREE.MeshPhongMaterial({color: color[4]});
            }

            else if (scale >= 4 && scale < 5) {
                var material = new THREE.MeshPhongMaterial({color: color[5]});
            }

            else if (scale >= 5 && scale < 6) {
                var material = new THREE.MeshPhongMaterial({color: color[6]});
            }

            else if (scale >= 6 && scale < 7) {
                var material = new THREE.MeshPhongMaterial({color: color[7]});
            }

            else if (scale >= 7 && scale < 8) {
                var material = new THREE.MeshPhongMaterial({color: color[8]});
            }

            else if (scale >= 8 && scale < 9) {
                var material = new THREE.MeshPhongMaterial({color: color[9]});
            }

            else if (scale >= 9 && scale < 10) {
                var material = new THREE.MeshPhongMaterial({color: color[10]});
            }

            else if (scale >= 10 && scale < 11) {
                var material = new THREE.MeshPhongMaterial({color: color[11]});
            }

            else {
                var material = new THREE.MeshPhongMaterial({color: color[12]});
            }
            return material;
        }

        //        [scAsia, scEurope, scAfrica, scSouthamerica, scNorthamerica, scOceanien];
        for(i=0; i<continentsObjects.length; i++) {
            continentsObjects[i].material = scaleColor(scaleFactorsArray[i]);
        }

    });

}
/*****************************************************
RENDER
*****************************************************/

function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
    starMesh.rotation.y += 0.0003;
    starMesh.rotation.x += 0.0003;
}
render();