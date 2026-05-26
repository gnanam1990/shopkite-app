import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Receipt } from "lucide-react";

export const metadata = {
  title: "Checkout — ShopKite",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 items-center px-4 py-10 sm:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="size-4 text-primary" />
            Checkout
          </CardTitle>
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
