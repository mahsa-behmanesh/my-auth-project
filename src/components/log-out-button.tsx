"use client";

import { LogOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LogOutButtonProps {
  onClick?: () => void;
  className?: string;
  variant?: "default" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export default function LogOutButton({
  onClick,
  className = "",
  variant = "ghost",
  size = "icon",
}: LogOutButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      className={className}
    >
      <LogOut className="h-4 w-4" />
    </Button>
  );
}
