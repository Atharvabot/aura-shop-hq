import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight, Package, ShoppingCart, Users, DollarSign, Plus } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, Bar, BarChart, Pie, PieChart, Cell } from "recharts";
import { Link } from "react-router-dom";
import { useMemo } from "react";

const revenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 14500 },
  { month: "Mar", revenue: 13200 },
  { month: "Apr", revenue: 16500 },
  { month: "May", revenue: 17200 },
  { month: "Jun", revenue: 19000 },
];

const salesByCategory = [
  { name: "Apparel", value: 400 },
  { name: "Electronics", value: 300 },
  { name: "Home", value: 200 },
  { name: "Beauty", value: 120 },
];

const orderStatus = [
  { name: "Pending", value: 35 },
  { name: "Processing", value: 68 },
  { name: "Shipped", value: 52 },
  { name: "Delivered", value: 140 },
];

const recentOrders = [
  { id: "ORD-10234", customer: "Jane Cooper", total: 129.9, status: "Processing" },
  { id: "ORD-10233", customer: "Cody Fisher", total: 89.5, status: "Pending" },
  { id: "ORD-10232", customer: "Devon Lane", total: 249.0, status: "Delivered" },
  { id: "ORD-10231", customer: "Theresa Webb", total: 59.0, status: "Shipped" },
];

const lowStock = [
  { name: "Basic Tee", stock: 4 },
  { name: "Wireless Mouse", stock: 2 },
  { name: "Water Bottle", stock: 5 },
];

export default function Dashboard() {
  const pieColors = useMemo(() => ["#8b5cf6", "#22c55e", "#06b6d4", "#f97316"], []);

  return (
    <div className="space-y-6 animate-enter">
      <Helmet>
        <title>Dashboard – E-commerce Admin</title>
        <meta name="description" content="Overview of revenue, orders, customers, and products with charts and recent activity." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
      </Helmet>

      {/* Quick actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard Overview</h1>
        <div className="flex items-center gap-2">
          <Button asChild variant="hero">
            <Link to="/products"><Plus className="h-4 w-4" /> Add Product</Link>
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Total Revenue" value="$86,400" trend="12%" up Icon={DollarSign} />
        <MetricCard title="Orders" value="1,284" trend="3%" up Icon={ShoppingCart} />
        <MetricCard title="Customers" value="5,482" trend="-1.2%" Icon={Users} />
        <MetricCard title="Products" value="324" trend="0%" Icon={Package} />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ revenue: { label: "Revenue", color: "hsl(var(--primary))" } }}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <Area dataKey="revenue" type="monotone" stroke="hsl(var(--primary))" fill="url(#rev)" />
                <ChartTooltip content={<ChartTooltipContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{ value: { label: "Sales", color: "hsl(var(--primary))" } }}>
                <PieChart>
                  <Pie data={salesByCategory} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80}>
                    {salesByCategory.map((_, i) => (
                      <Cell key={`c-${i}`} fill={pieColors[i % pieColors.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{ value: { label: "Orders", color: "hsl(var(--primary))" } }}>
                <BarChart data={orderStatus}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="hsl(var(--primary))" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tables */}
      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <th className="sticky left-0 bg-background py-2 pr-4">Order</th>
                  <th className="py-2 pr-4">Customer</th>
                  <th className="py-2 pr-4">Total</th>
                  <th className="py-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-t">
                    <td className="sticky left-0 bg-background py-2 pr-4 font-medium">{o.id}</td>
                    <td className="py-2 pr-4">{o.customer}</td>
                    <td className="py-2 pr-4 font-mono">${o.total.toFixed(2)}</td>
                    <td className="py-2 pr-4"><Badge variant="secondary">{o.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Low Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {lowStock.map((i) => (
                <li key={i.name} className="flex items-center justify-between">
                  <span>{i.name}</span>
                  <Badge variant="destructive">{i.stock} left</Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, up, Icon }: { title: string; value: string; trend: string; up?: boolean; Icon: any }) {
  return (
    <Card className="hover-scale">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{value}</div>
        <div className={`mt-2 flex items-center text-sm ${up ? 'text-green-600' : 'text-red-600'}`}>
          {up ? <ArrowUpRight className="mr-1 h-4 w-4" /> : <ArrowDownRight className="mr-1 h-4 w-4" />}
          {trend} from last month
        </div>
      </CardContent>
    </Card>
  );
}
