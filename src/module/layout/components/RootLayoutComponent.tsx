import FooterComponent from "@/module/global/footer/FooterComponent";
import React, { ReactNode } from "react";

function RootLayoutComponent({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen ">
      <div className="flex-1 w-full ">
        <main className="w-full">{children}</main>
      </div>
      <FooterComponent />
    </div>
  );
}

export default RootLayoutComponent;
