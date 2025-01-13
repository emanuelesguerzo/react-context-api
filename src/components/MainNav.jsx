import { NavLink } from "react-router-dom";
import { useContext } from "react";
import GlobalContext from "../contexts/GlobalContext";

function MainNav() {

    const globalProviderValue = useContext(GlobalContext);
    const {paths} = globalProviderValue;

    return (
        <nav>
            <ul >
                {paths.map((curItem, index) => (
                    <li key={index}>
                        <NavLink  to={curItem.path}>{curItem.title}</NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )

}

export default MainNav;