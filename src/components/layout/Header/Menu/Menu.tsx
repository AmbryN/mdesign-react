import { Link } from "react-router-dom";

function Menu() {
  const links = [
    { name: "Accueil", path: "/" },
    { name: "Événements", path: "/events" },
    { name: "Types d'événements", path: "/types" },
    { name: "Adresses", path: "/addresses" },
  ];

  return (
    <ul className="flex items-center m-0 text-white list-unstyled">
      {links.map((link, index) => {
        return (
          <Link key={index} to={link.path}>
            <li className="m-2 bg-blue-900 p-2 rounded">{link.name}</li>
          </Link>
        );
      })}
    </ul>
  );
}

export default Menu;
