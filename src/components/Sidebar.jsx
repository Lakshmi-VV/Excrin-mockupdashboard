"use client";
import React from "react";
import Link from "next/link";
import {
  Shield,
  LayoutDashboard,
  ShoppingCart,
  Truck,
  PackagePlus,
  ChevronDownIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Sidebar() {
  return (
    <div className="p-4 border-r min-h-screen flex flex-col gap-9">
      <div className="flex gap-3 items-center">
        <Shield />
        <span className="text-base tracking-widest uppercase">Admintory</span>
      </div>
      <div className="flex flex-col gap-4">
        <Link href="/">
          <div className="flex gap-3 items-center">
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </div>
        </Link>

        <DropdownMenu>
          <div className="flex items-center gap-3">
            <Link href="/orders" className="flex gap-3">
              <ShoppingCart className="w-5 h-5" />
              <span className="pr-[50px]">Orders</span>
            </Link>
            <DropdownMenuTrigger>
              <ChevronDownIcon className="w-4 h-4" />
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent>
            <DropdownMenuItem>
              <PackagePlus className="w-5 h-5" />
              <span>Create Order </span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Truck className="w-5 h-5" />
              <span> Dispatch Order </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default Sidebar;
