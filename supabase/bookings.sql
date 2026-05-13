-- Run this in the Supabase SQL editor before using /rooms or /admin/bookings.

create table if not exists bookings (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,

  -- Guest
  guest_name text not null,
  guest_email text not null,
  guest_phone text,

  -- Stay
  room_type text not null check (room_type in ('premium', 'standard')),
  plan text not null check (plan in ('ep', 'cp', 'map')),
  check_in date not null,
  check_out date not null,
  -- Per-type caps (7 premium / 9 standard total · 3 premium-guests / 2 standard-guests
  -- per room) are enforced in the app layer. DB ceilings are loose so server
  -- validation, not the constraint, is what produces user-facing errors.
  -- Max guests = max(7 × 3, 9 × 2) = 21. Max rooms = max(7, 9) = 9.
  guests int not null default 2 check (guests between 1 and 21),
  rooms int not null default 1 check (rooms between 1 and 9),

  -- Pricing snapshot at booking time
  total_amount numeric(10,2) not null,
  pricing_breakdown jsonb,

  -- Workflow
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'cancelled')),
  special_requests text,
  admin_notes text,

  constraint bookings_dates_chk check (check_out > check_in)
);

create index if not exists bookings_created_at_idx on bookings (created_at desc);
create index if not exists bookings_status_idx on bookings (status);
create index if not exists bookings_check_in_idx on bookings (check_in);
