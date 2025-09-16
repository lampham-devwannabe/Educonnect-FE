import { NextResponse } from "next/server";

export function handleApiError(err) {
    console.error(err);

    if (err.name === 'ValidationError') {
        return NextResponse.json({ message: "Validation error: " + err.message }, { status: 400 });
    } else if (err.name === 'MongoError' && err.code === 11000) {
        return NextResponse.json({ message: "Duplicate key error: " + JSON.stringify(err.keyValue) }, { status: 400 });
    } else {
        return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
    }
}