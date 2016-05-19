var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(0, 0, -40);

// ljuskälla, follows the camera. camera child to scene, light child to camera
scene.add(camera);
var flashlight = new THREE.PointLight(0xffffff, 1, 100);
flashlight.target = camera;
flashlight.position.copy(camera.position);
scene.add(flashlight);

//var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
//directionalLight.position.set( 20, 0, 20 );
//scene.add( directionalLight );
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
materialStars.map = THREE.ImageUtils.loadTexture('Bilder/stars.png');
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

//Zoomar man ut mer så missar ljuset globen
controls.minDistance = 30;
controls.maxDistance = 60;

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

createWorld(1, 1, 1, 1, 1, 1);
//AF, AS, EU, OC, SA, NA
function createWorld(scAfrica, scAsia, scEurope, scOceanien, scSouthamerica, scNorthamerica) {
    var loader = new THREE.OBJLoader(manager);
    loader.load('thisistheultimatemap.obj', function (object) {

        scene.remove(Asia);
        scene.remove(Africa);
        scene.remove(Europe);
        scene.remove(Oceanien);
        scene.remove(Northamerica);
        scene.remove(Southamerica);

        console.log('object');

        /****************************************
         CREATE CONTINENTS
         ***************************************/


        /************ ASIA ****************/

        Asia = object.getObjectByName("Asien");
        var positionAsia = Asia.geometry.attributes.position.array;
        var uvpositionAS = Asia.geometry.attributes.uv.array;

        for (i = 0, j = 0; i <= positionAsia.length; i += 3, j += 2) {
            theta = (uvpositionAS[j + 1]) * -Math.PI; //U
            phi = (uvpositionAS[j] - 0.5) * 2 * -Math.PI; //V
            r = (positionAsia[i + 2] * scAsia + 10);

            x = r * Math.sin(theta) * Math.cos(phi);
            y = r * Math.sin(theta) * Math.sin(phi);
            z = r * Math.cos(theta);

            positionAsia[i] = x;
            positionAsia[i + 1] = y;
            positionAsia[i + 2] = z;

        }
        console.log(scAsia);

        Asia.geometry.computeFaceNormals();
        Asia.geometry.computeVertexNormals();
        Asia.geometry.normalsNeedUpdate = true;

        Asia.rotation.x = Math.PI / 2 - Math.PI / 8;
        Asia.rotation.z = Math.PI / 2 + Math.PI / 8;
        scene.add(Asia);


        /************ OCEANIA ****************/

        Oceanien = object.getObjectByName("Oceanien");
        var positionOceanien = Oceanien.geometry.attributes.position.array;
        var uvpositionOC = Oceanien.geometry.attributes.uv.array;

        for (i = 0, j = 0; i <= positionOceanien.length; i += 3, j += 2) {
            theta = (uvpositionOC[j + 1]) * -Math.PI; //U
            phi = (uvpositionOC[j] - 0.5) * 2 * -Math.PI; //V
            r = (positionOceanien[i + 2] * scOceanien + 10);

            x = r * Math.sin(theta) * Math.cos(phi);
            y = r * Math.sin(theta) * Math.sin(phi);
            z = r * Math.cos(theta);

            positionOceanien[i] = x;
            positionOceanien[i + 1] = y;
            positionOceanien[i + 2] = z;

        }
        Oceanien.geometry.computeFaceNormals();
        Oceanien.geometry.computeVertexNormals();
        Oceanien.geometry.normalsNeedUpdate = true;

        Oceanien.rotation.x = Math.PI / 2 - Math.PI / 8;
        Oceanien.rotation.z = Math.PI / 2 + Math.PI / 8;
        scene.add(Oceanien);


        /************ EUROPE ****************/

        Europe = object.getObjectByName("Europa");
        var positionEurope = Europe.geometry.attributes.position.array;
        var uvpositionEU = Europe.geometry.attributes.uv.array;

        for (i = 0, j = 0; i <= positionEurope.length; i += 3, j += 2) {
            theta = (uvpositionEU[j + 1]) * -Math.PI; //U
            phi = (uvpositionEU[j] - 0.5) * 2 * -Math.PI; //V
            r = (positionEurope[i + 2] * scEurope + 10);

            x = r * Math.sin(theta) * Math.cos(phi);
            y = r * Math.sin(theta) * Math.sin(phi);
            z = r * Math.cos(theta);

            positionEurope[i] = x;
            positionEurope[i + 1] = y;
            positionEurope[i + 2] = z;


        }
        Europe.geometry.computeFaceNormals();
        Europe.geometry.computeVertexNormals();
        Europe.geometry.normalsNeedUpdate = true;

        Europe.rotation.x = Math.PI / 2 - Math.PI / 8;
        Europe.rotation.z = Math.PI / 2 + Math.PI / 8;
        scene.add(Europe);


        /************ NORTH AMERICA ****************/

        Northamerica = object.getObjectByName("Nordamerika");
        var positionNorthamerica = Northamerica.geometry.attributes.position.array;
        var uvpositionNA = Northamerica.geometry.attributes.uv.array;

        for (i = 0, j = 0; i <= positionNorthamerica.length; i += 3, j += 2) {
            theta = (uvpositionNA[j + 1]) * -Math.PI; //U
            phi = (uvpositionNA[j] - 0.5) * 2 * -Math.PI; //V
            r = (positionNorthamerica[i + 2] * scNorthamerica + 10);

            x = r * Math.sin(theta) * Math.cos(phi);
            y = r * Math.sin(theta) * Math.sin(phi);
            z = r * Math.cos(theta);

            positionNorthamerica[i] = x;
            positionNorthamerica[i + 1] = y;
            positionNorthamerica[i + 2] = z;

        }
        Northamerica.geometry.computeFaceNormals();
        Northamerica.geometry.computeVertexNormals();
        Northamerica.geometry.normalsNeedUpdate = true;


        Northamerica.rotation.x = Math.PI / 2 - Math.PI / 8;
        Northamerica.rotation.z = Math.PI / 2 + Math.PI / 8;
        scene.add(Northamerica);


        /************ SOUTH AMERICA ****************/

        Southamerica = object.getObjectByName("Sydamerika");
        var positionSouthamerica = Southamerica.geometry.attributes.position.array;
        var uvpositionSA = Southamerica.geometry.attributes.uv.array;

        for (i = 0, j = 0; i <= positionSouthamerica.length; i += 3, j += 2) {
            theta = (uvpositionSA[j + 1]) * -Math.PI; //U
            phi = (uvpositionSA[j] - 0.5) * 2 * -Math.PI; //V
            r = (positionSouthamerica[i + 2] * scSouthamerica + 10);

            x = r * Math.sin(theta) * Math.cos(phi);
            y = r * Math.sin(theta) * Math.sin(phi);
            z = r * Math.cos(theta);

            positionSouthamerica[i] = x;
            positionSouthamerica[i + 1] = y;
            positionSouthamerica[i + 2] = z;

        }
        Southamerica.geometry.computeFaceNormals();
        Southamerica.geometry.computeVertexNormals();
        Southamerica.geometry.normalsNeedUpdate = true;

        Southamerica.rotation.x = Math.PI / 2 - Math.PI / 8;
        Southamerica.rotation.z = Math.PI / 2 + Math.PI / 8;
        scene.add(Southamerica);


        /************ AFRICA ****************/

        Africa = object.getObjectByName("Afrika");
        var positionAfrica = Africa.geometry.attributes.position.array;
        var uvpositionAF = Africa.geometry.attributes.uv.array;

        for (i = 0, j = 0; i <= positionAfrica.length; i += 3, j += 2) {
            theta = (uvpositionAF[j + 1]) * -Math.PI; //U
            phi = (uvpositionAF[j] - 0.5) * 2 * -Math.PI; //V
            r = (positionAfrica[i + 2] * scAfrica + 10);

            x = r * Math.sin(theta) * Math.cos(phi);
            y = r * Math.sin(theta) * Math.sin(phi);
            z = r * Math.cos(theta);

            positionAfrica[i] = x;
            positionAfrica[i + 1] = y;
            positionAfrica[i + 2] = z;

        }
        Africa.geometry.computeFaceNormals();
        Africa.geometry.computeVertexNormals();
        Africa.geometry.normalsNeedUpdate = true;

        Africa.rotation.x = Math.PI / 2 - Math.PI / 8;
        Africa.rotation.z = Math.PI / 2 + Math.PI / 8;
        scene.add(Africa);


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

            else if (scale >= 10 && scale < 11) {
                var material = new THREE.MeshPhongMaterial({color: color[10]});
            }

            else if (scale >= 11 && scale < 12) {
                var material = new THREE.MeshPhongMaterial({color: color[11]});
            }

            else {
                var material = new THREE.MeshPhongMaterial({color: color[12]});
            }
            return material;

        }

        Asia.material = scaleColor(scAsia);
        Oceanien.material = scaleColor(scOceanien);
        Europe.material = scaleColor(scEurope);
        Northamerica.material = scaleColor(scNorthamerica);
        Southamerica.material = scaleColor(scSouthamerica);
        Africa.material = scaleColor(scAfrica);


        /*************************************************************************************************
         Försöker fixa scale animation m.h.a scaleAnim-funktionen så
         den växer med growingspeed varje gång funktionen loopas.
         Händer dock inget atm.

         http://stackoverflow.com/questions/10735922/how-to-stop-a-requestanimationframe-recursion-loop
         *******************************************************************************************'*******/
        /*
         var growingSpeed = 3;


         function scaleAnim() {

         //stopanimation?
         if (positionAsia[i+2] == scAsia) return;

         for(i = 0; i <= positionAsia.length; i += 3) {
         positionAsia[i+2] *= growingSpeed;
         }


         window.requestAnimationFrame(scaleAnim);


         }*/

        //start scale animation
        //scaleAnim();

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