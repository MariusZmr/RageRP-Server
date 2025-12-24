export interface Vector3 {
    x: number;
    y: number;
    z: number;
}

export class VectorUtils {
    /**
     * Calculează vectorul de direcție (Forward) bazat pe rotație (GTA V Euler).
     * În GTA V: X = Pitch, Y = Roll, Z = Yaw/Heading.
     */
    static getDirection(rotation: Vector3): Vector3 {
        const pitch = rotation.x * (Math.PI / 180.0);
        const yaw = rotation.z * (Math.PI / 180.0);
        const cosPitch = Math.abs(Math.cos(pitch));

        return {
            x: -Math.sin(yaw) * cosPitch,
            y: Math.cos(yaw) * cosPitch,
            z: Math.sin(pitch)
        };
    }

    /**
     * Calculează vectorul lateral (Right) bazat pe rotație.
     */
    static getRightVector(rotation: Vector3): Vector3 {
        const yaw = (rotation.z + 90) * (Math.PI / 180.0);

        return {
            x: -Math.sin(yaw),
            y: Math.cos(yaw),
            z: 0
        };
    }
}
