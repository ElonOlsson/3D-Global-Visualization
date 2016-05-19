
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1,10000);
camera.position.set( 0, 0, -40 );

// ljuskälla, follows the camera. camera child to scene, light child to camera
scene.add(camera);
var flashlight = new THREE.PointLight(0xffffff,1,100);
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
//document.getElementById("clickMe").onclick = doFunction(10);

/*******************************************
                 DECLARATIONS
 ********************************************/

var Asia, Europe, Africa, Southamerica, Northamerica, Oceanien;
var theta, phi, r;
var x, y, z;
var scAsia = 12;
var scOceanien = 1;
var scEurope = 2;
var scNorthamerica = 1;
var scSouthamerica = 1.8;
var scAfrica = 3;


/*******************************************
        BUTTONFUNCTIONS
********************************************/

function buttonPopulation(AF, AS, EU, OC, SA, NA) {
    scAsia = AS;
    scOceanien = OC;
    scEurope = EU;
    scNorthamerica = NA;
    scSouthamerica = SA;
    scAfrica = AF;
    
    console.log("population");
    createWorld(AF, AS, EU, OC, SA, NA);
}



var el1 = document.getElementById("population");
if (el1.addEventListener)
    el1.addEventListener("click", buttonPopulation, false);

else if (el1.attachEvent) {
    el1.attachEvent('onclick', buttonPopulation);
}


var el2 = document.getElementById("medellivslängd");
if (el2.addEventListener)
    el2.addEventListener("click", buttonLifeExpecantcy, false);

else if (el2.attachEvent) {
    el2.attachEvent('onclick', buttonLifeExpecantcy);
}

function buttonLifeExpecantcy() {
    console.log("medellivslängd");
}








/****************************************
            SKAPAR GLOBEN
 ***************************************/
var sphere = new THREE.SphereGeometry(10.5, 32, 32);
var material = new THREE.MeshPhongMaterial({shininess: 20, color: 0x4fa1ec} );
var earthMesh = new THREE.Mesh( sphere, material);
scene.add(earthMesh);


/****************************************
            SKAPAR BAKGRUNDEN
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
var controls = new THREE.OrbitControls(camera,renderer.domElement);
//controls.addEventListener('change', render);
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
            LÄS IN KARTAN
 ***************************************/
var manager = new THREE.LoadingManager();
manager.onProgress = function (item, loaded, total)
{
    console.log(item, loaded, total);
};




createWorld();
function createWorld( scAsia, scOceanien, scEurope, scNorthamerica , scSouthamerica, scAfrica ) {

var loader = new THREE.OBJLoader(manager);
loader.load('thisistheultimatemap.obj', function (object) {

    console.log('object');


    /****************************************
     SKALA OM KONTINENTER OCH GÖR TILL SFÄR
     ***************************************/


    /************ ASIEN ****************/


    Asia = object.getObjectByName("Asien");
    var positionAsia = Asia.geometry.attributes.position.array;
    var uvpositionAS = Asia.geometry.attributes.uv.array;

    for(i=0, j=0; i<=positionAsia.length; i +=3, j +=2) {
        theta = (uvpositionAS[j+1])*-Math.PI; //U
        phi = (uvpositionAS[j]-0.5)*2*-Math.PI; //V
        r = (positionAsia[i+2]*scAsia+10);

        x = r*Math.sin(theta)*Math.cos(phi);
        y = r*Math.sin(theta)*Math.sin(phi);
        z = r*Math.cos(theta);

        positionAsia[i] = x;
        positionAsia[i+1] = y;
        positionAsia[i+2] =z;

    }
    Asia.geometry.computeFaceNormals();
    Asia.geometry.computeVertexNormals();
    Asia.geometry.normalsNeedUpdate = true;

    Asia.rotation.x = Math.PI/2 - Math.PI/8;
    Asia.rotation.z = Math.PI/2 + Math.PI/8;
    scene.add(Asia);



    /************ OCEANIEN ****************/

    Oceanien = object.getObjectByName("Oceanien");
    var positionOceanien = Oceanien.geometry.attributes.position.array;
    var uvpositionOC = Oceanien.geometry.attributes.uv.array;

    for(i=0, j=0; i<=positionOceanien.length; i +=3, j +=2) {
        theta = (uvpositionOC[j+1])*-Math.PI; //U
        phi = (uvpositionOC[j]-0.5)*2*-Math.PI; //V
        r = (positionOceanien[i+2]*scOceanien+10);

        x = r*Math.sin(theta)*Math.cos(phi);
        y = r*Math.sin(theta)*Math.sin(phi);
        z = r*Math.cos(theta);

        positionOceanien[i] = x;
        positionOceanien[i+1] = y;
        positionOceanien[i+2] =z;

    }
    Oceanien.geometry.computeFaceNormals();
    Oceanien.geometry.computeVertexNormals();
    Oceanien.geometry.normalsNeedUpdate = true;

    Oceanien.rotation.x = Math.PI/2 - Math.PI/8;
    Oceanien.rotation.z = Math.PI/2 + Math.PI/8;
    scene.add(Oceanien);


    /************ EUROPA ****************/

    Europe = object.getObjectByName("Europa");
    var positionEurope= Europe.geometry.attributes.position.array;
    var uvpositionEU = Europe.geometry.attributes.uv.array;

    for(i=0, j=0; i<=positionEurope.length; i +=3, j +=2) {
        theta = (uvpositionEU[j+1])*-Math.PI; //U
        phi = (uvpositionEU[j]-0.5)*2*-Math.PI; //V
        r = (positionEurope[i+2]*scEurope+10);

        x = r*Math.sin(theta)*Math.cos(phi);
        y = r*Math.sin(theta)*Math.sin(phi);
        z = r*Math.cos(theta);

        positionEurope[i] = x;
        positionEurope[i+1] = y;
        positionEurope[i+2] =z;


    }
    Europe.geometry.computeFaceNormals();
    Europe.geometry.computeVertexNormals();
    Europe.geometry.normalsNeedUpdate = true;

    Europe.rotation.x = Math.PI/2 - Math.PI/8;
    Europe.rotation.z = Math.PI/2 + Math.PI/8;
    scene.add(Europe);


    /************ NORDAMERIKA ****************/

    Northamerica = object.getObjectByName("Nordamerika");
    var positionNorthamerica = Northamerica.geometry.attributes.position.array;
    var uvpositionNA = Northamerica.geometry.attributes.uv.array;

    for(i=0, j=0; i<=positionNorthamerica.length; i +=3, j +=2) {
        theta = (uvpositionNA[j+1])*-Math.PI; //U
        phi = (uvpositionNA[j]-0.5)*2*-Math.PI; //V
        r = (positionNorthamerica[i+2]*scNorthamerica+10);

        x = r*Math.sin(theta)*Math.cos(phi);
        y = r*Math.sin(theta)*Math.sin(phi);
        z = r*Math.cos(theta);

        positionNorthamerica[i] = x;
        positionNorthamerica[i+1] = y;
        positionNorthamerica[i+2] =z;

    }
    Northamerica.geometry.computeFaceNormals();
    Northamerica.geometry.computeVertexNormals();
    Northamerica.geometry.normalsNeedUpdate = true;


    Northamerica.rotation.x = Math.PI/2 - Math.PI/8;
    Northamerica.rotation.z = Math.PI/2 + Math.PI/8;
    scene.add(Northamerica);


    /************ SYDAMERIKA ****************/

    Southamerica = object.getObjectByName("Sydamerika");
    var positionSouthamerica = Southamerica.geometry.attributes.position.array;
    var uvpositionSA = Southamerica.geometry.attributes.uv.array;

    for(i=0, j=0; i<=positionSouthamerica.length; i +=3, j +=2) {
        theta = (uvpositionSA[j+1])*-Math.PI; //U
        phi = (uvpositionSA[j]-0.5)*2*-Math.PI; //V
        r = (positionSouthamerica[i+2]*scSouthamerica+10);

        x = r*Math.sin(theta)*Math.cos(phi);
        y = r*Math.sin(theta)*Math.sin(phi);
        z = r*Math.cos(theta);

        positionSouthamerica[i] = x;
        positionSouthamerica[i+1] = y;
        positionSouthamerica[i+2] =z;

    }
    Southamerica.geometry.computeFaceNormals();
    Southamerica.geometry.computeVertexNormals();
    Southamerica.geometry.normalsNeedUpdate = true;

    Southamerica.rotation.x = Math.PI/2 - Math.PI/8;
    Southamerica.rotation.z = Math.PI/2 + Math.PI/8;
    scene.add(Southamerica);


    /************ AFRIKA ****************/

    Africa = object.getObjectByName("Afrika");
    var positionAfrica = Africa.geometry.attributes.position.array;
    var uvpositionAF = Africa.geometry.attributes.uv.array;

    for(i=0, j=0; i<=positionAfrica.length; i +=3, j +=2) {
        theta = (uvpositionAF[j+1])*-Math.PI; //U
        phi = (uvpositionAF[j]-0.5)*2*-Math.PI; //V
        r = (positionAfrica[i+2]*scAfrica+10);

        x = r*Math.sin(theta)*Math.cos(phi);
        y = r*Math.sin(theta)*Math.sin(phi);
        z = r*Math.cos(theta);

        positionAfrica[i] = x;
        positionAfrica[i+1] = y;
        positionAfrica[i+2] =z;

    }
    Africa.geometry.computeFaceNormals();
    Africa.geometry.computeVertexNormals();
    Africa.geometry.normalsNeedUpdate = true;

    Africa.rotation.x = Math.PI/2 - Math.PI/8;
    Africa.rotation.z = Math.PI/2 + Math.PI/8;
    scene.add(Africa);




    /*****************************************************
                            ÄNDRA FÄRGER
     ****************************************************/

    var color = [0xd5832, 0x4e8342, 0x6fa13f, 0x9ab438, 0xdfa943, 0xcc3f3f];

    function scaleColor(scale) {

        if (scale >= 1 && scale < 1.5) {
            var material = new THREE.MeshPhongMaterial({ color: color[0]} );
        }

        else if (scale >= 1.5 && scale < 2) {
            var material = new THREE.MeshPhongMaterial({ color: color[1]} );
        }

        else if (scale >= 2 && scale < 2.5) {
            var material = new THREE.MeshPhongMaterial({ color: color[2]} );

        }

        else if (scale >= 2.5 && scale < 3) {
            var material = new THREE.MeshPhongMaterial({ color: color[3]} );
        }

        else if (scale >= 3 && scale < 4) {
            var material = new THREE.MeshPhongMaterial({ color: color[4]} );
        }

        else {
            var material = new THREE.MeshPhongMaterial({color: color[5]} );
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

    /****************************************
     GÖR KARTAN TILL EN SFÄR
     ***************************************/

    /*object.children.forEach(function(element) {

        var position = element.geometry.attributes.position.array;
        uvposition = element.geometry.attributes.uv.array;

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
        element.geometry.computeVertexNormals();
        element.geometry.normalsNeedUpdate = true;
    });

    object.rotation.x = Math.PI/2 - Math.PI/8;
    object.rotation.z = Math.PI/2 + Math.PI/8;


    scene.add(object);*/

} );
}


function render()
{
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
    starMesh.rotation.y += 0.0003;
    starMesh.rotation.x += 0.0003;
}


render();

