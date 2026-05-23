import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getShopKiteStatus } from "@/lib/shopkite-data";

export const metadata = {
  title: "Products — ShopKite",
};

export default function ProductsPage() {
  const status = getShopKiteStatus();

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Catalog data requires `SHOPKITE_PRODUCTS_URL`.
          </p>
        </div>
        <Link href="/dashboard">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm">
            List Product
          </button>
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
