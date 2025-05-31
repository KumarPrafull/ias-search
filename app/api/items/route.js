import { NextResponse } from 'next/server'
import dbConnect from '../../lib/mongodb'
import Item from '../../models/item'

export async function GET(request) {
  await dbConnect();
  const { searchParams } = request.nextUrl;
  const id = searchParams.get('id');
  const service = searchParams.get('service'); // Get service from query

  // Debug logs
  console.log("url searchParams:", searchParams);
  console.log('GET request received with id:', id, 'service:', service);

  // Build query object
  const query = {};
  if (id) query._id = id;
  if (service) {
    // Case-insensitive, exact match for service
    query.service = { $regex: new RegExp(`^${service}$`, "i") };
  }

  try {
    const items = await Item.find(query);
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
