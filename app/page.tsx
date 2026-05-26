import Link from "next/link";
import { ArrowRight, Boxes, Receipt, Store } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getShopKiteStatus } from "@/lib/shopkite-data";

export const metadata = {
  title: "ShopKite — Commerce for AI Agents on Kite Mainnet",
};

export default function HomePage() {
  const status = getShopKiteStatus();

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-8 rounded-lg border border-border bg-card/60 p-6 shadow-sm sm:p-8 lg:grid-cols-[1.15fr,0.85fr] lg:items-center">
        <div className="space-y-5">
          <Badge variant={status.data_status === "connected" ? "default" : "outline"}>
            {status.data_status === "connected" ? "Live commerce APIs" : "Commerce APIs required"}
          </Badge>
          <div className="max-w-3xl space-y-4">
            <h1 className="text-5xl font-bold text-foreground sm:text-6xl">ShopKite</h1>
            <p className="text-lg leading-8 text-muted-foreground">
              Merchant-ready catalog, checkout, and x402 order rails for AI shopping agents on
              Kite Mainnet.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/products"
              className="inline-flex h-10 items-center gap-2 rounded-sm bg-primary px-4 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/85"
            >
              <Boxes className="size-4" />
              Browse Products
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex h-10 items-center gap-2 rounded-sm border border-border bg-background/60 px-4 text-sm font-bold text-foreground transition-colors hover:border-primary"
            >
              <Store className="size-4" />
              Merchant Dashboard
            </Link>
          </div>
        </div>

        <Card className="bg-background/65">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="size-4 text-primary" />
              Connector checklist
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Real catalog counts and local order creation stay disabled until these live
              integrations are configured.
            </p>
            <div className="rounded-md border border-border bg-muted/50 p-3 font-mono text-xs text-foreground">
              {status.missing_integrations.join(", ")}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
      </section>
    </div>
  );
}
