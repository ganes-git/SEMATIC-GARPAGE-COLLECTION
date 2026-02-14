-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- DECKS
create table decks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) not null,
  title text not null,
  description text,
  subject text,
  is_public boolean default false,
  created_at timestamp with time zone default now()
);

-- CARDS
create table cards (
  id uuid primary key default uuid_generate_v4(),
  deck_id uuid references decks(id) on delete cascade not null,
  front text not null,
  back text not null,
  ease_factor float default 2.5,
  interval int default 0,
  repetitions int default 0,
  next_review timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);

-- STUDY SESSIONS
create table study_sessions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) not null,
  deck_id uuid references decks(id),
  cards_reviewed int default 0,
  correct_count int default 0,
  duration_minutes int default 0,
  focus_score float default 0,
  created_at timestamp with time zone default now()
);

-- ROW LEVEL SECURITY (RLS)
alter table decks enable row level security;
alter table cards enable row level security;
alter table study_sessions enable row level security;

-- POLICIES
-- Decks: Users can view their own decks and public decks
create policy "Public decks are viewable by everyone"
  on decks for select
  using ( is_public = true );

create policy "Users can view their own decks"
  on decks for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own decks"
  on decks for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own decks"
  on decks for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own decks"
  on decks for delete
  using ( auth.uid() = user_id );

-- Cards: Users can see cards in their decks or public decks
create policy "Users can view cards in viewable decks"
  on cards for select
  using (
    exists (
      select 1 from decks
      where decks.id = cards.deck_id
      and (decks.is_public = true or decks.user_id = auth.uid())
    )
  );

create policy "Users can insert cards in their own decks"
  on cards for insert
  with check (
    exists (
      select 1 from decks
      where decks.id = deck_id
      and decks.user_id = auth.uid()
    )
  );

create policy "Users can update cards in their own decks"
  on cards for update
  using (
    exists (
      select 1 from decks
      where decks.id = cards.deck_id
      and decks.user_id = auth.uid()
    )
  );

create policy "Users can delete cards in their own decks"
  on cards for delete
  using (
    exists (
      select 1 from decks
      where decks.id = cards.deck_id
      and decks.user_id = auth.uid()
    )
  );
