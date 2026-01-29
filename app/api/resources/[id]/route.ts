import { NextRequest, NextResponse } from "next/server";
import { userIsAdmin } from "@/features/auth/services/user-is-admin.service";
import {
  getResourceById,
  deleteResourceRecursive,
} from "@/features/resources/services/get-resources.service";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const resource = await getResourceById(id);

    if (!resource) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(resource);
  } catch (error: unknown) {
    console.error("Error fetching resource:", error);
    return NextResponse.json(
      { error: "Failed to fetch resource" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { adminId } = await req.json();

    if (!adminId) {
      return NextResponse.json(
        { error: "adminId est requis" },
        { status: 400 }
      );
    }

    const isAdmin = await userIsAdmin(adminId);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await deleteResourceRecursive(id);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Error deleting resource:", error);
    return NextResponse.json(
      { error: "Failed to delete resource" },
      { status: 500 }
    );
  }
}
