import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        hello: 'welcome to watertank monitoring system!',
    });
}