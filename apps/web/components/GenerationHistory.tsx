"use client";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const TodayDate = new Date().getDate();

const chartData = Array.from({ length: TodayDate }).map((_, idx) => ({
  count: Math.floor(Math.random() * 100),
  date: idx + 1,
}));

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function Component() {
  return (
    <Card className="bg-muted/50">
      <CardContent className="p-0 mt-[5px]">
        <p className="text-xs px-2 py-3">Image Generated During this Month</p>
        <ChartContainer config={chartConfig} className="w-full h-[170px] bg-muted/50">
          <LineChart
            data={chartData}
            className="bg-muted/50"
            width={300}
            height={170}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              padding={{ left: 0, right: 0 }}
            />
            <YAxis
              padding={{ top: 0, bottom: 0 }}
              axisLine={false}
              tickLine={false}
              tickMargin={4}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line dataKey="count" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
