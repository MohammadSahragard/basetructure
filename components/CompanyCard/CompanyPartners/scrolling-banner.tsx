"use client";

import type {ScrollShadowProps} from "@nextui-org/react";

import React from "react";
import {ScrollShadow} from "@nextui-org/react";

import {cn} from "@nextui-org/react";

interface ScrollingBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  isReverse?: boolean;
  showShadow?: boolean;
  shouldPauseOnHover?: boolean;
  isVertical?: boolean;
  gap?: string;
  duration?: number; // in seconds
}
const ScrollingBanner = React.forwardRef<HTMLDivElement, ScrollingBannerProps>(
  (
    {
      className,
      isReverse,
      isVertical = false,
      gap = "1rem",
      showShadow = false,
      shouldPauseOnHover = true,
      duration = 40,
      children,
      ...props
    },
    ref,
  ) => {
    const shadowProps: ScrollShadowProps = {
      isEnabled: showShadow,
      offset: -20,
      size: 300,
      orientation: isVertical ? "vertical" : "horizontal",
      visibility: "both",
    };

    return (
      <ScrollShadow
        {...props}
        {...shadowProps}
        ref={ref}
        className={cn(
          "flex",
          {
            "": !isVertical,
            "overflow-y-hidden": isVertical,
            "overflow-x-hidden": !isVertical,
            "max-h-[calc(100vh_-_200px)]": isVertical,
          },
          className,
        )}
        style={{
          // @ts-ignore
          "--gap": gap,
          "--duration": `${duration}s`,
        }}
      >
        <div
          className={cn("flex max-w-96 items-stretch gap-[--gap]", {
            "flex-col": isVertical,
            "h-full": isVertical,
            "animate-scrolling-banner": !isVertical,
            "animate-scrolling-banner-vertical": isVertical,
            "[animation-direction:reverse]": isReverse,
            "hover:[animation-play-state:paused]": shouldPauseOnHover,
          })}
        >
          {React.Children.map(children, (child) => React.cloneElement(child as any))}
        </div>
      </ScrollShadow>
    );
  },
);

ScrollingBanner.displayName = "ScrollingBanner";

export default ScrollingBanner;
