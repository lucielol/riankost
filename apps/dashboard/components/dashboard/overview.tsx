"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card";

export function Overview() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[350px] w-full bg-muted/20 rounded-md flex items-center justify-center text-muted-foreground">
          Chart Placeholder
        </div>
      </CardContent>
    </Card>
  );
}
