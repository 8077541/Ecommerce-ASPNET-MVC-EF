import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NewOrder.css";

const NewOrder = () => {
  const [formFloor, setFormFloor] = useState(0);
  const [formApartament, setFormApartament] = useState(0);
  const [formStreet, setFormStreet] = useState("");
  const [formProvince, setFormProvince] = useState("");
  const [formCity, setFormCity] = useState("");
  const [value, setValue] = useState();
  const [menuId, setId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState();
  const [basket, setBasket] = useState([]);
  const [price, setPrice] = useState(0);

  async function handleSubmit() {
    console.log(price, typeof price);
    const mappedBasket = basket.forEach((x) => {
      delete x.basePrice;
      delete x.descirption;
      delete x.ingredients;
      delete x.name;
    });
    console.log(mappedBasket, basket);
    const json = JSON.stringify({
      city: formCity,
      province: formProvince,
      street: formStreet,
      apartament: formApartament,
      floor: formFloor,
      orderedPizzas: [...basket],
      paid: true,
      price: price,
    });
    await axios
      .post("http://localhost:5037/api/Order", json, {
        headers: {
          "Content-Type": "application/json",
          Accept: "text/plain",
        },
      })
      .then(function (response) {
        console.log(response);
      });
    setPrice(0);
    setBasket([]);
  }
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  function priceSetter(item) {
    setPrice(
      Number(item.size)
        ? price + item.basePrice * item.size
        : price + item.basePrice
    );
  }
  const showItem = (item) => {
    console.log(item);
  };
  const showBasket = () => {
    console.log(basket);
    console.log(formCity);
    console.log(price);
  };
  const addToBasket = (item) => {
    let newItem = JSON.parse(JSON.stringify(item));
    setBasket([...basket, newItem]);
    priceSetter(item);
  };
  const removeFromBasket = (item) => {
    setPrice(
      Number(item.size)
        ? price - item.basePrice * item.size
        : price - item.basePrice
    );
    const newBasket = basket.filter((i) => i !== item);

    setBasket(newBasket);
    console.log(basket);
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const response = await axios.get(
        `http://localhost:5037/api/Pizza/GetAll`
      );
      setMenu(response.data.data);
      console.log(menu);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return (
      <div id="loading">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <div className="orderBox">
      <div className="orderBoxOne">
        <ol type="a" className="orderedList">
          {menu
            ? menu.map((item) => (
                <li key={item.id} className="MenuItem">
                  <span id="menuId">{item.id}.</span>{" "}
                  <h1 id="menuName" onClick={() => showItem(item)}>
                    {item.name}
                  </h1>
                  <h2 id="menuDescription">{item.descirption}</h2>
                  <h2 id="menuPrice">
                    {item.basePrice * item.size
                      ? item.basePrice * item.size
                      : item.basePrice}
                    PLN
                  </h2>
                  <select
                    name="size"
                    id="menuSize"
                    onChange={(e) => {
                      item.size = e.target.value;
                      setValue(e.target.value);
                    }}
                  >
                    <option value="1">Small</option>
                    <option value="2">Medium</option>
                    <option value="3">Large</option>
                  </select>
                  <button id="menuButton" onClick={() => addToBasket(item)}>
                    +
                  </button>
                </li>
              ))
            : null}
        </ol>
      </div>
      <div className="orderBoxTwo">
        <div>
          <ol type="a" className="basket">
            {basket ? (
              basket.map((item) => (
                <li key={getRandomInt(1000)} className="basketItem">
                  <h1 id="basketName">{item.name}</h1>
                  <h2 id="basketPrice">
                    {item.basePrice * item.size
                      ? item.basePrice * item.size
                      : item.basePrice}{" "}
                    PLN
                  </h2>

                  <button
                    id="basketButton"
                    onClick={() => removeFromBasket(item)}
                  >
                    -
                  </button>
                </li>
              ))
            ) : (
              <h1>x</h1>
            )}
          </ol>{" "}
        </div>

        <div className="orderSumamry">
          <form className="addresForm" onSubmit={handleSubmit}>
            {" "}
            <label for="fname">City</label>
            <input
              type="text"
              pattern="[A-Za-z]{3}"
              id="fname"
              name="fname"
              onChange={(e) => {
                setFormCity(e.target.value);
              }}
            />
            <br></br>
            <label for="lname">Province</label>
            <input
              type="text"
              id="lname"
              name="lname"
              onChange={(e) => {
                setFormProvince(e.target.value);
              }}
            />
            <br></br>
            <label for="lname">Street</label>
            <input
              type="text"
              id="lname"
              name="lname"
              onChange={(e) => {
                setFormStreet(e.target.value);
              }}
            />
            <br></br>
            <label for="lname">Apartament</label>
            <input
              type="text"
              id="lname"
              name="lname"
              onChange={(e) => {
                setFormApartament(e.target.value);
              }}
            />
            <br></br>
            <label for="lname">Floor</label>
            <input
              type="text"
              id="lname"
              name="lname"
              onChange={(e) => {
                setFormFloor(e.target.value);
              }}
            />
            <input
              className="orderButton"
              type=""
              onClick={handleSubmit}
              value="Order"
            ></input>
          </form>
          <h1 className="totalPrice" onClick={() => showBasket()}>
            Total: {price} PLN
          </h1>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;