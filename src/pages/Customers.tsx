import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const rows = [
  { name: "Jane Cooper", email: "jane@example.com", orders: 12, spent: 1290.45, segment: "Loyal" },
  { name: "Cody Fisher", email: "cody@example.com", orders: 3, spent: 189.5, segment: "New" },
  { name: "Devon Lane", email: "devon@example.com", orders: 7, spent: 540.0, segment: "Returning" },
];

export default function Customers() {
  return (
    <div className="space-y-6 animate-enter">
      <Helmet>
        <title>Customers – E-commerce Admin</title>
        <meta name="description" content="View customers, order counts, spend and segments." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
      </Helmet>
      <h1 className="text-2xl font-semibold tracking-tight">Customers</h1>
      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Segment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map(r => (
                  <TableRow key={r.email}>
                    <TableCell className="font-medium">{r.name}</TableCell>
                    <TableCell>{r.email}</TableCell>
                    <TableCell>{r.orders}</TableCell>
                    <TableCell className="font-mono">${r.spent.toFixed(2)}</TableCell>
                    <TableCell>{r.segment}</TableCell>
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
