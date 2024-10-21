import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

function Header({ title }) {
  return (
    <div className="flex py-5 justify-between border-b ">
      <h1 className="flex items-center text-2xl tracking-wide">{title}</h1>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex gap-4 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>v v</AvatarFallback>
            </Avatar>
            <span>Veev! .</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>View Profile</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Add account</DropdownMenuItem>
          <DropdownMenuItem className="flex justify-between">
            <span>Log out </span>
            <LogOut className="h-4 w-4" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Header;
