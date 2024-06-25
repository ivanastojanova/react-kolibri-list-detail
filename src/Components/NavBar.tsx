import { KolNav } from "@public-ui/react";


const NavBar = () => {
 return (
    <KolNav
     aria-label="Main navigation"
     _orientation="horizontal"
     _links={[
       {
         _label: "Customers",
         _href: "/"
       },
       {
         _label: "Projects",
         _href: "/projects"
       },
       {
         _label: "Tickets",
         _href: "/tickets"
       },
     ]}
     _hasCompactButton _label={""}  />
 );
};

export default NavBar;