import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const data = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 14500 },
  { month: "Mar", revenue: 13200 },
  { month: "Apr", revenue: 16500 },
  { month: "May", revenue: 17200 },
  { month: "Jun", revenue: 19000 },
];

export default function Analytics() {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className="space-y-6 animate-enter">
      <Helmet>
        <title>Analytics – E-commerce Admin</title>
        <meta name="description" content="Advanced charts and revenue analytics with date filter." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
      </Helmet>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"outline"} className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}> 
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus className={cn("p-3 pointer-events-auto")} />
          </PopoverContent>
        </Popover>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{ revenue: { label: "Revenue", color: "hsl(var(--primary))" } }}>
            <LineChart data={data}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis hide />
              <Line dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
