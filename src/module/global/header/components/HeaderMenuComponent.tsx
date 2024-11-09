"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
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
import { headerMock } from "@/module/mock/header/header";

export default function HeaderMenuComponent() {
  const MenuContent = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<typeof MenubarContent>
  >((props, ref) => (
    <MenubarContent
      ref={ref}
      align="start"
      alignOffset={-8}
      className="w-[180px]"
      {...props}
    >
      {headerMock.menuItems.map((item) => (
        <MenubarItem key={item.id} className="cursor-pointer">
          <Link href={item.alt ? `/${item.alt}` : "/"}>{item.name}</Link>
        </MenubarItem>
      ))}
    </MenubarContent>
  ));
  MenuContent.displayName = "MenuContent";

  return (
    <div className="relative flex items-center">
      {/* Desktop Menu */}
      <Menubar className="hidden p-0 tablet:flex justify-items-center border-none bg-transparent">
        {headerMock.menuItems.map((item) => (
          <MenubarMenu key={item.id}>
            <MenubarTrigger className="cursor-pointer desktop:text-base desktop:leading-[25px] tablet:leading-[22px] leading-[18px] tablet:text-sm text-xsm">
              <Link href={item.alt ? `/${item.alt}` : "/"}>{item.name}</Link>
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
                alt="menu"
                className="w-[16px] h-[16px]"
                width={16}
                height={16}
              />
            </div>
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetTitle />
        <SheetContent side="right" className="w-[180px] sm:w-[240px]">
          <nav className="flex flex-col gap-4 mt-8">
            {headerMock.menuItems.map((item) => (
              <Link key={item.id} href={item.alt ? `/${item.alt}` : "/"}>
                {item.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
