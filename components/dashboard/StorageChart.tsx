"use client";

import { Label, PolarAngleAxis, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { calculatePercentage, convertFileSize } from "@/lib/utils";
import { ChartConfig, ChartContainer } from "../ui/chart";
import { TOTAL_STORAGE_SIZE } from "@/constants";
import Arc from "./Arc";

const chartConfig = {
    size: {
        label: "Size",
    },
    used: {
        label: "Used",
        color: "white",
    },
} satisfies ChartConfig;

export default function StorageChart({ spaceUsed = 0 }: { spaceUsed: number }) {
    const percent = calculatePercentage(spaceUsed);
    const chartData = [{ storage: "used", value: percent, fill: "white" }];

    return (
        <div className="flex flex-col flex-wrap items-center gap-2 rounded-[20px] !bg-brand p-5 xl:flex-row">
            <div className="flex-1">
                <ChartContainer config={chartConfig} className="chart-container">
                    <RadialBarChart data={chartData} startAngle={240} endAngle={-60} innerRadius={90} outerRadius={130}>
                        <RadialBar
                            dataKey="value"
                            cornerRadius={10}
                            background={{ fill: "rgba(255,255,255,0.08)" }}
                            direction={"clockwise"}
                            fill="white"
                            animationDuration={1200}
                            animationBegin={0}
                            isAnimationActive={true}
                        />

                        <PolarAngleAxis tick={false} tickLine={false} axisLine={false} type="number" domain={[0, 100]} />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label value={`${percent}%`} position="center" className="h2 fill-white" dy={-8} />
                            <Label value="Space used" position="center" className="subtitle-1 fill-white" dy={16} />
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        const { cx, cy } = viewBox; // get real center from chart
                                        return <Arc cx={cx} cy={cy} radius={75} startAngle={130} endAngle={410} dotCount={52} dotRadius={1} />;
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                    </RadialBarChart>
                </ChartContainer>
            </div>
            <div className="flex h-full flex-1 flex-col items-center gap-2 text-white">
                <h3 className="h3">Storage Available</h3>
                <p className="subtitle-1">
                    {convertFileSize(Math.max(TOTAL_STORAGE_SIZE - spaceUsed, 0))}/{convertFileSize(TOTAL_STORAGE_SIZE)}
                </p>
            </div>
        </div>
    );
}
