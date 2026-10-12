// Import médias — dry-run par défaut, SANS écriture. Usage: node scripts/import-media.mjs --dry-run <dossier> [mapping.json]
// Règles: résoudre PRJ-XXX dans projects.code -> projects.id; arrêter si introuvable; jamais project_id=NULL;
// ne supprime rien, n'écrase rien, conserve extensions et doublons jusqu'à décision explicite.
import fs from 'node:fs'; import path from 'node:path';
const dry=!process.argv.includes('--write'); const dir=process.argv.find(a=>!a.startsWith('--')&&a!==process.argv[0]&&a!==process.argv[1]);
const mappingFile=process.argv.find(a=>a.endsWith('.json')); const projects=mappingFile?JSON.parse(fs.readFileSync(mappingFile,'utf8')):[];
if(!dir||!fs.existsSync(dir)){console.log('Dossier introuvable ou non accessible:',dir||'(aucun)','— aucun import inventé.');process.exit(0)}
for(const f of fs.readdirSync(dir)){const m=f.match(/(PRJ-\d+)/i); if(!m){console.log('SKIP (aucun code PRJ, rattachement refusé):',f);continue}
 const p=projects.find(x=>x.code===m[1].toUpperCase()); if(!p){console.log('STOP fichier (projet introuvable, pas de NULL):',f);continue}
 console.log(`${dry?'DRY-RUN':'WRITE'} ${f} -> project_id=${p.id} (${p.code})${/\.pdf$/i.test(f)?' [PDF: classer PLAN/DEVIS/DOC + visibilité à valider, jamais public par défaut]':''}`)}
console.log(dry?'Dry-run terminé: aucune écriture effectuée.':'Mode write: brancher ici l\u2019upload Storage site-media + insert media (clé service uniquement côté serveur/CLI, jamais navigateur).');
