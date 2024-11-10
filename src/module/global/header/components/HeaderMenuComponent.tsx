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

// Define a single MenuItem interface
interface MenuItem {
  id: string;
  name: string;
  alt?: string;
}

// Custom hook for menu data
const useMenuData = () => {
  return React.useMemo<{ menuItems: MenuItem[] }>(
    () => ({
      menuItems: headerMock.menuItems.map((item) => ({
        ...item,
        id: String(item.id), // Ensure id is always a string
      })),
    }),
    []
  );
};

// Atom component
const MenuItemComponent: React.FC<{ item: MenuItem }> = ({ item }) => (
  <MenubarItem className="cursor-pointer">
    <Link href={item.alt ? `/${item.alt}` : "/"}>{item.name}</Link>
  </MenubarItem>
);

// Molecule components
const DesktopMenu: React.FC<{ menuItems: MenuItem[] }> = ({ menuItems }) => (
  <Menubar className="hidden p-0 tablet:flex justify-items-center border-none bg-transparent">
    {menuItems.map((item, index, array) => (
      <MenubarMenu key={item.id}>
        <MenubarTrigger
          className={`cursor-pointer font-normal desktop:text-base desktop:leading-[25px] tablet:leading-[22px] leading-[18px] tablet:text-sm text-xsm *: ${
            index === array.length - 1 ? "tablet:hidden desktop:block" : ""
          }`}
        >
          <Link href={item.alt ? `/${item.alt}` : "/"}>{item.name}</Link>
        </MenubarTrigger>
      </MenubarMenu>
    ))}
  </Menubar>
);

const MobileMenu: React.FC<{ menuItems: MenuItem[] }> = ({ menuItems }) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button
        variant="outline"
        size="icon"
        className="tablet:hidden border-none bg-inherit h-[24px] w-[24px]"
      >
        <div className="border-[1.5px] border-black border-solid rounded-[7px] flex justify-center items-center h-[24px] w-[24px]">
          <Image
            src="/images/header/menu/menu.svg"
            alt="menu"
            className="w-[16px] h-[16px] object-cover"
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
        {menuItems.map((item) => (
          <Link key={item.id} href={item.alt ? `/${item.alt}` : "/"}>
            {item.name}
          </Link>
        ))}
      </nav>
    </SheetContent>
  </Sheet>
);

// Organism component
export default function HeaderMenuComponent() {
  const { menuItems } = useMenuData();

  return (
    <div className="relative flex items-center">
      <DesktopMenu menuItems={menuItems} />
      <MobileMenu menuItems={menuItems} />
    </div>
  );
}
