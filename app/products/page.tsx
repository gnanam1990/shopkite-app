import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const metadata = {
  title: "Products — ShopKite",
};

export default function ProductsPage() {
  return (
    <div className="container max-w-screen-2xl py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link href="/merchant">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm">
            List Product
          </button>
        </Link>
      </div>

      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No products listed yet. Be the first to list a product.
        </CardContent>
      </Card>
    </div>
  );
}
