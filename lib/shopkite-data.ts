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

  let response: Response;
  try {
    response = await fetch(ordersUrl, {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: request.method === "GET" ? undefined : await request.text(),
    });
  } catch {
    return {
      status: 502,
      body: { error: "Order API is unreachable." },
    };
  }

  const text = await response.text();
  let body: unknown;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    // Upstream returned a non-JSON body (e.g. a gateway error page).
    // Preserve its status instead of throwing and masking it as a 500.
    body = { error: "Order API returned an invalid response.", upstream_body: text };
  }

  return {
    status: response.status,
    body,
  };
}
