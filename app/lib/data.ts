import { sql } from '@vercel/postgres';
import { sensorData } from "./definition";

export async function fetchSensorData() {
    try {
        const data = await sql<sensorData>`SELECT * FROM data_sensor LIMIT 5`;

        return data.rows;

    } catch (error) {
        console.log('Database error :', error);        
        throw new Error('Failed to fetch sensor data.');
    }    
};

export async function fetchTemperatureData() {
    try {
        const data = await sql`SELECT temperature FROM data_sensor LIMIT 1`;

        return data.rows;

    } catch (error) {
        console.log('Database error :', error);        
        throw new Error('Failed to fetch temperature data.');
    }    
};

export async function fetchDistanceData() {
    try {
        const data = await sql`SELECT distance FROM data_sensor LIMIT 1`;

        return data.rows;

    } catch (error) {
        console.log('Database error :', error);        
        throw new Error('Failed to fetch distance data.');
    }    
};

export async function fetchTurbidityData() {
    try {
        const data = await sql`SELECT turbidity FROM data_sensor LIMIT 1`;

        return data.rows;

    } catch (error) {
        console.log('Database error :', error);        
        throw new Error('Failed to fetch turbidity data.');
    }    
};

export async function fetchLastWeekAvg() {
    try{
        const data = await sql`
            SELECT
            DATE_TRUNC('day', timestamp) AS day,
            AVG(temperature) AS avg_temperature,
            AVG(distance) AS avg_distance,
            AVG(turbidity) AS avg_turbidity,
            AVG(volume) AS avg_volume
            FROM
            data_sensor
            GROUP BY
            day
            ORDER BY
            day;
        `;
        return data.rows;    
    } catch (error) {
        console.log('Database error :', error);        
        throw new Error('Failed to fetch data.');
    }
    
}

export async function postSensorData(data: sensorData) {
    try {
        const result = await sql`
            INSERT INTO data_sensor
            (id, temperature, distance, turbidity, volume, timestamp)
            VALUES
            (DEFAULT, ${data.temperature}, ${data.distance}, ${data.turbidity}, ${data.volume}, ${data.timestamp})
            RETURNING *;`;

        return result.rows[0];

    } catch (error) {
        console.log('Database error:', error);
        throw new Error('Failed to post sensor data.');
    }
};