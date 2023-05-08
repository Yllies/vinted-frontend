import { useEffect, useState } from "react";
import axios from "axios";
// import logo from "../logo.png";
import OfferCard from "../../components/OfferCard";

const Home = ({ search }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [search]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="home-cards">
      {console.log(search)}

      {data.offers.map((offer) => {
        return <OfferCard key={offer._id} offerData={offer} />;
      })}
    </div>
  );
};

export default Home;
