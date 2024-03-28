// // import * as THREE from 'https://unpkg.com/three/build/three.module.js';


// // const scene = new THREE.Scene();
// //                                         //시야각(해당시점의 화면이 보여지는 정도)/종횡비 /near과 far절단면
// // const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); //렌더링할 구역의 크기를 설정 성능 개선을 중시할 경우, 화면크기/2 
// // camera.position.set(0,0,0)
// // const renderer = new THREE.WebGLRenderer();
// // renderer.setSize( window.innerWidth, window.innerHeight );//크기는 유지하되, 더 낮은 해상도로 렌더링하고싶으면 세번째인자값을 false로 넣기 
// // document.body.appendChild( renderer.domElement );

// // const geometry = new THREE.SphereGeometry( 18, 32, 16 );
// // const material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
// // const sphere = new THREE.Mesh( geometry, material );
// // scene.add( sphere );
// // // camera.position.z = 0;
// // renderer.render( scene, camera );

import * as THREE from 'https://unpkg.com/three/build/three.module.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// Camera 생성
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;



// Renderer 생성
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// HemisphereLight 생성 (전체적인 조명)
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 0.6);
scene.add(hemisphereLight);

// DirectionalLight 생성 (그림자를 생성하기 위한 빛)
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Geometry 생성 (구체)
const geometry = new THREE.SphereGeometry(1, 32, 32);


// Material 생성 (노란색)
const material = new THREE.MeshPhongMaterial({ color: 0xffff00 });


// Mesh 생성 (Geometry와 Material 결합)
const sphere = new THREE.Mesh(geometry, material);
sphere.castShadow = true; // 그림자 생성 설정

// Scene에 Mesh 추가
scene.add(sphere);

    // PlaneGeometry 생성 (바닥면)
    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.3 }); // 그림자 투명도 설정
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true; // 그림자를 받는 설정
    plane.rotation.x = -Math.PI / 2; // 바닥면을 수평으로 설정
    scene.add(plane);

     // 렌더링 함수 정의
     function animate() {
        requestAnimationFrame(animate);
        sphere.rotation.x += 0.01; // X축 회전 애니메이션
        sphere.rotation.y += 0.01; // Y축 회전 애니메이션
        renderer.render(scene, camera); // Scene을 Camera로 렌더링
    }

    // animate 함수 호출
    animate();

// renderer.render(scene, camera); // Scene을 Camera로 렌더링

