import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "ShopKite — Commerce for AI Agents on Kite Mainnet",
};

export default function HomePage() {
  return (
    <div className="container max-w-screen-2xl py-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">ShopKite</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Commerce platform for AI shopping agents on Kite Mainnet.
          Merchants list products, agents purchase via x402.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/products">
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md">
              Browse Products
            </button>
          </Link>
          <Link href="/merchant">
            <button className="px-6 py-2 border border-border rounded-md">
              Become a Merchant
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Merchants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Orders (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
