import { sql } from '@vercel/postgres';
import { sensorData } from "./definition";

export async function fetchSensorData() {
    try {
        const data = await sql<sensorData>`SELECT * FROM data_sensor LIMIT 1`;

        return data.rows;

    } catch (error) {
        console.log('Database error :', error);        
        throw new Error('Failed to fetch sensor data.');
    }    
};

export async function postSensorData(data: sensorData) {
    try {
        const result = await sql`
            INSERT INTO data_sensor
            (id, temperature, distance, turbidity, volume, timestamp)
            VALUES
            (${data.id}, ${data.temperature}, ${data.distance}, ${data.turbidity}, ${data.volume}, ${data.timestamp.toUTCString()})
            RETURNING *;`;

        return result.rows[0];

    } catch (error) {
        console.log('Database error:', error);
        throw new Error('Failed to post sensor data.');
    }
};