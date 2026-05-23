import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Checkout — ShopKite",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-8 sm:px-6">
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            Checkout requires product selection and `SHOPKITE_X402_CONFIG_URL`.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
