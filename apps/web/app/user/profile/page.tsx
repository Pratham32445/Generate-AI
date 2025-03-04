"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ImagePlus, Grid3X3, Bell, List } from "lucide-react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variants";
import Settings from "@/components/Settings";
import { getSession } from "next-auth/react";
import axios from "axios";

interface User {
  userName: string;
  email: string;
  profilePicture: string;
  outputImages: [];
  outputImagesWithoutModel: [];
  createdAt: Date;
}

export default function ProfilePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const session = await getSession();
      if (!session || !session.user) return;
      const tokenData = await axios.get(
        `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/api/token?email=${session.user.email}`
      );
      const userData = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`,
        {
          headers: {
            Authorization: `Bearer ${tokenData.data.token}`,
          },
        }
      );

      setUser(userData.data.user);
    };
    getUser();
  }, []);

  return (
    user && (
      <motion.div
        className="container mx-auto px-4 py-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="flex justify-between items-center mb-8"
          variants={itemVariants}
        >
          <h1 className="text-3xl font-bold">Profile</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon"></Button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="mb-8 overflow-hidden">
            <div className="bg-gradient-to-r from-[#DEFF00] via-[#FF3CAC] to-[#2B65FF] h-32 w-full"></div>
            <CardContent className="pt-0">
              <div className="flex flex-col md:flex-row gap-6 -mt-12">
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarImage src={user.profilePicture} alt={user.userName} />
                  <AvatarFallback>{user.userName.split(" ")[0][0]}{user.userName.split(" ")[1][0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 pt-12 md:pt-0">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-2xl text-white md:text-black font-bold capitalize">
                          {user.userName}
                        </h2>
                        <Badge className="bg-gradient-to-r from-purple-500 to-blue-500">
                          {1}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="default">
                        <ImagePlus className="mr-2 h-4 w-4" />
                        Create
                      </Button>
                    </div>
                  </div>
                  <p className="mt-4">Generating...</p>
                  <div className="flex flex-wrap gap-6 mt-4">
                    <div>
                      <p className="text-xl font-bold">
                        {user.outputImages.length +
                          user.outputImagesWithoutModel.length}
                      </p>
                      <p className="text-muted-foreground text-sm">Creations</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">
                        Member since
                      </p>
                      <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-4">
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Tabs defaultValue="creations" className="mb-8">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="liked">Liked</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2 bg-muted rounded-md p-1">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <TabsContent value="liked">
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">
                  Your liked images will appear here
                </p>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Settings />
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    )
  );
}
