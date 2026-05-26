import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Plus, ShoppingBag } from "lucide-react";
import { getShopKiteStatus } from "@/lib/shopkite-data";

export const metadata = {
  title: "Products — ShopKite",
};

export default function ProductsPage() {
  const status = getShopKiteStatus();

  return (
    <div className="mx-auto w-full max-w-screen-2xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 rounded-lg border border-border bg-card/60 p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-primary">
            <ShoppingBag className="size-4" />
            Agent catalog
          </div>
          <h1 className="mt-2 text-4xl font-bold">Products</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Catalog data requires `SHOPKITE_PRODUCTS_URL`.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex h-10 items-center gap-2 rounded-sm bg-primary px-4 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/85"
        >
          <Plus className="size-4" />
          List Product
        </Link>
      </div>

      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          {status.missing_integrations.includes("SHOPKITE_PRODUCTS_URL")
            ? "Product catalog API not connected."
            : "No products returned by the configured catalog."}
        </CardContent>
      </Card>
    </div>
  );
}
