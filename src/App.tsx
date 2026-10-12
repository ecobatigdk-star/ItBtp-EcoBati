import{Routes,Route,Navigate}from'react-router-dom';import{PublicLayout}from'./components/layout';
import{Home,About,Services,Projects,ProjectDetail,Team,Contact,Legal,NotFound}from'./pages/public/Public';
import{Login,AdminLayout,Cockpit,PagesAdmin,SlidesAdmin,ProjectsAdmin,ServicesAdmin,TeamAdmin,MediaAdmin,MessagesAdmin,LeadsAdmin,Settings,isAuth}from'./pages/admin/Admin';
export default function App(){return(<Routes>
<Route element={<PublicLayout/>}><Route index element={<Home/>}/><Route path="a-propos" element={<About/>}/><Route path="expertise" element={<Services/>}/><Route path="projets" element={<Projects/>}/><Route path="projets/:code" element={<ProjectDetail/>}/><Route path="equipe" element={<Team/>}/><Route path="contact" element={<Contact/>}/><Route path="confidentialite" element={<Legal t="Politique de confidentialité"/>}/><Route path="mentions-legales" element={<Legal t="Mentions légales"/>}/><Route path="*" element={<NotFound/>}/></Route>
<Route path="/admin/login" element={<Login/>}/>
<Route path="/admin" element={<AdminLayout/>}><Route index element={<Cockpit/>}/><Route path="pages" element={<PagesAdmin/>}/><Route path="slides" element={<SlidesAdmin/>}/><Route path="projets" element={<ProjectsAdmin/>}/><Route path="services" element={<ServicesAdmin/>}/><Route path="equipe" element={<TeamAdmin/>}/><Route path="medias" element={<MediaAdmin/>}/><Route path="messages" element={<MessagesAdmin/>}/><Route path="leads" element={<LeadsAdmin/>}/><Route path="parametres" element={<Settings/>}/></Route>
</Routes>)}
