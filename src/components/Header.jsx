import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = ({ handleToken, token }) => {
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="logo vinted" />
      </Link>
      {token ? (
        <button
          onClick={() => {
            handleToken(null);
          }}
        >
          Déconnexion
        </button>
      ) : (
        <>
          <Link to="/signup">
            <button>S'inscrire</button>
          </Link>
          <Link to="/login">
            <button>Se connecter</button>
          </Link>
          {/* {console.log()} */}
          {}
        </>
      )}
    </header>
  );
};

export default Header;
