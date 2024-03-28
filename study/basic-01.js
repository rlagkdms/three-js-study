import * as THREE from 'https://unpkg.com/three/build/three.module.js';
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

        window.onresize = this.resize.bind(this);
        this.resize(); 
        
        requestAnimationFrame(this.render.bind(this))  //this 가 App 클래스의 객체를 가리킴 
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
        const geometry = new THREE.BoxGeometry(1,1,1);//가로, 세로, 깊이 
        const material = new THREE.MeshPhongMaterial({color : 0x44a88}) //파란개열 재질 

        const cube = new THREE.Mesh(geometry, material);

        this._scene.add(cube);
        this._cube = cube; //필드정의
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
        this._cube.rotation.x = time; 
        this._cube.rotation.y = time;
    }
}
window.onload= function() {
    new App();
}