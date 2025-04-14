import { User } from "@/types/types";
import { Suspense } from "react";
import Loading from "../loading";
import { getTokenFromCookie } from "@/lib/auth";
import AdminDash from "./admin-dashboard";

export default async function AdminDashboard() {
  const token: string | undefined = await getTokenFromCookie();

  let users: User[];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/users`,
      {
        headers: {
          Cookie: `token=${token}`,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error("Failed to fetch users");

    const data = await res.json();
    users = data.users;
  } catch (error) {
    console.error("Fetch error:", error);
    return <div className="text-red-500">Error - loading users list</div>;
  }

  return (
    <Suspense fallback={<Loading />}>
      <AdminDash users={users} />
    </Suspense>
  );
}
