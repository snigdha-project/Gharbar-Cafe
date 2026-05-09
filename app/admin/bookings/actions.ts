"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabase";
import { isAuthenticated } from "@/app/admin/blog-uploader/actions";

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export async function updateBookingStatusAction(
  formData: FormData
): Promise<void> {
  if (!(await isAuthenticated())) {
    throw new Error("Not authenticated");
  }
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as BookingStatus;
  if (!id || !["pending", "confirmed", "cancelled"].includes(status)) {
    throw new Error("Invalid input");
  }
  const { error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/bookings");
}

export async function deleteBookingAction(formData: FormData): Promise<void> {
  if (!(await isAuthenticated())) {
    throw new Error("Not authenticated");
  }
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Invalid id");
  const { error } = await supabase.from("bookings").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/bookings");
}

export async function saveAdminNotesAction(
  formData: FormData
): Promise<void> {
  if (!(await isAuthenticated())) {
    throw new Error("Not authenticated");
  }
  const id = String(formData.get("id") ?? "");
  const notes = String(formData.get("admin_notes") ?? "");
  if (!id) throw new Error("Invalid id");
  const { error } = await supabase
    .from("bookings")
    .update({ admin_notes: notes || null })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/bookings");
}
