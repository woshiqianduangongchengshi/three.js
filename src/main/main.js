import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//导入动画库
import gsap from "gsap";
//导入dat.gui
import * as dat from 'dat.gui';
// 1.创建场景
const scene = new THREE.Scene();
// 2.创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//设计相机位置
camera.position.set(0, 0, 10);
//添加相机
scene.add(camera);
//添加物体
//创建几何体
for (let i = 0; i < 100; i++) {
    const geometry = new THREE.BufferGeometry();
    const positionArray = new Float32Array(9);
    for (let j = 0; j < 9; j++) {
        positionArray[j] = Math.random() *10- 5;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positionArray, 3));
    let color = new THREE.Color(Math.random(), Math.random(), Math.random());
    const material = new THREE.MeshBasicMaterial({ color: color,opacity:0.5,transparent:true });
    const mesh = new THREE.Mesh(geometry, material);
    console.log(positionArray);
    scene.add(mesh);
}

// 初始化渲染器
const renderer = new THREE.WebGL1Renderer()
//设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
//   console.log(renderer);
// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement);
// 使用渲染器通过相机将场景渲染出来
// renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼（惯性）,要使得这一值生效，你必须在你的动画循环里调用.update()。
controls.enableDamping = true;
// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
// 添加动画
// var animatel = gsap.to(cube.position, {
//     x: 2 * Math.PI,
//     duration: 5,
//     ease: 'power1.input',
//     //    设置循环次数
//     repeat: -1,
//     // 往返运动
//     yoyo: true,
//     delay: 2,
//     onComplete: () => {
//         console.log("动画结束");
//     },
//     onStart: () => {
//         console.log("动画开始");
//     }
// })

window.addEventListener('dblclick', () => {
    if (animatel.isActive()) {
        // 暂停
        animatel.pause();
    } else {
        //恢复
        animatel.resume()
    }
})
//动画循环
function render() {

    // cube.position.x += 0.01;
    // cube.rotation.x += 0.01;
    // if (cube.position.x > 5) {
    //     cube.position.x = 0
    //     cube.rotation.x = 0
    // }
    controls.update()
    renderer.render(scene, camera);
    // 渲染下一帧的时候就会调用
    requestAnimationFrame(render);
}
render();

// 监听画面的变化，更新渲染页面
window.addEventListener("resize", () => {
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    // 更新摄像机的投影矩阵
    camera.updateProjectionMatrix();
    //更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio)
});

// const gui = new dat.GUI();
// gui.add(cube.position, "x").min(0).max(5).step(0.1).name("x轴").onChange((value) => {
//     console.log("执行中", value)
// }).onFinishChange((value) => {
//     console.log("执行完毕", value)
// });