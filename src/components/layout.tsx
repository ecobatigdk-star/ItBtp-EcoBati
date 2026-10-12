import{useState}from'react';import{Link,NavLink,Outlet}from'react-router-dom';
export function PublicLayout(){const[open,setOpen]=useState(false);return(<>
<header className="top"><div className="wrap topbar">
<div className="brand">GDK ECOBATI<span className="dot">.</span><small>ARCHITECTS</small></div>
<button className="btn sm light burger" aria-label="Menu" onClick={()=>setOpen(!open)}>☰ Menu</button>
<nav className={"main"+(open?' open':'')} aria-label="Navigation principale">
<NavLink to="/">Accueil</NavLink><NavLink to="/a-propos">À propos</NavLink><NavLink to="/expertise">Expertise</NavLink><NavLink to="/projets">Projets</NavLink><NavLink to="/equipe">Équipe</NavLink><NavLink to="/contact">Contact</NavLink></nav>
<div className="brand it">ITBTP<small>CONSULTING SARL</small></div></div></header>
<main><Outlet/></main>
<footer><div className="wrap grid g3">
<div><h3>GDK ECOBATI ARCHITECTS</h3><p><a href="mailto:ecobatigdk@gmail.com">ecobatigdk@gmail.com</a><br/><a href="tel:+237679277610">+237 6 79 27 76 10</a><br/>Nsam, Yaoundé, Cameroun</p></div>
<div><h3>ITBTP CONSULTING SARL</h3><p><a href="mailto:itconsulting30@gmail.com">itconsulting30@gmail.com</a><br/><a href="tel:+237679956006">+237 679 956 006</a><br/>Nsam - Yaoundé, Cameroun</p></div>
<div><h3>Navigation</h3><p><Link to="/expertise">Expertises</Link><br/><Link to="/projets">Réalisations</Link><br/><Link to="/confidentialite">Confidentialité</Link><br/><Link to="/mentions-legales">Mentions légales</Link><br/><Link to="/admin">Administration</Link></p></div>
</div><div className="wrap muted" style={{marginTop:24,fontSize:13}}>© {new Date().getFullYear()} GDK ECOBATI ARCHITECTS &amp; ITBTP CONSULTING SARL — Yaoundé · Cameroun. Aucun contenu fictif: les fiches incomplètes restent en brouillon.</div></footer></>)}
