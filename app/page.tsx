import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getShopKiteStatus } from "@/lib/shopkite-data";

export const metadata = {
  title: "ShopKite — Commerce for AI Agents on Kite Mainnet",
};

export default function HomePage() {
  const status = getShopKiteStatus();

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <div className="space-y-4">
        <Badge variant={status.data_status === "connected" ? "default" : "outline"}>
          {status.data_status === "connected" ? "Live commerce APIs" : "Commerce APIs required"}
        </Badge>
        <h1 className="text-4xl font-bold">ShopKite</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Commerce platform for AI shopping agents on Kite Mainnet.
          Merchants list products and agents purchase via x402 once real product,
          merchant, order, and payment connectors are configured.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/products">
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md">
              Browse Products
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="px-6 py-2 border border-border rounded-md">
              Merchant Dashboard
            </button>
          </Link>
        </div>
      </div>

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

      <Card>
        <CardHeader>
          <CardTitle>Real commerce backend required</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Fake catalog counts and local order creation are disabled. Missing envs:{" "}
          <span className="font-mono">{status.missing_integrations.join(", ")}</span>
        </CardContent>
      </Card>
    </div>
  );
}
