// import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


console.log(THREE);
class App {

    constructor() {
        const divContainer = document.querySelector("#webgl-container")
        this._divContainer = divContainer; 
 
        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);
        this._renderer = renderer;

        const scene = new THREE.Scene(); 
        this._scene = scene; 

        this._setupCamera(); 
        this._setupLight(); 
        this._setupModel();
        //orbitControls 클래스 샤용하기 위한 코드
        this._setupControls(); //orbitControls 와 같은 컨트롤 정의하는 메서드 

        window.onresize = this.resize.bind(this);
        this.resize(); 
        
        requestAnimationFrame(this.render.bind(this))  //this 가 App 클래스의 객체를 가리킴 
    }
    _setupControls(){
        new OrbitControls(this._camera, this._divContainer);//orbit 객체 생성 시 카메라 객체와 마우스 이벤트를 받는 dom 요소 필요
    }
    _setupCamera() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;
        const camera = new THREE.PerspectiveCamera(
            75, width/height, 0.1, 100
        );
        camera.position.z = 2; 
        this._camera = camera; //field 객체 
    }
    _setupLight() {
        const color = 0xfffffff;
        const intensity = 1; 
        const light = new THREE.DirectionalLight (color, intensity);
        light.position.set(-1, 2, 4);
        this._scene.add(light);
    }
    _setupModel() {
        const geometry = new THREE.CircleGeometry(0.9, 12, 0, Math.PI/2 ); // 원판 : 원판 크기 반지름(기본 1) ,원판 구성 분할 (세그먼트) 수(기본 8) , 시작 각도(단위 radian, 기본 0), 연장 각도(단위 radian, 기본 2pi(360도))
        // const geometry = new THREE.SphereGeometry(1, 64, 32); //원 
        const fillMaterial = new THREE.MeshPhongMaterial({color : 0xff0000}) //파란개열 재질 
        const cube = new THREE.Mesh(geometry, fillMaterial);
        
        // const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
        const lineMaterial = new THREE.LineBasicMaterial({color: 0xfffff});
        const line = new THREE.LineSegments(
            new THREE.WireframeGeometry(geometry), lineMaterial); //와이어프레임 형태로 지오메트리 표현하려고 사용 

        const group = new THREE.Group(); 
        group.add(cube);
        group.add(line);
        
        this._scene.add(group);
        this._cube = group; //필드정의
    }
    resize() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;

        this._camera.aspect = width / height; 
        this._camera.updateProjectionMatrix(); 

        this._renderer.setSize(width, height);
    }

    render(time){ //time: 렌더링이 처음 시작된 이후 경과된 시간값 
            this._renderer.render(this._scene, this._camera); //render가 scence 을 카메라의 시점으로 렌더링
            this.update(time);
            requestAnimationFrame(this.render.bind(this));
    }
    update(time){
        time *= 0.001; //seconed unit 

        // this._cube.rotation.x = time; 
        // this._cube.rotation.y = time;


    }
}
window.onload= function() {
    new App();
}