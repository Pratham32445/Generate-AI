"use client";
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { LogOut } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";

const Settings = () => {
  const { setTheme, theme } = useTheme();
  const toogleTheme = () => {
    setTheme(theme == "dark" ? "light" : "dark");
  };
  return (
    <div>
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Account Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive email about your account activity
                </p>
              </div>
              <Switch id="email-notifications" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">
                  Toggle between light and dark mode
                </p>
              </div>
              <div>
                <Switch
                  id="high-quality"
                  defaultChecked={theme == "dark"}
                  onClick={toogleTheme}
                />
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Public Profile</p>
                <p className="text-sm text-muted-foreground">
                  Make your profile visible to everyone
                </p>
              </div>
              <Switch id="public-profile" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">AI Generation Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">High Quality Generation</p>
                <p className="text-sm text-muted-foreground">
                  Generate images in higher resolution
                </p>
              </div>
              <Switch id="high-quality" defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Save Prompt History</p>
                <p className="text-sm text-muted-foreground">
                  Save your generation prompts for future use
                </p>
              </div>
              <Switch id="save-prompts" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={() => signOut({ callbackUrl: "/login" })}
        variant="destructive"
        className="w-full sm:w-auto"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Sign Out
      </Button>
    </div>
  );
};

export default Settings;
