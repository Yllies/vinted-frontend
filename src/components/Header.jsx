import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="logo vinted" />
      </Link>
      <button>S'inscrire</button>
      <button>Se connecter</button>
    </header>
  );
};

export default Header;
