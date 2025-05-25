import { NextResponse } from 'next/server'
import dbConnect from '../../lib/mongodb'
import Item from '../../models/item'

// No need for export const dynamic = 'force-static' here

export async function GET(request) {
  await dbConnect();
  // Use Next.js native nextUrl to safely extract query parameters
  const { searchParams } = request.nextUrl;
  console.log("url searchParams:", searchParams);
  const id = searchParams.get('id');

  console.log('GET request received with id:', id);

  try {
    const items = await Item.find(id ? { _id: id } : {});
    return NextResponse.json({ success: true, data: items }, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
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
