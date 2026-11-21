import type { Order } from "@/lib/types";

export const SHOPKITE_ENVS = [
  "SHOPKITE_PRODUCTS_URL",
  "SHOPKITE_MERCHANTS_URL",
  "SHOPKITE_ORDERS_URL",
  "SHOPKITE_X402_CONFIG_URL",
] as const;

export interface ShopKiteStatus {
  data_status: "connected" | "connectors_required";
  connected_services: number;
  missing_integrations: string[];
  metrics: Array<{
    label: string;
    value: string;
    detail: string;
  }>;
}

export function getShopKiteStatus(): ShopKiteStatus {
  const missing = SHOPKITE_ENVS.filter((name) => !process.env[name]);
  const connected = SHOPKITE_ENVS.length - missing.length;

  return {
    data_status: missing.length === 0 ? "connected" : "connectors_required",
    connected_services: connected,
    missing_integrations: missing,
    metrics: [
      {
        label: "Products",
        value: process.env.SHOPKITE_PRODUCTS_URL ? "Connected" : "Needs API",
        detail: "Product catalog source",
      },
      {
        label: "Merchants",
        value: process.env.SHOPKITE_MERCHANTS_URL ? "Connected" : "Needs API",
        detail: "Merchant registry source",
      },
      {
        label: "Orders",
        value: process.env.SHOPKITE_ORDERS_URL ? "Connected" : "Needs API",
        detail: "Order creation and status source",
      },
      {
        label: "x402",
        value: process.env.SHOPKITE_X402_CONFIG_URL ? "Connected" : "Needs API",
        detail: "Payment configuration source",
      },
    ],
  };
}

export async function proxyOrders(request: Request) {
  const ordersUrl = process.env.SHOPKITE_ORDERS_URL;
  if (!ordersUrl) {
    return {
      status: 503,
      body: {
        data_status: "connectors_required",
        missing_integrations: ["SHOPKITE_ORDERS_URL"],
        error: "Order API is not configured. Fake orders are disabled.",
      },
    };
  }

  const response = await fetch(ordersUrl, {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: request.method === "GET" ? undefined : await request.text(),
  });

  return {
    status: response.status,
    body: await response.json(),
  };
}

const SETTLED_ORDER_STATUSES = new Set(["paid", "delivered"]);

export async function getOrderStats() {
  const ordersUrl = process.env.SHOPKITE_ORDERS_URL;
  if (!ordersUrl) {
    return {
      status: 503,
      body: {
        error: "no live data source",
        reason: "SHOPKITE_ORDERS_URL is not configured. Fake orders are disabled.",
      },
    };
  }

  try {
    const response = await fetch(ordersUrl, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Order API responded with HTTP ${response.status}`);
    }

    const data: unknown = await response.json();
    const orders = Array.isArray(data)
      ? data
      : (data as { orders?: unknown } | null)?.orders;
    if (!Array.isArray(orders)) {
      throw new Error("Order API did not return a list of orders");
    }

    const settled = (orders as Partial<Order>[]).filter(
      (order) => order.status && SETTLED_ORDER_STATUSES.has(order.status),
    );
    const gmv = settled.reduce((sum, order) => sum + Number(order.amount_usdc ?? 0), 0);

    return {
      status: 200,
      body: {
        orders: settled.length,
        gmv: Number.isFinite(gmv) ? Math.round(gmv * 1e6) / 1e6 : null,
        source: "ShopKite order API (paid + delivered orders, USDC)",
        as_of: new Date().toISOString(),
      },
    };
  } catch (error) {
    return {
      status: 503,
      body: {
        error: "no live data source",
        reason: error instanceof Error ? error.message : "Order API request failed",
      },
    };
  }
}
