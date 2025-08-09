import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const rows = [
  { id: "ORD-10234", customer: "Jane Cooper", date: "2025-08-01", status: "Processing", total: 129.9 },
  { id: "ORD-10233", customer: "Cody Fisher", date: "2025-07-31", status: "Pending", total: 89.5 },
  { id: "ORD-10232", customer: "Devon Lane", date: "2025-07-29", status: "Delivered", total: 249.0 },
];

export default function Orders() {
  return (
    <div className="space-y-6 animate-enter">
      <Helmet>
        <title>Orders – E-commerce Admin</title>
        <meta name="description" content="Track orders, statuses, totals and customer info." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
      </Helmet>
      <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map(r => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.id}</TableCell>
                    <TableCell>{r.customer}</TableCell>
                    <TableCell>{r.date}</TableCell>
                    <TableCell><Badge variant={r.status === 'Delivered' ? 'secondary' : 'outline'}>{r.status}</Badge></TableCell>
                    <TableCell className="font-mono">${r.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
