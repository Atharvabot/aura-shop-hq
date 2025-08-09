import { Outlet, useLocation, NavLink } from "react-router-dom";
import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarInset, SidebarTrigger, SidebarHeader, SidebarSeparator } from "@/components/ui/sidebar";
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Settings, Bell, Search } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useMemo } from "react";
import { Helmet } from "react-helmet-async";

const nav = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Products", url: "/products", icon: Package },
  { title: "Orders", url: "/orders", icon: ShoppingCart },
  { title: "Customers", url: "/customers", icon: Users },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

const Topbar = () => {
  const location = useLocation();
  const crumbs = useMemo(() => {
    const parts = location.pathname.split("/").filter(Boolean);
    return parts;
  }, [location.pathname]);

  const mapTitle = (segment: string) => segment.charAt(0).toUpperCase() + segment.slice(1);

  return (
    <div className="flex h-14 items-center gap-3 border-b px-4">
      <SidebarTrigger className="mr-1" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <NavLink to="/">Home</NavLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {crumbs.map((c, i) => (
            <>
              <BreadcrumbSeparator key={`sep-${i}`} />
              <BreadcrumbItem key={c}>
                {i === crumbs.length - 1 ? (
                  <BreadcrumbPage>{mapTitle(c)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <NavLink to={`/${crumbs.slice(0, i + 1).join("/")}`}>{mapTitle(c)}</NavLink>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="ml-auto flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 rounded-md border bg-background px-2 py-1.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products, orders..." className="h-7 border-0 focus-visible:ring-0" />
        </div>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </Button>
        <ThemeToggle />
        <Avatar className="h-8 w-8">
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

const ThemeToggle = () => {
  const toggle = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
  };
  return (
    <Button variant="outline" size="icon" onClick={toggle} aria-label="Toggle theme">
      <span className="sr-only">Toggle theme</span>
      <div className="h-4 w-4 rounded-full bg-primary" />
    </Button>
  );
};

export default function DashboardLayout() {
  const location = useLocation();

  return (
    <SidebarProvider>
      <Helmet>
        <title>E-commerce Admin Dashboard</title>
        <meta name="description" content="Manage products, orders, customers and analytics in a modern dashboard." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
      </Helmet>
      <Sidebar collapsible="offcanvas">
        <SidebarHeader>
          <div className="px-2 py-1.5 text-sm font-semibold">Commerce Admin</div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {nav.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} end className={({ isActive }) => isActive ? "bg-muted text-primary font-medium" : "hover:bg-muted/50"}>
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarSeparator />
      </Sidebar>
      <SidebarInset>
        <header>
          <Topbar />
        </header>
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
