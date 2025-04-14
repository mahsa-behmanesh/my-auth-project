import LogOutButton from "@/components/log-out-button";
import { logoutAction } from "../api/_actions/log-out-actions";
import { getRoleFromCookie } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Role } from "@/types/types";

export default async function DashboardLayout({
  children,
}: Readonly<React.PropsWithChildren>) {
  const role = (await getRoleFromCookie()) as Role;
  return (
    <div className="w-full h-16 lg:h-24 bg-red-50 ">
      <div className="h-full w-[90%] md:w-1/2 xl:w-1/4 flex justify-self-center justify-between items-center space-x-12 ">
        <h1 className="font-semibold md:text-lg lg:text-xl xl:text-2xl text-gray-500">
          {role?.toUpperCase()} DASHBOARD
        </h1>
        <LogOutButton
          onClick={logoutAction}
          className="h-8 w-8 bg-red-300 hover:bg-red-400 hover:h-10 hover:w-10 text-3xl"
        />
      </div>

      <div className="w-full flex justify-center px-2 mt-2 md:mt-12">
        <Card className="w-full md:w-1/2 xl:w-1/4">
          <CardHeader>
            <CardTitle>
              {role === "admin" ? "List Of Users" : "Account Info"}
            </CardTitle>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}
