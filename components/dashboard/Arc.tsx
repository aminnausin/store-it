import React from "react";

export default function Arc({
    cx = 100,
    cy = 100,
    radius = 70,
    startAngle = 240,
    endAngle = -60,
    dotCount = 30,
    dotRadius = 1,
}: {
    cx?: number;
    cy?: number;
    radius?: number;
    startAngle?: number;
    endAngle?: number;
    dotCount?: number;
    dotRadius?: number;
}) {
    // Convert deg → rad
    const toRad = (deg: number) => (deg * Math.PI) / 180;

    // Step through the arc evenly
    const angleStep = (endAngle - startAngle) / (dotCount - 1);

    const dots = Array.from({ length: dotCount }, (_, i) => {
        const angle = toRad(startAngle + i * angleStep);
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        return { x, y };
    });

    return (
        <g className="animate-pulse">
            {dots.map((dot, i) => (
                <circle
                    key={i}
                    cx={dot.x}
                    cy={dot.y}
                    r={dotRadius}
                    fill="white"
                    style={{
                        filter: "drop-shadow(0 0 4px rgba(255,255,255,.9))",
                    }}
                />
            ))}
        </g>
    );
}
