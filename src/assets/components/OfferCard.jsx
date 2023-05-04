const OfferCard = ({ offerData }) => {
  const { owner, product_image, product_price, product_details } = offerData;
  return (
    <article key={offerData._id}>
      {/* {console.log(offer.owner.account.avatar)} */}
      <div className="avatar-username">
        {owner.account.avatar && (
          <img
            className="avatar"
            src={owner.account.avatar.secure_url}
            alt=""
          />
        )}
        <p>{owner.account.username}</p>
      </div>

      <img src={product_image.secure_url} alt="" />
      <p>{product_price} €</p>
      {/* <p>{offer.product_details}</p> */}
      {product_details.map((detail, index) => {
        if (detail.TAILLE) {
          return <p key={index}>{detail.TAILLE}</p>;
        } else if (detail.MARQUE) {
          <p>{detail.MARQUE}</p>;
        } else {
          return null;
        }
      })}
    </article>
  );
};
export default OfferCard;
