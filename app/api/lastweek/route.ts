import { NextResponse } from "next/server";
import { fetchLastWeekAvg } from "@/app/lib/data";

export async function GET() {

    const data = await(fetchLastWeekAvg());
    
    if (!data) {
        return NextResponse.json({
            error: "No sensor data available",
        });
    } else {
        return NextResponse.json(data);
    }

    
}