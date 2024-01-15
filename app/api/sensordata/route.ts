import { NextResponse } from "next/server";
import { fetchSensorData } from "@/app/lib/data";
import { sensorData } from "@/app/lib/definition";

export async function GET() {

    const data = await(fetchSensorData());
    
    if (!data) {
        return NextResponse.json({
            error: "No sensor data available",
        });
    } else {
        return NextResponse.json(data);
    }

    
}