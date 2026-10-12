import fs from 'node:fs'; const must=['src/lib/db.ts','src/pages/public/Public.tsx','src/pages/admin/Admin.tsx','supabase/migrations/001_schema_rls.sql','public/robots.txt','public/sitemap.xml','docs/AUDIT_PHASE0.md'];
let fail=0; for(const f of must){console.log((fs.existsSync(f)?'PASS':'FAIL')+' '+f); if(!fs.existsSync(f))fail=1}
const db=fs.readFileSync('src/lib/db.ts','utf8'); console.log((db.includes('PRJ-023')&&db.includes('KONDENGUI')?'PASS':'FAIL')+' codes PRJ validés présents'); console.log((/jamais/i.test(db)?'PASS':'FAIL')+' règles de protection documentées dans le code');
process.exit(fail);
