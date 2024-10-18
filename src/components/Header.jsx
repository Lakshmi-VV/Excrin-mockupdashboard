import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Header({ title }) {
  return (
    <div className="flex w-[1300px] py-5 justify-between">
      <h1 className="flex items-center text-2xl tracking-wide">{title}</h1>

      <div className="flex gap-4 items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>v v</AvatarFallback>
        </Avatar>
        <span>Veev! .</span>
      </div>
    </div>
  );
}

export default Header;
