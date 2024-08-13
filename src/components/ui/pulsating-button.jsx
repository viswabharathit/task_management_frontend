// PulsatingButton.js
"use client";
import React from "react";

import { cn } from "@/lib/utils"; // Ensure this utility function is available in your project

export default function PulsatingButton({
  className,
  children = "Get Started",
  pulseColor = "#10B981",
  duration = "1.5s",
  ...props
}) {
  return (
    <button
      className={cn(
        "relative text-center cursor-pointer flex justify-center items-center rounded-lg text-white dark:text-black bg-green-500 dark:bg-green-500 px-4 py-2",
        className
      )}
      style={{
        "--pulse-color": pulseColor,
        "--duration": duration
      }}
      {...props}
    >
      <div className="relative z-10">{children}</div>
      <div className="absolute top-1/2 left-1/2 size-full rounded-lg bg-inherit animate-pulse -translate-x-1/2 -translate-y-1/2" />
    </button>
  );
}
