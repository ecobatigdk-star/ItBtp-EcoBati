// Couche données — source de vérité locale de repli, Supabase-ready (voir supabase.ts + migrations).
// En production: brancher VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY; aucune service_role côté navigateur.
export type Status='draft'|'published';
export interface Section{id:string;page:string;type:string;title:string;subtitle?:string;body?:string;image?:string;ctaLabel?:string;ctaHref?:string;order:number;visible:boolean;status:Status}
export interface PageDef{slug:string;title:string;route:string;source:string;cls:string;note:string}
export interface Service{id:string;title:string;desc:string;entity:string;category:string;image?:string;order:number;status:Status}
export interface Project{id:string;code:string;type:string;location?:string;title:string;desc:string;category:string;year?:string;status:string;entity:string;image?:string;gallery:string[];video?:string;visible:boolean;featured:boolean;order:number;problem?:string;intervention?:string;result?:string}
export interface Slide{id:string;kicker:string;title:string;hook:string;desc:string;image?:string;cta1:string;cta2:string;order:number;visible:boolean;status:Status}
export interface Member{id:string;name:string;role:string;bio:string;photo?:string;entity:string;order:number;status:Status}
export interface MediaItem{id:string;projectId?:string;projectCode?:string;folder:string;filename:string;mime:string;size:number;url?:string;visibility:'public'|'internal'|'confidential';createdAt:string}
export interface Message{id:string;name:string;email:string;phone?:string;company?:string;structure:string;requestType:string;subject:string;message:string;status:string;source:string;createdAt:string}
export interface Lead{id:string;name:string;email:string;phone?:string;stage:string;notes:string;sourceMessageId?:string;createdAt:string}
export interface Subscriber{id:string;email:string;status:string;createdAt:string}
export interface AEvent{id:string;type:string;page:string;createdAt:string}
export interface DB{sections:Section[];services:Service[];projects:Project[];slides:Slide[];members:Member[];media:MediaItem[];messages:Message[];leads:Lead[];subscribers:Subscriber[];events:AEvent[];admin?:{email:string;pass:string}}

export const PAGES:PageDef[]=[
 {slug:'home',title:'Accueil',route:'/',source:'page_sections + slides + tables métier',cls:'A — CMS complet',note:'Sections éditables ci-dessous; hero piloté par le Diaporama, projets/services par leurs gestionnaires.'},
 {slug:'about',title:'À propos',route:'/a-propos',source:'page_sections(slug=about)',cls:'A — CMS complet',note:'Aucune histoire/date/chiffre inventé: complétez uniquement les informations validées.'},
 {slug:'expertise',title:'Expertise',route:'/expertise',source:'table métier services',cls:'C — Alimentée par table métier',note:'Cette page était « vide » dans l\u2019ancien Admin car son contenu vit dans Services, pas dans les sections. Gérez-la via le gestionnaire Services.'},
 {slug:'projets',title:'Projets',route:'/projets',source:'table métier projects + media',cls:'C — Alimentée par table métier',note:'Même cause: contenu dans Projets/Médias. Aucun éditeur de sections n\u2019est attendu ici.'},
 {slug:'equipe',title:'Équipe',route:'/equipe',source:'table team_members',cls:'C — Alimentée par table métier',note:'Aucun membre fictif: la page affiche un état vide élégant tant qu\u2019aucun membre validé n\u2019est publié.'},
 {slug:'contact',title:'Contact',route:'/contact',source:'configuration validée + contact_messages',cls:'D — Principalement statique',note:'Coordonnées figées (validées). Le formulaire écrit réellement dans Messages → Leads.'},
];
const uid=()=>Math.random().toString(36).slice(2,10);
export const genTitle=(code:string,type:string,loc?:string)=> loc?`${code}_${type.toUpperCase().replace(/\s+/g,'_')}_${loc.toUpperCase()}`:`${code}_${type.toUpperCase().replace(/\s+/g,'_')}`;
const SEED:DB={
 sections:[
  {id:uid(),page:'home',type:'intro',title:'Un écosystème, deux expertises complémentaires',subtitle:'GDK ECOBATI ARCHITECTS & ITBTP CONSULTING SARL',body:'GDK ECOBATI conçoit, étudie et coordonne. ITBTP CONSULTING réalise, exécute et intègre les solutions techniques. Deux identités distinctes, une exigence commune: des projets accompagnés de la conception architecturale à la réalisation opérationnelle, au Cameroun.',ctaLabel:'Découvrir nos expertises',ctaHref:'/expertise',order:1,visible:true,status:'published'},
  {id:uid(),page:'home',type:'method',title:'Approche & méthode',body:'Écoute et cadrage, conception et études, coordination, réalisation et suivi opérationnel. Chaque étape est documentée; un projet en cours n\u2019est jamais présenté comme une réalisation terminée.',order:2,visible:true,status:'published'},
  {id:uid(),page:'home',type:'cta',title:'Parlons de votre projet',body:'Décrivez votre besoin: nous revenons vers vous après étude de votre demande.',ctaLabel:'Prendre contact',ctaHref:'/contact',order:3,visible:true,status:'published'},
  {id:uid(),page:'about',type:'intro',title:'À propos',subtitle:'GDK ECOBATI ARCHITECTS & ITBTP CONSULTING SARL',body:'Architecture, études et coordination d\u2019un côté; bâtiment, travaux publics, exécution et solutions techniques de l\u2019autre. Cette page ne contient que des informations institutionnelles validées — historique, fondateurs et chiffres clés restent à compléter par la direction avant publication définitive.',order:1,visible:true,status:'draft'},
 ],
 services:[
  ['Architecture & conception','Conception architecturale et accompagnement de projets, avec une réflexion spatiale adaptée au contexte.','GDK ECOBATI','Architecture'],
  ['Études & ingénierie','Études techniques et ingénierie en appui de la conception et de la coordination.','GDK ECOBATI','Études'],
  ['Bâtiment & travaux publics','Construction, exécution et suivi opérationnel de chantiers.','ITBTP','Construction'],
  ['Réhabilitation & rénovation','Réhabilitation et rénovation, de l\u2019étude à la réalisation.','GDK ECOBATI × ITBTP','Rénovation'],
  ['Solutions numériques','Solutions numériques et intégration de solutions technologiques.','ITBTP','Numérique'],
  ['Sécurité & systèmes de surveillance','Sécurité et systèmes techniques de surveillance.','ITBTP','Sécurité'],
  ['Sécurité numérique','Sécurité numérique des systèmes et des données.','ITBTP','Sécurité'],
 ].map((s,i)=>({id:uid(),title:s[0],desc:s[1],entity:s[2],category:s[3],order:i+1,status:'published' as Status})),
 projects:[
  // Projets seedés UNIQUEMENT avec les codes/lieux explicitement validés par le Master Prompt, en brouillon (fiches honnêtes, à compléter).
  ...[['PRJ-010','Appartement','NKOLNDA'],['PRJ-012','Église','MVAN'],['PRJ-014','Bureau','ODZA'],['PRJ-019','École bilingue','KOABANG'],['PRJ-022','Immeuble R3','OLEMBE'],['PRJ-023','Villa','KONDENGUI']].map((p,i)=>({id:uid(),code:p[0],type:p[1],location:p[2],title:genTitle(p[0],p[1],p[2]),desc:'Fiche à compléter et valider avant publication (description, année, statut et visuels réels à confirmer).',category:p[1],status:'À compléter',entity:'À confirmer',gallery:[],visible:false,featured:false,order:i+1}))
 ],
 slides:[{id:uid(),kicker:'GDK ECOBATI ARCHITECTS & ITBTP CONSULTING SARL',title:'Concevoir. Construire. Transformer.',hook:'De la conception architecturale à la réalisation opérationnelle, nous réunissons expertise, ingénierie et solutions techniques pour accompagner les projets au Cameroun.',desc:'Une approche intégrée associant architecture, études, construction, solutions techniques et suivi opérationnel. — Yaoundé · Cameroun',cta1:'Parlons de votre projet',cta2:'Voir nos réalisations',order:1,visible:true,status:'draft'}],
 members:[],media:[],messages:[],leads:[],subscribers:[],events:[]};
const KEY='ecobati_db_v1';
export function loadDB():DB{try{const r=localStorage.getItem(KEY);if(r)return{...SEED,...JSON.parse(r)}}catch{}return structuredClone(SEED)}
export function saveDB(db:DB){localStorage.setItem(KEY,JSON.stringify(db));window.dispatchEvent(new Event('db'))}
export function track(type:string,page:string){const db=loadDB();db.events.push({id:uid(),type,page,createdAt:new Date().toISOString()});saveDB(db)}
export const newId=uid;
export function readiness(db:DB){
 const pub=(a:any[])=>a.filter(x=>x.status==='published');
 const checks=[
  {id:'slides',label:'Au moins 1 slide publiée avec visuel validé',ok:pub(db.slides).some(s=>s.image),sev:'C1',hint:'Diaporama: ajoutez un visuel réel validé puis publiez.',href:'/admin/slides'},
  {id:'services',label:'Services publiés (7 de référence)',ok:pub(db.services).length>=7,sev:'C2',hint:'Expertise: publiez les 7 services.',href:'/admin/services'},
  {id:'projects',label:'Au moins 1 projet publié avec image principale réelle',ok:db.projects.some(p=>p.visible&&p.image),sev:'C1',hint:'Projets: complétez une fiche, rattachez un visuel réel, publiez.',href:'/admin/projets'},
  {id:'pages',label:'Sections Accueil publiées',ok:db.sections.some(s=>s.page==='home'&&s.status==='published'),sev:'C2',hint:'Pages: vérifiez les sections Accueil.',href:'/admin/pages'},
  {id:'about',label:'Page À propos validée (brouillon levé après relecture)',ok:db.sections.some(s=>s.page==='about'&&s.status==='published'),sev:'C3',hint:'Pages → À propos: relisez puis publiez.',href:'/admin/pages'},
  {id:'media',label:'Médias rattachés par project_id (jamais folder seul)',ok:db.media.length===0||db.media.every(m=>m.projectId),sev:'C1',hint:'Médias: tout média projet doit avoir un project_id résolu.',href:'/admin/medias'},
  {id:'supabase',label:'Supabase configuré (Auth + RLS + Storage)',ok:!!(import.meta.env.VITE_SUPABASE_URL&&import.meta.env.VITE_SUPABASE_ANON_KEY),sev:'C1',hint:'Production: renseignez VITE_SUPABASE_* et exécutez les migrations vérifiées.',href:'/admin/parametres'},
  {id:'domain',label:'Domaine ecobati-itbtp.com + HTTPS vérifiés',ok:false,sev:'C1',hint:'Vérification externe impossible ici: contrôler DNS/HTTPS avant GO.',href:'/admin/parametres'},
  {id:'forms',label:'Formulaire Contact testé de bout en bout (message reçu en Admin)',ok:db.messages.length>0,sev:'C2',hint:'Contact: envoyez un message de test et vérifiez-le dans Messages.',href:'/admin/messages'},
  {id:'team',label:'Équipe: membres validés publiés (ou section masquée assumée)',ok:true,sev:'C3',hint:'État vide élégant accepté tant qu\u2019aucun membre validé.',href:'/admin/equipe'},
 ];
 const w:{[k:string]:number}={C1:3,C2:2,C3:1};const tot=checks.reduce((a,c)=>a+w[c.sev],0);const got=checks.reduce((a,c)=>a+(c.ok?w[c.sev]:0),0);
 const score=Math.round(got/tot*100);const blockers=checks.filter(c=>!c.ok&&c.sev==='C1');
 return{checks,score,verdict:blockers.length?'NO-GO':(score>=85?'GO':'GO AVEC RÉSERVES'),blockers};
}
