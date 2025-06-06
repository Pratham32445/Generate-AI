import * as React from "react";
import {
  Brain,
  House,
  Cable,
  Cpu,
  BrainCircuit,
  CircleUserRound,
  CreditCard,
  Image,
  Package,
} from "lucide-react";

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
    icon: House,
  },
  {
    name: "Generate",
    link: "/dashboard/generate",
    icon: BrainCircuit,
  },
  {
    name: "Train Model",
    link: "/dashboard/train",
    icon: Cable,
  },
  {
    name: "Models",
    link: "/dashboard/models",
    icon: Cpu,
  },
  {
    name: "Images",
    link: "/dashboard/Images",
    icon: Image,
  },
  {
    name: "Packs",
    link: "/dashboard/packs",
    icon: Package,
  },
  {
    name: "Add Credit",
    link: "/dashboard/add-credit",
    icon: CreditCard,
  },
  {
    name: "Profile",
    link: "/user/profile",
    icon: CircleUserRound,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Brain className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-2xl">Generate.AI</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.map(({ link, name, icon: Icon }, idx) => (
              <SidebarMenuItem key={idx} className="my-2 mx-1">
                {" "}
                <Link href={link} className="font-medium">
                  <SidebarMenuButton className="flex items-center">
                    <Icon />
                    {name}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <Signout />
      </SidebarFooter>
    </Sidebar>
  );
}
