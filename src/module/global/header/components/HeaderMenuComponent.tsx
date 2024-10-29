"use client";

import * as React from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

export default function HeaderMenuComponent() {
  const menuItems = ["صفحه اصلی", "قیمت رمزارزها", "مقالات", "تماس با ما"];

  const MenuContent = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<typeof MenubarContent>
  >((props, ref) => (
    <MenubarContent
      ref={ref}
      align="start"
      alignOffset={-8}
      className="w-[180px] "
      {...props}
    >
      {menuItems.map((item) => (
        <MenubarItem key={item} className="cursor-pointer ">
          {item}
        </MenubarItem>
      ))}
    </MenubarContent>
  ));
  MenuContent.displayName = "MenuContent";

  return (
    <div className="relative flex items-center">
      {/* Desktop Menu */}
      <Menubar className="hidden p-0 tablet:flex justify- items-center border-none bg-transparent">
        {menuItems.map((item) => (
          <MenubarMenu key={item}>
            <MenubarTrigger className="cursor-pointer desktop:text-base  desktop:leading-[25px] tablet:leading-[22px] leading-[18px] tablet:text-sm text-xsm ">
              {item}
            </MenubarTrigger>
          </MenubarMenu>
        ))}
      </Menubar>

      {/* Mobile Menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="tablet:hidden border-none bg-inherit"
          >
            <div className="border-[1px] border-black border-solid rounded-[7px] p-2">
              <Image
                src="/images/header/menu/menu.svg"
                alt={"menu"}
                className={" w-[16px] h-[16px]   "}
                width={16}
                height={16}
              />
            </div>
            <span className="sr-only ">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetTitle></SheetTitle>
        <SheetContent side="right" className="w-[180px] sm:w-[240px]">
          <nav className="flex flex-col gap-4 mt-8">
            {menuItems.map((item) => (
              <a key={item} className="" href="#">
                {item}
              </a>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
