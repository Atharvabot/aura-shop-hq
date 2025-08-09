import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const ProductSchema = z.object({
  name: z.string().min(2),
  price: z.coerce.number().positive(),
  category: z.string().min(1),
  stock: z.coerce.number().int().nonnegative(),
  description: z.string().min(5),
  image: z.instanceof(File).optional(),
});

type ProductForm = z.infer<typeof ProductSchema>;

const mockProducts = [
  { id: 1, name: "Basic Tee", category: "Apparel", price: 24.99, stock: 120, status: "Active" },
  { id: 2, name: "Wireless Mouse", category: "Electronics", price: 39.99, stock: 8, status: "Low Stock" },
  { id: 3, name: "Water Bottle", category: "Home", price: 14.99, stock: 0, status: "Out of Stock" },
];

export default function Products() {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState(mockProducts);
  const [selected, setSelected] = useState<number[]>([]);
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<ProductForm>({ resolver: zodResolver(ProductSchema) });

  const onSubmit = (data: ProductForm) => {
    const id = rows.length + 1;
    setRows([{ id, name: data.name, category: data.category, price: data.price, stock: data.stock, status: data.stock === 0 ? 'Out of Stock' : data.stock < 10 ? 'Low Stock' : 'Active' }, ...rows]);
    setOpen(false);
    reset();
    toast({ title: "Product added", description: `${data.name} has been created.` });
  };

  const bulkDelete = () => {
    setRows(rows.filter(r => !selected.includes(r.id)));
    setSelected([]);
    toast({ title: "Deleted", description: "Selected products were removed." });
  };

  const toggleAll = (checked: boolean) => {
    setSelected(checked ? rows.map(r => r.id) : []);
  };

  return (
    <div className="space-y-6 animate-enter">
      <Helmet>
        <title>Products – E-commerce Admin</title>
        <meta name="description" content="Manage products with sorting, filtering, and bulk actions." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
      </Helmet>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
        <div className="flex items-center gap-2">
          {selected.length > 0 && (
            <Button variant="destructive" onClick={bulkDelete}>Delete Selected</Button>
          )}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="hero">Add Product</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Add Product</DialogTitle>
              </DialogHeader>
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" {...register('name')} />
                  {errors.name && <p className="text-sm text-destructive">Name is required</p>}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" type="number" step="0.01" {...register('price')} />
                </div>
                <div className="grid gap-3">
                  <Label>Category</Label>
                  <Select onValueChange={(v) => setValue('category', v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Apparel">Apparel</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Home">Home</SelectItem>
                      <SelectItem value="Beauty">Beauty</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="stock">Stock</Label>
                  <Input id="stock" type="number" {...register('stock')} />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" rows={4} {...register('description')} />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="image">Image</Label>
                  <Input id="image" type="file" accept="image/*" onChange={(e) => setValue('image', e.target.files?.[0])} />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button type="submit">Create</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox checked={selected.length === rows.length} onCheckedChange={(v) => toggleAll(Boolean(v))} />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((p) => (
                  <TableRow key={p.id} className={selected.includes(p.id) ? 'bg-muted/50' : undefined}>
                    <TableCell>
                      <Checkbox checked={selected.includes(p.id)} onCheckedChange={(v) => setSelected(v ? [...selected, p.id] : selected.filter(id => id !== p.id))} />
                    </TableCell>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell>{p.category}</TableCell>
                    <TableCell className="font-mono">${p.price.toFixed(2)}</TableCell>
                    <TableCell>{p.stock}</TableCell>
                    <TableCell>
                      {p.status === 'Active' && <Badge variant="secondary">Active</Badge>}
                      {p.status === 'Low Stock' && <Badge variant="destructive">Low</Badge>}
                      {p.status === 'Out of Stock' && <Badge variant="destructive">Out</Badge>}
                    </TableCell>
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
