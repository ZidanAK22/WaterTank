import { NextResponse } from "next/server";
import { fetchTurbidityData } from "@/app/lib/data";

export async function GET() {

    const data = await(fetchTurbidityData());
    
    if (!data) {
        return NextResponse.json({
            error: "No sensor data available",
        });
    } else {
        return NextResponse.json(data);
    }

    
}