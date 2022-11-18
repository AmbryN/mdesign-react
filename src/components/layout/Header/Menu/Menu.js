import {Navbar} from "react-bootstrap";
import {Nav} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';

const links = [
    {name: "Accueil", path: "/"},
    {name: "Événements", path: "/events"},
    {name: "Données", path: "/data"},
]

function Menu() {
    return (
        <Navbar.Collapse>
            <Nav variant="pills">
                {links.map((link, index) => {
                        return (
                            <LinkContainer key={index} to={link.path}>
                                <Nav.Link>{link.name}</Nav.Link>
                            </LinkContainer>
                        )
                    }
                )}
            </Nav>
        </Navbar.Collapse>
    );
}

export default Menu;
