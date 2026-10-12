-- ECOBATI x ITBTP — Migration 001 (IDEMPOTENTE, à vérifier sur le schéma réel avant exécution; ne jamais reset)
-- Historique mentionné (003/004/005/007/008/009): état d'exécution INCONNU ici → vérifier dans Supabase avant d'appliquer.
create table if not exists public.pages(id uuid primary key default gen_random_uuid(), slug text unique not null, title text not null, status text default 'draft', created_at timestamptz default now());
create table if not exists public.page_sections(id uuid primary key default gen_random_uuid(), page_slug text not null, type text, title text, subtitle text, body text, image_url text, cta_label text, cta_href text, order_index int default 0, visible bool default true, status text default 'draft', created_at timestamptz default now());
create table if not exists public.services(id uuid primary key default gen_random_uuid(), title text unique not null, description text, entity text, category text, image_url text, order_index int default 0, status text default 'draft');
create table if not exists public.projects(id uuid primary key default gen_random_uuid(), code text unique, title text not null, description text, category text, location text, year text, image_url text, gallery jsonb default '[]', video_url text, status text, review_state text, owner text, entity text, featured bool default false, visible bool default false, order_index int default 0, problem text, intervention text, result text, created_at timestamptz default now(), updated_at timestamptz default now());
create table if not exists public.slides(id uuid primary key default gen_random_uuid(), kicker text, title text, hook text, description text, image_url text, cta1 text, cta2 text, order_index int default 0, visible bool default true, status text default 'draft');
create table if not exists public.team_members(id uuid primary key default gen_random_uuid(), name text, role text, bio text, photo_url text, entity text, order_index int default 0, status text default 'draft');
create table if not exists public.media(id uuid primary key default gen_random_uuid(), project_id uuid references public.projects(id), folder text, filename text, storage_path text, mime_type text, size_bytes bigint, visibility text default 'public', created_at timestamptz default now());
create table if not exists public.contact_messages(id uuid primary key default gen_random_uuid(), name text, email text, phone text, company text, structure text, request_type text, subject text, message text, status text default 'Non lu', source text, created_at timestamptz default now());
create table if not exists public.leads(id uuid primary key default gen_random_uuid(), name text, email text, phone text, stage text default 'Nouveau', notes text, source_message_id uuid, created_at timestamptz default now());
create table if not exists public.newsletter_subscribers(id uuid primary key default gen_random_uuid(), email text unique not null, status text default 'Abonné', created_at timestamptz default now());
create table if not exists public.analytics_events(id uuid primary key default gen_random_uuid(), type text, page text, created_at timestamptz default now());
-- Bucket Storage (lecture publique, écriture authentifiée uniquement)
insert into storage.buckets(id,name,public) values('site-media','site-media',true) on conflict (id) do nothing;
-- RLS: lecture publique = publié/visible uniquement; écriture = utilisateur authentifié (à restreindre à un rôle admin via claim/table admins en production)
do $$ declare t text; begin foreach t in array array['pages','page_sections','services','projects','slides','team_members','media','contact_messages','leads','newsletter_subscribers','analytics_events'] loop execute format('alter table public.%I enable row level security',t); end loop; end $$;
-- Exemples de politiques (à adapter après audit du schéma réel):
-- create policy "public read published" on public.projects for select using (visible=true);
-- create policy "auth write" on public.projects for all using (auth.role()='authenticated') with check (auth.role()='authenticated');
-- create policy "public insert message" on public.contact_messages for insert with check (true);
