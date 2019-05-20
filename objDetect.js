/**
 * Created by chad hart on 11/30/17.
 * Client side of Tensor Flow Object Detection Web API
 * Written for webrtcHacks - https://webrtchacks.com
 */

//Parameters
const s = document.getElementById('objDetect');
const sourceVideo = s.getAttribute("data-source");  //the source video to use
const uploadWidth = s.getAttribute("data-uploadWidth") || 640; //the width of the upload file
const mirror = s.getAttribute("data-mirror") || false; //mirror the boundary boxes
const scoreThreshold = s.getAttribute("data-scoreThreshold") || 0.5;
const apiServer = s.getAttribute("data-apiServer") || window.location.origin + '/image'; //the full TensorFlow Object Detection API server url

//Video element selector
v = document.getElementById(sourceVideo);

//for starting events
let isPlaying = false,
    gotMetadata = false;

//Canvas setup

//create a canvas to grab an image for upload
let imageCanvas = document.createElement('canvas');
let imageCtx = imageCanvas.getContext("2d");

//create a canvas for drawing object boundaries
let drawCanvas = document.createElement('canvas');
document.body.appendChild(drawCanvas);
let drawCtx = drawCanvas.getContext("2d");

//draw boxes and labels on each detected object

let canvas = document.createElement('canvas');
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  canvas.style.position = 'absolute';
  canvas.style.top = '0px';
  canvas.style.left = '0px';
  let context = canvas.getContext("2d");
  //initilize three js and webgl
        let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  let controls = new THREE.DeviceOrientationControls( camera );
  //let controls = new THREE.OrbitControls( camera );
  camera.position.z = 0;
  camera.position.y = 20;
  controls.update();
  let renderer = new THREE.WebGLRenderer({
    antialias : false,
    alpha : true,  // transparent canvas to overlay on top of video
  });
  
  // add some lighting to scene
  let ambient = new THREE.AmbientLight( 0xFFFFFF );
  scene.add( ambient );
  let directionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 );
        directionalLight.position.set(0,1,0);
        scene.add( directionalLight );

  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );




function drawBoxes(objects) {

    //clear the previous drawings
    drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);

    //filter out objects that contain a class_name and then draw boxes and labels on each
    objects.filter(object => object.class_name).forEach(object => {

        let x = object.x * drawCanvas.width;
        let y = object.y * drawCanvas.height;
        let width = (object.width * drawCanvas.width) - x;
        let height = (object.height * drawCanvas.height) - y;

        //flip the x axis if local video is mirrored
        if (mirror) {
		
            x = drawCanvas.width - (x + width)
        }

        drawCtx.fillText(object.class_name + " - " + Math.round(object.score * 100) + "%", x + 5, y + 10);
	if(object.class_name=="nine"){
	pokeballEffects();
       let gltfLoader = new THREE.GLTF2Loader();
		gltfLoader.load("static/ar-demos/src/obj/lapras/lapras" + ".gltf", ( gltf) => {
			// set position?
			gltf.name = "lapras";
			gltf.scene.scale.set( 2, 2, 2);
			gltf.scene.rotation.set(0, 1.5, 0);
			gltf.scene.position.set(-40,0,-30);
			// masterball has 100% catch rate
			renderer.render(scene, camera);
				scene.add( gltf.scene );
			
		},( xhr ) => {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},
	  ( error ) =>{
				console.warn("Failed to load " + error);
			}
		);
		animate();
		canvas.style.display = "block";
              
        }
        if(object.class_name=="ten"){
	pokeballEffects();
       let gltfLoader = new THREE.GLTF2Loader();
		gltfLoader.load("static/ar-demos/src/obj/bulbasaur/bulbasaur" + ".gltf", ( gltf) => {
			// set position?
			gltf.name = "bulbasaur";
			gltf.scene.scale.set( 10, 10, 10);
			gltf.scene.rotation.set(0, -1.5, 10);
			gltf.scene.position.set(-40,0,-30);
			// masterball has 100% catch rate
			renderer.render(scene, camera);
				scene.add( gltf.scene );
			
		},( xhr ) => {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},
	  ( error ) =>{
				console.warn("Failed to load " + error);
			}
		);
		animate();
		canvas.style.display = "block";
              
        }
		if(object.class_name=="jack"){
	pokeballEffects();
       let gltfLoader = new THREE.GLTF2Loader();
		gltfLoader.load("static/ar-demos/src/obj/charmander/charmander" + ".gltf", ( gltf) => {
			// set position?
			gltf.name = "charmander";
			gltf.scene.scale.set( 2, 2, 2);
			gltf.scene.rotation.set(0, 0, 0);
			gltf.scene.position.set(0,0,-30);
			// masterball has 100% catch rate
			renderer.render(scene, camera);
				scene.add( gltf.scene );
			
		},( xhr ) => {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},
	  ( error ) =>{
				console.warn("Failed to load " + error);
			}
		);
			animate();
		canvas.style.display = "block";
              
        }
			if(object.class_name=="queen"){
	pokeballEffects();
       let gltfLoader = new THREE.GLTF2Loader();
		gltfLoader.load("static/ar-demos/src/obj/magikarp/magikarp" + ".gltf", ( gltf) => {
			// set position?
			gltf.name = "magikarp";
			gltf.scene.scale.set( 2, 2, 2);
			gltf.scene.rotation.set(0, 0, 0);
			gltf.scene.position.set(0,0,-30);
			// masterball has 100% catch rate
			renderer.render(scene, camera);
				scene.add( gltf.scene );
			
		},( xhr ) => {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},
	  ( error ) =>{
				console.warn("Failed to load " + error);
			}
		);
				animate();
		canvas.style.display = "block";
              
        }
				if(object.class_name=="king"){
	pokeballEffects();
       let gltfLoader = new THREE.GLTF2Loader();
		gltfLoader.load("static/ar-demos/src/obj/pikachu/pikachu" + ".gltf", ( gltf) => {
			// set position?
			gltf.name = "pikachu";
			gltf.scene.scale.set( 2, 2, 2);
			gltf.scene.rotation.set(0, 0, 0);
			gltf.scene.position.set(0,0,-30);
			// masterball has 100% catch rate
			renderer.render(scene, camera);
				scene.add( gltf.scene );
			
		},( xhr ) => {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},
	  ( error ) =>{
				console.warn("Failed to load " + error);
			}
		);
					animate();
		canvas.style.display = "block";
              
        }
				if(object.class_name=="ace"){
	pokeballEffects();
       let gltfLoader = new THREE.GLTF2Loader();
		gltfLoader.load("static/ar-demos/src/obj/squirtle/squirtle" + ".gltf", ( gltf) => {
			// set position?
			gltf.name = "squirtle";
			gltf.scene.scale.set( 2, 2, 2);
			gltf.scene.rotation.set(0, 0, 0);
			gltf.scene.position.set(0,0,-30);
			// masterball has 100% catch rate
			renderer.render(scene, camera);
				scene.add( gltf.scene );
			
		},( xhr ) => {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},
	  ( error ) =>{
				console.warn("Failed to load " + error);
			}
		);
		
		animate();
		canvas.style.display = "block";
              
        }
        
        drawCtx.strokeRect(x, y, width, height);

    });
}

 function animate() {
  	requestAnimationFrame(animate);
  	controls.update();
  	renderer.render(scene, camera);
	}

//Add file blob to a form and post
function postFile(file) {

    //Set options as form data
    let formdata = new FormData();
    formdata.append("image", file);
    formdata.append("threshold", scoreThreshold);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', apiServer, true);
    xhr.onload = function () {
        if (this.status === 200) {
            let objects = JSON.parse(this.response);

            //draw the boxes
            drawBoxes(objects);

            //Save and send the next image
            imageCtx.drawImage(v, 0, 0, v.videoWidth, v.videoHeight, 0, 0, uploadWidth, uploadWidth * (v.videoHeight / v.videoWidth));
            imageCanvas.toBlob(postFile, 'image/jpeg');
        }
        else {
            console.error(xhr);
        }
    };
    xhr.send(formdata);
}

function pokeballEffects() {
		let image = document.getElementById("image");
		canvas.style.display = "none";
		image.style.display = "block";
		setTimeout(()=> {
			image.style.display = "none";
			gMap.style.display = "block";
			clearScene();
		}, 2000);
	}

//Start object detection
function startObjectDetection() {

    console.log("starting object detection");

    //Set canvas sizes base don input video
    drawCanvas.width = v.videoWidth;
    drawCanvas.height = v.videoHeight;

    imageCanvas.width = uploadWidth;
    imageCanvas.height = uploadWidth * (v.videoHeight / v.videoWidth);

    //Some styles for the drawcanvas
    drawCtx.lineWidth = 4;
    drawCtx.strokeStyle = "cyan";
    drawCtx.font = "20px Verdana";
    drawCtx.fillStyle = "cyan";

    //Save and send the first image
    imageCtx.drawImage(v, 0, 0, v.videoWidth, v.videoHeight, 0, 0, uploadWidth, uploadWidth * (v.videoHeight / v.videoWidth));
    imageCanvas.toBlob(postFile, 'image/jpeg');

}

//Starting events

//check if metadata is ready - we need the video size
v.onloadedmetadata = () => {
    console.log("video metadata ready");
    gotMetadata = true;
    if (isPlaying)
        startObjectDetection();
};

//see if the video has started playing
v.onplaying = () => {
    console.log("video playing");
    isPlaying = true;
    if (gotMetadata) {
        startObjectDetection();
    }
};

