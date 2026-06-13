# ShopKite

> Commerce surface for AI shopping agents on Kite Mainnet, with order rails wired over x402.

## Overview

ShopKite is a Next.js commerce front end built for AI shopping agents transacting on Kite Mainnet. It presents a merchant-oriented surface — homepage, product catalog, merchant dashboard, and checkout — and forwards order operations to an external authoritative orders backend. The app ships with no fabricated data: catalog, merchant, order, and payment features stay inert until their respective upstream services are configured, so what you see reflects real integration state rather than seeded demo content.

## Features

- Homepage with a live connector checklist and per-service status metrics (Products, Merchants, Orders, x402).
- Product catalog page that reflects the configured catalog source rather than hard-coded listings.
- Merchant dashboard summarizing commerce readiness and connector state.
- `/api/orders` route (GET/POST) that proxies to an external authoritative orders backend.
- Connector-aware status: each surface reports whether its upstream service is configured.

## Tech stack

- **Framework:** Next.js 16 (App Router), React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4, shadcn/ui components on Base UI primitives, `lucide-react` icons
- **Validation:** zod
- **Chain tooling:** viem
- **Package manager:** pnpm

## Architecture

The app is a single Next.js project. Each page derives its display from configured upstream service URLs rather than embedded data.

- `app/` — App Router pages (`/`, `/products`, `/dashboard`, `/checkout`) and the `/api/orders` route handler.
- `lib/shopkite-data.ts` — connector status resolution (`getShopKiteStatus`) and the order proxy (`proxyOrders`).
- `lib/types.ts` — domain types (`Merchant`, `Product`, `Order`) and product categories.
- `db/schema.sql` — reference Postgres schema for merchants, products, and orders used by the upstream services.
- `components/ui/` — shared UI primitives.

Order requests hit `/api/orders`, which forwards the request to `SHOPKITE_ORDERS_URL` (the authoritative orders backend) and relays its response. ShopKite does not create or persist orders locally.

## Getting started

### Prerequisites

- Node.js 20 or newer
- pnpm

### Installation

```bash
pnpm install
```

### Configuration

ShopKite reads the following environment variables. None ship with default values; each governs whether the corresponding surface is active. Provide them via a `.env.local` file or your hosting environment.

| Variable | Purpose |
| --- | --- |
| `SHOPKITE_PRODUCTS_URL` | Product catalog source. |
| `SHOPKITE_MERCHANTS_URL` | Merchant registry source. |
| `SHOPKITE_ORDERS_URL` | Authoritative orders backend that `/api/orders` proxies to. |
| `SHOPKITE_X402_CONFIG_URL` | Payment (x402) configuration source. |

When a variable is unset, its surface reports a "connectors required" state instead of showing fabricated data.

### Running

```bash
pnpm dev      # start the development server
pnpm build    # production build
pnpm start    # serve the production build
pnpm lint     # run ESLint
```

## Usage

- **Status surfaces** — the homepage and dashboard call `getShopKiteStatus()`, which checks which `SHOPKITE_*_URL` variables are configured and renders per-service metrics plus the list of missing integrations.
- **Orders API** — `GET` and `POST /api/orders` proxy to `SHOPKITE_ORDERS_URL`:
  - `503` when `SHOPKITE_ORDERS_URL` is not configured.
  - `502` when the upstream backend is unreachable.
  - Otherwise the upstream status and JSON body are relayed; a non-JSON upstream response is preserved rather than masked.

## Database

`db/schema.sql` defines the Postgres tables (`merchants`, `products`, `orders`) consumed by the upstream services. The app itself does not connect to a database directly; it talks to the configured service URLs.

## Status

Preview. The UI scaffolding and the orders proxy are functional, but the app is gated on external services and several surfaces are intentionally inert:

- **Catalog, merchants, dashboard metrics** — render real upstream data only once the corresponding `SHOPKITE_*_URL` variables point at live services; otherwise they show a "connectors required" state. No seeded or fake data is shown.
- **Checkout** — a placeholder page; it does not yet perform a purchase flow.
- **x402** — surfaced as a configuration label driven by the presence of `SHOPKITE_X402_CONFIG_URL`. The app reports payment-config readiness but does not itself execute on-chain payments.
- **Orders** — the only data-path that performs real work: `/api/orders` forwards to the authoritative orders backend; it does not create orders locally.

## License

No license specified.
