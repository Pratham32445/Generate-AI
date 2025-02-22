import * as React from "react";
import { Brain } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Signout from "./Signout";

const data = [
  {
    name: "Home",
    link: "/dashboard",
  },
  {
    name: "Generate",
    link: "/dashboard/generate",
  },
  {
    name: "Train Model",
    link: "/dashboard/train",
  },
  {
    name: "Models",
    link: "/dashboard/models",
  },
  {
    name: "Profile",
    link: "/user/profile",
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Brain className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-2xl">Generate.AI</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.map(({ link, name }, idx) => (
              <SidebarMenuItem key={idx} className="my-2">
                {" "}
                <SidebarMenuButton asChild>
                  <Link href={link} className="font-medium">
                    {name}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <Signout/>
      </SidebarFooter>
    </Sidebar>
  );
}
