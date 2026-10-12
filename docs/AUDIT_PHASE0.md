# PHASE 0 — AUDIT INITIAL · ECOBATI × ITBTP
Date: 2026-10-12 · Dépôt: ecobatigdk-star/ItBtp-EcoBati · Branche: arena/9cf308ff-itbtp-ecobati

## 1. Inventaire technique (vérifié)
- Dépôt Git: 1 seul commit `fb06dc2 Initial commit`, 1 fichier: `README.md` (359 o).
- Aucun code source, composant, route, style, logo, migration SQL, script d'import, formulaire, page admin.
- Aucun `package.json`, aucune variable d'environnement, aucun accès Supabase fourni.
- Dossiers historiques `C:\ITBTP-GDK-ECOBATI` et `D:\ITBTP_VISUELS`: NON accessibles depuis cet environnement (non supposés présents).
- Conclusion A-E:
  - A Fonctionnel à conserver: uniquement l'intention du README (site + admin Supabase).
  - B Incomplet à corriger: tout.
  - C Absent à construire: site public, CMS, auth, Supabase (schéma/RLS/Storage), médias, cockpit, leads, newsletter, analytics, SEO, tests.
  - D Données à préserver: aucune donnée dans le dépôt; ne rien écraser côté Supabase réel (inconnu).
  - E Risques: inventer données métier, casser UUID/slugs, RLS ouverte, clé service exposée — tous traités par les règles du Master Prompt.
  - F Impossible à vérifier sans accès: état réel Supabase (tables, migrations 003/004/005/007/008/009, bucket `site-media`), domaine ecobati-itbtp.com/DNS, visuels réels.

## 2. Cartographie pages publiques (cible)
| Route | Source de données | État CMS | Mode |
|---|---|---|---|
| `/` Accueil | `slides` publiés + `page_sections(slug=home)` + projets/services publiés | A CMS complet (sections seedées) | Publié si sections publiées |
| `/a-propos` | `page_sections(slug=about)` | A CMS complet (seedé, sans histoire inventée) | Brouillon→Publié |
| `/expertise` | **table métier `services`** (PAS la table pages) | **C — alimentée par table métier** | Statut par service |
| `/projets` | **table métier `projects`** | **C — alimentée par table métier** | `visible` + statut |
| `/projets/:code` | `projects` + `media(project_id)` | C | Publié uniquement |
| `/equipe` | `team_members` | E→ état vide élégant (aucun membre fictif) | Par membre |
| `/contact` | config validée + `contact_messages`→`leads` | D statique + formulaire réel | — |
| `/confidentialite`, `/mentions-legales` | sections CMS | D (mentions: à valider légalement) | — |
| `*` 404 | statique | D | — |

## 3. Diagnostic du bug « pages vides dans Admin »
Cause racine (classique sur l'ancien système): l'éditeur Admin lisait `pages/page_sections` alors que
`/expertise`, `/projets` etc. étaient rendus depuis les tables métier `services/projects/slides`.
Résultat: contenu public visible, éditeur vide — sans explication.
Correctif appliqué dans cette reconstruction:
1. Chaque page Admin affiche sa **source de données** et sa classe (A/B/C/D/E).
2. Les pages C affichent un panneau « Gérée par la table métier X → Ouvrir le gestionnaire », jamais un éditeur vide muet.
3. Les pages CMS réelles (home, about…) sont **seedées** avec les textes de référence validés, en brouillon explicite.
4. État vide = explication + action (Créer une section / Importer / Consulter la source).

## 4. Inventaire Supabase (cible, à vérifier en réel avant exécution)
Tables: sites, pages, page_sections, projects(code PRJ, title généré), services, slides,
team_members, media(project_id UUID résolu via projects.code), contact_messages, leads,
newsletter_subscribers, analytics_events. Bucket: `site-media` (lecture publique, écriture auth uniquement).
RLS: lecture publique = lignes publiées/visibles uniquement; écriture = rôle admin authentifié.
Aucune `service_role` dans le navigateur. Migrations fournies idempotentes dans `supabase/migrations/`, à exécuter après vérification du schéma réel — jamais de reset.

## 5. Médias
Aucun visuel réel disponible ici → aucun rattachement inventé. Règle `project_id`: résoudre `projects.code` → `projects.id`; arrêter si introuvable; jamais `NULL` de contournement; dry-run sans écriture (`scripts/import-media.mjs`). PDF: publics/internes/confidentiels séparés.

## 6. Auth & sécurité
Supabase Auth si `VITE_SUPABASE_URL/ANON_KEY` configurés; sinon mode local de démonstration explicitement étiqueté (jamais présenté comme « production sécurisée »). Routes /admin protégées (garde + RLS côté base en production).

## 7. Fonctions: opérationnelles / incomplètes (après reconstruction, mode local)
Voir `docs/RAPPORT_TESTS.md` et fiche GO/NO-GO dans le Cockpit (score calculé sur contrôles réels, bloqueur C1 ⇒ NO-GO).

## 8. Plan priorisé
P0 Audit (ce document) → P1 Architecture (`docs/ARCHITECTURE.md`) → P2 Design system → P3 Site public →
P4 CMS (pages/projets/services/slides/équipe/médias, brouillon/publication, prévisualisation) →
P5 Données (couche Supabase-ready + persistance locale de repli, formulaires→messages→leads, newsletter, analytics) →
P6 Import médias (dry-run) → P7 Cockpit (readiness transparent) → P8 Qualité (typecheck/build/verify) → P9 Production (domaine/HTTPS à vérifier: NO-GO tant que non prouvés).
