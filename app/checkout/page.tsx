import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Checkout — ShopKite",
};

export default function CheckoutPage() {
  return (
    <div className="container max-w-md py-6">
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            No items in cart.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
