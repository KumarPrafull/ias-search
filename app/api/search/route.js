import { NextResponse } from 'next/server'
import dbConnect from '../../lib/mongodb'  // Adjust path if needed
import Item from '../../models/item'

// Remove this if you want search to work dynamically:
// export const dynamic = 'force-static'

export async function GET(request) { // Accept 'request' as a parameter
  await dbConnect();
  const { searchParams } = new URL(request.url); // Use request.url

  const query = searchParams.get('search') || '';
  try {
    const items = await Item.find({
        name: { $regex: query, $options: 'i' }
      })
      .sort({ name: 1 }) // Sort by name ascending
      .limit(100); // Limit results
    return NextResponse.json({ success: true, data: items }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
