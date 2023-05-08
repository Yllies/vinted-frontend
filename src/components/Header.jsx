import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ handleToken, token, search, setSearch }) => {
  const navigate = useNavigate();

  // const { title } = useParams();
  return (
    <header>
      <Link to="/">
        <img src={logo} alt="logo vinted" />
      </Link>
      {token ? (
        <>
          <button
            onClick={() => {
              handleToken(null);
              navigate("/signup");
            }}
          >
            Déconnexion
          </button>
          <input
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            value={search}
            type="text"
            placeholder="Recherche des articles"
          />
          <Link to="/publish">
            <button>Vends tes articles</button>
          </Link>
        </>
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
