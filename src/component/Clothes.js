import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import "./Clothes.css";
import Footer from "./Footer";

function Clothes () {
  const [data, setData] = useState([]);

  let [btnContent, setBtnContent] = useState("Go to Women");
  let [switchCat, setSwitchCat] = useState("mens");

  let handleCategory = () => {
    if (btnContent === "Go to Women") {
      setBtnContent("Go to Men");
      setSwitchCat("womens");
    } else {
      setBtnContent("Go to Women");
      setSwitchCat("mens");
    }
  };

  useEffect(() => {
    fetch(`https://market-masters.000webhostapp.com/dashboard/api.php?category=${switchCat}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

  }, [switchCat]);

  return (
    <>
      <NavBar />
      <section className="clothesSec">
        <h1 className="title">Clothes</h1>
      </section>
      <section className="category">
        <div className="parentBtn">
          <button onClick={handleCategory} className="categoryBtn">
            {btnContent}
          </button>
        </div>
        <div className="cardsParnet">
          {data.map((product, index) => (
            <div className="card" key={index}>
              <img src={`https://market-masters.000webhostapp.com/dashboard/imgs/${product.image}`} alt="Product" />
              <p>{product.title}</p>
              <p>
                <span style={{ color: "#900C3F" }}>Price</span>: {product.price}
              </p>
              <p>
                <span style={{ color: "#900C3F" }}>Category</span>:{" "}
                {product.category}
              </p>
            </div>
          ))}
        </div>
        <Footer />
      </section>
    </>
  );
}

export default Clothes;
