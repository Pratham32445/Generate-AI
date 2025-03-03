"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// const todayDate = new Date().getDate();

const chartData = Array.from({ length: 20 }).map((_, idx) => ({
  date: idx + 1,
  imagesCnt: Math.random() * 100,
}));

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "rgb(29 78 216 / var(--tw-border-opacity, 1))",
  },
} satisfies ChartConfig;

export default function Component() {
  return (
    <Card className="bg-blue-500/5 border-2 border-neutral-800/50 rounded-2xl p-6 border-blue-700 hover:bg-blue-500/10 transition-all duration-300 flex flex-col gap-12 h-full w-full">
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[170px]">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="imagesCnt" fill="var(--color-desktop)" radius={5} />
          </BarChart>
        </ChartContainer>
        <p>Image Generated During this Month</p>
      </CardContent>
    </Card>
  );
}
