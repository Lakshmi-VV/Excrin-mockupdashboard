"use client";
import React from "react";
import Link from "next/link";
import {
  Shield,
  LayoutDashboard,
  ShoppingCart,
  ChevronRight,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button, buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function Sidebar() {
  const pathname = usePathname();

  const [openSidebar, setOpenSidebar] = React.useState(false);
  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const sidebarMenu = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: "/",
    },
    {
      label: "Orders",
      icon: <ShoppingCart className="w-5 h-5" />,
      path: "/orders",
    },
  ];
  return (
    <div
      className={cn(
        "p-4 border-r min-h-screen flex flex-col gap-20 relative transition-all duration-300 ease-in-out",
        openSidebar ? "w-[80px]" : "w-[220px]"
      )}
    >
      <div className="flex gap-3 items-center justify-center">
        {openSidebar ? (
          <>
            <Shield />
          </>
        ) : (
          <>
            <Shield />
            <span className="text-base tracking-widest uppercase">
              Admintory
            </span>
          </>
        )}
      </div>

      <Button
        className="rounded-full p-2 absolute mt-10 right-[-20px]"
        variant="secondary"
        onClick={toggleSidebar}
      >
        <ChevronRight />
      </Button>

      <div className="  flex flex-col gap-3 ">
        {sidebarMenu.map((menu, index) => {
          const isActive = pathname === menu.path;
          return openSidebar ? (
            <>
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={menu.path}
                      className={cn(
                        buttonVariants({
                          variant: isActive ? "default" : "ghost",
                        }),
                        "h-9 w-9"
                      )}
                    >
                      <div>{menu.icon}</div>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{menu.label}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          ) : (
            <Link
              href={menu.path}
              key={index}
              className={cn(
                buttonVariants({
                  variant: isActive ? "default" : "ghost",
                }),
                "flex justify-between"
              )}
            >
              <div className="flex gap-4 items-center">
                <div>{menu.icon}</div>
                <span>{menu.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
