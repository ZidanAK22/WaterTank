import { NextResponse } from "next/server";
import { fetchDistanceData } from "@/app/lib/data";

export async function GET() {

    const data = await(fetchDistanceData());
    
    if (!data) {
        return NextResponse.json({
            error: "No sensor data available",
        });
    } else {
        return NextResponse.json(data);
    }

    
}