"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: Readonly<React.ComponentPropsWithoutRef<"div">>) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.ok) {
        toast("Success", { description: data?.message || "Login successful" });
        if (data?.user.role === "admin") {
          router.push("/admin-dashboard");
        } else {
          router.push("/user-dashboard");
        }
      } else {
        toast("Login failed", {
          description: data?.error || "Unknown error",
        });
      }
    } catch (error) {
      toast("Network error", {
        description: "Something went wrong. Please try again.",
      });

      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("w-full flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">User Name</Label>
                <Input id="username" name="username" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" name="password" required />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <Loader
                    className={cn("text-foreground animate-spin", {
                      "text-background": "default",
                    })}
                  />
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
