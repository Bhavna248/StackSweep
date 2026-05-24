create table if not exists audits (
  id text primary key,
  payload jsonb not null,
  total_monthly_savings numeric not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  audit_id text references audits(id),
  email text not null,
  company_name text,
  role text,
  team_size int,
  created_at timestamptz not null default now()
);

create index if not exists leads_audit_id on leads(audit_id);
