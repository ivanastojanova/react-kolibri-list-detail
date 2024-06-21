import { KolNav } from "@public-ui/react";


const NavBar = () => {
 return (
    <KolNav
    _ariaLabel="Main navigation"
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
    _hasCompactButton
  />
 );
};

export default NavBar;