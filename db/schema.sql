create table merchants (
  id text primary key default ('mcht_' || lower(replace(gen_random_uuid()::text, '-', ''))),
  owner_address text unique not null,
  name text not null,
  slug text unique not null,
  description text,
  logo_url text,
  website text,
  status text not null default 'active' check (status in ('active', 'suspended')),
  created_at timestamptz default now()
);

create table products (
  id text primary key default ('prod_' || lower(replace(gen_random_uuid()::text, '-', ''))),
  merchant_id text references merchants(id) on delete cascade,
  name text not null,
  slug text not null,
  description text not null,
  price_usdc numeric(20, 6) not null,
  image_url text,
  category text not null,
  product_type text not null check (product_type in ('digital', 'physical', 'service')),
  stock int default -1,
  status text not null default 'active' check (status in ('active', 'paused', 'sold_out')),
  created_at timestamptz default now(),
  unique(merchant_id, slug)
);

create table orders (
  id text primary key default ('ord_' || lower(replace(gen_random_uuid()::text, '-', ''))),
  product_id text references products(id),
  buyer_address text not null,
  session_id text,
  amount_usdc numeric(20, 6) not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'delivered', 'refunded')),
  delivery_url text,
  created_at timestamptz default now()
);

create index idx_products_merchant on products(merchant_id);
create index idx_products_category on products(category);
create index idx_orders_product on orders(product_id);
