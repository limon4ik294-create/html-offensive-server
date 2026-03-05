export function createMirageMap(scene) {
    console.log("Mirage map loaded ✅");

    // Пол
    const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:40, height:40}, scene);

    // Мид (коридор)
    const mid = BABYLON.MeshBuilder.CreateBox("mid", {width:6, height:2, depth:12}, scene);
    mid.position.set(0,1,0);
    const midMat = new BABYLON.StandardMaterial("midMat", scene);
    midMat.diffuseColor = new BABYLON.Color3(0.7,0.7,0.7);
    mid.material = midMat;

    // Балкон над мидом
    const balcony = BABYLON.MeshBuilder.CreateBox("balcony", {width:4, height:1, depth:4}, scene);
    balcony.position.set(0,3,0);
    const balconyMat = new BABYLON.StandardMaterial("balconyMat", scene);
    balconyMat.diffuseColor = new BABYLON.Color3(0.5,0.5,0.5);
    balcony.material = balconyMat;
}
