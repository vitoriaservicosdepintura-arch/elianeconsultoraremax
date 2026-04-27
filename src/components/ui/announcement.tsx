import React from "react";
import { cn } from "@/utils/cn";

interface AnnouncementProps extends React.HTMLAttributes<HTMLDivElement> {
    movingBorder?: boolean;
}

export function Announcement({
    children,
    className,
    movingBorder,
    ...props
}: AnnouncementProps) {
    return (
        <div
            className={cn(
                "group relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-[1px] transition-all hover:bg-white/10",
                movingBorder && "overflow-hidden",
                className
            )}
            {...props}
        >
            {movingBorder && (
                <div className="absolute inset-0 z-0">
                    <div
                        className="absolute inset-[-150%] animate-glow-rotate opacity-70"
                        style={{
                            background:
                                "conic-gradient(from 0deg, transparent, #c49102, transparent 25%, transparent 75%, #c49102, transparent)",
                            animationDuration: "4s",
                        }}
                    />
                </div>
            )}
            <div className="relative z-10 flex flex-col items-center gap-1.5 rounded-2xl bg-[#0a143a]/90 px-6 py-4 backdrop-blur-xl">
                {children}
            </div>
        </div>
    );
}

interface AnnouncementTagProps extends React.HTMLAttributes<HTMLSpanElement> {
    lustre?: boolean;
}

export function AnnouncementTag({
    children,
    className,
    lustre,
    ...props
}: AnnouncementTagProps) {
    return (
        <span
            className={cn(
                "relative inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e8a020]",
                lustre && "overflow-hidden ring-1 ring-white/10",
                className
            )}
            {...props}
        >
            {lustre && (
                <div className="absolute inset-x-0 h-full w-full pointer-events-none">
                    <div className="h-full w-8 bg-white/10 blur-md animate-lustre" />
                </div>
            )}
            <span className="relative z-10">{children}</span>
        </span>
    );
}

export function AnnouncementTitle({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
    return (
        <span
            className={cn(
                "flex flex-col items-center text-center gap-1",
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}
