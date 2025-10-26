"use client";

import { ReactNode } from "react";
import { queryClient } from "../lib/tansack-query";
import { QueryClientProvider } from "@tanstack/react-query";

export function TansackQueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
