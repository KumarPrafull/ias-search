import { NextResponse } from 'next/server'
import dbConnect from '../../lib/mongodb'  // adjust import if path is different
import Item from '../../models/item'

export const dynamic = 'force-static' // If you want static rendering

export async function GET() {
  await dbConnect();
  try {
    const items = await Item.find({});
    return NextResponse.json({ success: true, data: items }, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json(); // Parse JSON body from request
    const item = await Item.create(body);
    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
