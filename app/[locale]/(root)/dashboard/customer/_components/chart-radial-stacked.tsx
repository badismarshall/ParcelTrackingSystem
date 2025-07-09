"use client"

import { TrendingUp, Info } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import RewardsAbout from "./rewards-about"

export const description = "A radial chart with stacked sections"

const chartData = [{ month: "january", friend: 33.33, bestfriend: 33.33, family: 33.33 }]

const chartConfig = {
  friend: {
    label: "Friend",
    color: "var(--chart-1)",
  },
  bestfriend: {
    label: "Best-Friend",
    color: "var(--chart-2)",
  },
  family: { 
    label: "Family",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

// Helper to render a needle on the radial chart
function Needle({ cx, cy, innerRadius, outerRadius, angle, ...rest }: any) {
  // Convert angle to radians
  const radian = (Math.PI / 180) * angle
  // Needle start and end points
  const x1 = cx + innerRadius * Math.cos(radian)
  const y1 = cy + innerRadius * Math.sin(radian)
  const x2 = cx + outerRadius * Math.cos(radian)
  const y2 = cy + outerRadius * Math.sin(radian)
  
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="var(--primary)"
        strokeWidth={4}
        strokeLinecap="round"
      />
    </g>
  )
}

export function ChartRadialStacked() {
  const totalVisitors = chartData[0].friend + chartData[0].bestfriend + chartData[0].family

  // For demonstration, let's say the needle points to the "desktop" value
  // Calculate the percentage of the total for the needle
  const friendValue = chartData[0].friend
  const percent = friendValue / totalVisitors

  // The chart goes from 180deg (left) to 0deg (right), so 180deg span
  // Needle angle: 180deg (left) + (span * percent)
  const startAngle = 180
  const endAngle = 0
  const angle = -50

  return (
    <Card className="flex flex-col relative">
      {/* About dialog at the top right */}
      <div className="absolute top-4 right-4">
        <RewardsAbout />
      </div>
      <CardHeader className="items-center pb-0">
        <CardTitle>Récompenses</CardTitle>
        <CardDescription>Janvier - Juin 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0 flex-col">
        <ChartContainer 
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={180}
            endAngle={0}
            innerRadius={80}
            outerRadius={130}
          >
            {/* <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            /> */}
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Livraisons To Family
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="friend"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-friend)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="bestfriend"
              fill="var(--color-bestfriend)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="family"
              fill="var(--color-family)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
            {/* Needle overlay */}
            <g>
              <Needle
                cx={125}
                cy={125}
                innerRadius={60}
                outerRadius={100}
                angle={angle}
              />
            </g>
          </RadialBarChart>
        {/* Chart Key for Dollar Understanding */}
        </ChartContainer>
          <div className="flex items-center gap-4 mt-4 justify-center">
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 rounded-full" style={{ background: "var(--chart-1)" }} />
              <span className="text-xs text-muted-foreground">Friend</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 rounded-full" style={{ background: "var(--chart-2)" }} />
              <span className="text-xs text-muted-foreground">Best Friend </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 rounded-full" style={{ background: "var(--chart-3)" }} />
              <span className="text-xs text-muted-foreground">Family</span>
            </div>
          </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {/* <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div> */}
      </CardFooter>
    </Card>
  )
}
