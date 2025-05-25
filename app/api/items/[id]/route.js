import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb"; 
import Item from "../../../models/item";

export async function PUT(request, { params }) {
  await dbConnect();
  const { id } = params; // dynamic segment [id]
  const updates = await request.json();

  try {
    // Find item by ID and update with the provided data, returning the updated doc
    const item = await Item.findByIdAndUpdate(id, updates, { new: true });
    if (!item) {
      return NextResponse.json({ success: false, error: "Item not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: item }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
