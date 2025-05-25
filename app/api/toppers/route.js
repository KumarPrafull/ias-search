import { NextResponse } from 'next/server'
import dbConnect from '../../lib/mongodb'
import Item from '../../models/item'

// No need for export const dynamic = 'force-static' here

export async function GET() {
  await dbConnect();
  // Use Next.js native nextUrl to safely extract query parameters

  try {
    const items = await Item.find({ rank: 1 }).sort({ batch: -1 }).limit(50);
    return NextResponse.json({ success: true, data: items }, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}