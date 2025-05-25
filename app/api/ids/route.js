import { NextResponse } from 'next/server'
import dbConnect from '../../lib/mongodb'
import Item from '../../models/item'

export async function GET(request) {
  await dbConnect();

  try {
    const items = await Item.find({}).select('_id');
    return NextResponse.json({ success: true, data: items }, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}