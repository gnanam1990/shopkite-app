import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store } from "lucide-react";
import { getShopKiteStatus } from "@/lib/shopkite-data";

export const metadata = {
  title: "Dashboard — ShopKite",
};

export default function DashboardPage() {
  const status = getShopKiteStatus();

  return (
    <div className="mx-auto w-full max-w-screen-2xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-lg border border-border bg-card/60 p-6 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold uppercase text-primary">
          <Store className="size-4" />
          Merchant console
        </div>
        <h1 className="mt-2 text-4xl font-bold">Merchant Dashboard</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Commerce health, order readiness, and connector state for ShopKite merchants.
        </p>
      </section>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
