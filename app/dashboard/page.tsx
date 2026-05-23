import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getShopKiteStatus } from "@/lib/shopkite-data";

export const metadata = {
  title: "Dashboard — ShopKite",
};

export default function DashboardPage() {
  const status = getShopKiteStatus();

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      <h1 className="text-3xl font-bold">Merchant Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {status.metrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">{metric.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="mt-2 text-xs text-muted-foreground">{metric.detail}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
