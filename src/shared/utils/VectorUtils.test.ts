import { VectorUtils } from "./VectorUtils";

function testVectorMath() {
    console.log("🧪 Rulare teste: VectorUtils...");

    // Test Direcție (la 0 grade rotație ar trebui să fie spre Nord/Y+)
    const forward = VectorUtils.getDirection({ x: 0, y: 0, z: 0 });
    if (Math.abs(forward.x) < 0.01 && forward.y === 1) {
        console.log("✅ Test Forward (0 deg) trecut.");
    } else {
        console.error("❌ Test Forward (0 deg) eșuat:", forward);
    }

    // Test Direcție (la 90 grade rotație Z ar trebui să fie spre Vest/X-)
    const west = VectorUtils.getDirection({ x: 0, y: 0, z: 90 });
    if (west.x === -1 && Math.abs(west.y) < 0.01) {
        console.log("✅ Test Forward (90 deg) trecut.");
    } else {
        console.error("❌ Test Forward (90 deg) eșuat:", west);
    }

    console.log("✨ Toate testele matematice au fost finalizate.");
}

testVectorMath();
