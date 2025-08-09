import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Settings() {
  return (
    <div className="space-y-6 animate-enter">
      <Helmet>
        <title>Settings – E-commerce Admin</title>
        <meta name="description" content="Configure your application preferences." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
      </Helmet>
      <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="emails">Email Notifications</Label>
            <Switch id="emails" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="auto">Auto-approve Orders</Label>
            <Switch id="auto" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
