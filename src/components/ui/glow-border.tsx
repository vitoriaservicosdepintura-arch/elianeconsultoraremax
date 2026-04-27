import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function GlowBorder({
    children,
    color = ["#A07CFE", "#FE8FB5", "#FFBE7B"],
    borderRadius = 32,
    borderWidth = 2,
    duration = 3,
    className = "",
}: {
    children: React.ReactNode;
    color?: string[];
    borderRadius?: number;
    borderWidth?: number;
    duration?: number;
    className?: string;
}) {
    return (
        <div
            className={cn("relative p-[1.5px]", className)}
            style={{
                borderRadius: `${borderRadius}px`,
            }}
        >
            {/* Camada de brilho contida pelo overflow local */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ borderRadius: `${borderRadius}px` }}>
                <div
                    className="absolute inset-x-[-150%] inset-y-[-150%] animate-glow-rotate opacity-50"
                    style={{
                        background: `conic-gradient(from 0deg, ${color.join(", ")}, ${color[0]})`,
                        animationDuration: `${duration}s`,
                    }}
                />
            </div>

            {/* Camada de conteúdo com overflow livre para permitir Pop-out */}
            <div
                className="relative z-10 w-full h-full overflow-visible"
                style={{
                    borderRadius: `${borderRadius - borderWidth}px`,
                }}
            >
                {children}
            </div>
        </div>
    );
}
