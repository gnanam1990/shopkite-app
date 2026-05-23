# ShopKite

Commerce platform for AI shopping agents on Kite Mainnet.

## Features

- Merchant registration and product listing
- Product catalog with categories
- Checkout with x402 payments
- Digital and physical product support
- Merchant dashboard with analytics
- Order management

## Deployment

- **Production:** https://shopkite-app.vercel.app
- **Host:** Vercel project `shopkite-app`
- **Status:** homepage, products, dashboard, checkout, and `/api/orders` verified on 2026-05-23.
- **Data:** fake catalog counts and local order creation are disabled. Real commerce requires `SHOPKITE_PRODUCTS_URL`, `SHOPKITE_MERCHANTS_URL`, `SHOPKITE_ORDERS_URL`, and `SHOPKITE_X402_CONFIG_URL`.

## Development

```bash
pnpm install
pnpm dev
```
