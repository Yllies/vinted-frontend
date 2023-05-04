import { useEffect, useState } from "react";
import axios from "axios";
import logo from "../logo.png";
import OfferCard from "../components/OfferCard";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <header>
        <img src={logo} alt="logo vinted" />
      </header>

      <div className="home-cards">
        {data.offers.map((offer) => {
          return <OfferCard key={offer._id} offerData={offer} />;
        })}
      </div>
    </>
  );
};

export default Home;
