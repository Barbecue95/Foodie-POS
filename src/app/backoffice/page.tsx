import { redirect } from "next/navigation";

export default async function BackOfficePage() {
  redirect("/backoffice/orders/pending");
}
