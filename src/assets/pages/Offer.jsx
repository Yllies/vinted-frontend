import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { useEffect, useState } from "react";
const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <article>
      <img src={data.product_image.secure_url} alt="" />
      {data.product_details.map((detail, index) => {
        const keyName = Object.keys(detail)[0];

        return (
          <div key={index}>
            <span key={index}>{keyName} : </span>
            <span>{detail[keyName]}</span>
          </div>
        );
      })}
      <div>
        <h1>{data.product_price} €</h1>
        <p>{data.product_name}</p>
        <p>{data.product_description}</p>
        <p>{data.owner.account.username}</p>
      </div>
      {console.log(data)}
      <button
        onClick={() => {
          navigate("/payment", {
            state: {
              price: data.product_price,
              title: data.product_name,
              description: data.product_description,
              username: data.owner.account.username,
            },
          });
        }}
      >
        Payer
      </button>
    </article>
  );
};

export default Offer;
