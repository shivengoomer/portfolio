"use client";

import { ChevronDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface TabItem {
  value: string;
  label: string;
  content: React.ReactNode;
}

interface ResponsiveTabsProps {
  items: TabItem[];
  defaultValue?: string;
  className?: string;
}

export function ResponsiveTabs({
  items,
  defaultValue,
  className,
}: ResponsiveTabsProps) {
  const [activeTab, setActiveTab] = React.useState(
    defaultValue || items[0]?.value
  );
  const activeItem = items.find((item) => item.value === activeTab);

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-5 md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-12 w-full justify-between rounded-2xl border-black/10 bg-white/80 dark:border-white/10 dark:bg-white/[0.04]"
            >
              {activeItem?.label || "Select option"}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[220px] rounded-2xl border-black/10 bg-white/95 p-2 backdrop-blur dark:border-white/10 dark:bg-[#0b0b0d]/95">
            {items.map((item) => (
              <DropdownMenuItem
                key={item.value}
                onClick={() => setActiveTab(item.value)}
                className={cn(
                  "cursor-pointer rounded-xl px-3 py-2",
                  activeTab === item.value && "bg-accent"
                )}
              >
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="hidden md:block">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid h-auto w-full grid-cols-3 rounded-[1.5rem] border border-black/10 bg-white/70 p-1.5 backdrop-blur dark:border-white/10 dark:bg-white/[0.04]">
            {items.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className="rounded-[1rem] px-4 py-3 text-sm font-medium text-neutral-600 data-[state=active]:bg-neutral-950 data-[state=active]:text-white dark:text-neutral-300 dark:data-[state=active]:bg-white dark:data-[state=active]:text-neutral-950"
              >
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {items.map((item) => (
            <TabsContent key={item.value} value={item.value} className="mt-6">
              {item.content}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="md:hidden">{activeItem?.content}</div>
    </div>
  );
}
