import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Login from "./Login";
// import Cookies from "js-cookie";

const Signup = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const navigate = useNavigate();

  return (
    <div>
      <h1>S'inscrire</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setErrorMsg("");
          try {
            const response = await axios.post(
              "https://lereacteur-vinted-api.herokuapp.com/user/signup",
              {
                username: username,
                email: email,
                password: password,
                newsletter: newsletter,
              }
            );

            if (response.data.token) {
              handleToken(response.data.token);
              // console.log(response.data.token);
              navigate("/");
            }
          } catch (error) {
            if (error.response.status === 409) {
              setErrorMsg(
                "Cet email est déjà utilisé, veuillez en choisir un autre"
              );
            } else if (error.response.data.message === "Missing parameters") {
              setErrorMsg("Veuillez remplir tous les champs");
            }
          }
        }}
      >
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          value={username}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          value={email}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          value={password}
        />
        <input
          type="checkbox"
          onClick={(event) => {
            setNewsletter(!newsletter);
          }}
          value={newsletter}
        />
        <button type="submit">S'inscrire</button>
        {errorMsg && <p>{errorMsg}</p>}
        <Link to="/login" element={<Login />}>
          <p>Tu as déjà un compte ? Connecte toi !</p>
        </Link>
      </form>
    </div>
  );
};

export default Signup;
