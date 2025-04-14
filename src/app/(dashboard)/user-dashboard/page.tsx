import { Separator } from "@/components/ui/separator";
import { getTokenFromCookie } from "@/lib/auth";
import { User } from "@/types/types";
import { cookies } from "next/headers";

export default async function UserDashboard() {
  const token: string | undefined = await getTokenFromCookie();

  let myAccountInfo: User;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`, {
      headers: {
        Cookie: `token=${token}`,
      },
      cache: "force-cache",
    });

    if (!res.ok) throw new Error("Failed to fetch users");

    const data = await res.json();
    myAccountInfo = data.user;
  } catch (error) {
    console.error("Fetch error:", error);
    return <div className="text-red-500">Error loading user info</div>;
  }

  const displayedKeys: (keyof typeof myAccountInfo)[] = [
    "name",
    "username",
    "role",
  ];

  return (
    <div className="flex flex-col">
      {displayedKeys.map((key) => (
        <div key={key} className="flex-col">
          <h3 className="text-gray-400">{key}</h3>
          <h2>{myAccountInfo[key]}</h2>
          <Separator className="my-2" />
        </div>
      ))}
    </div>
  );
}
