import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NewOrder.css";

const NewOrder = () => {
  const [value, setValue] = useState();
  const [menuId, setId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState();
  const [basket, setBasket] = useState([]);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const showItem = (item) => {
    console.log(item);
  };
  const showBasket = () => {
    console.log(basket);
  };
  const addToBasket = (item) => {
    let newItem = JSON.parse(JSON.stringify(item));
    setBasket([...basket, newItem]);
  };
  const removeFromBasket = (item) => {
    const newBasket = basket.filter((i) => i !== item);

    setBasket(newBasket);
    console.log(basket);
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      // await axios
      //   .get(`http://localhost:5037/api/Pizza/GetAll`)
      //   .then((res) => {
      //     setMenu(res.data.data);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      // console.log(menu);
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
          <form className="addresForm">
            {" "}
            <label for="fname">City</label>
            <input type="text" id="fname" name="fname" />
            <br></br>
            <label for="lname">Province</label>
            <input type="text" id="lname" name="lname" />
            <br></br>
            <label for="lname">Street</label>
            <input type="text" id="lname" name="lname" />
            <br></br>
            <label for="lname">Apartament</label>
            <input type="text" id="lname" name="lname" />
            <br></br>
            <label for="lname">Floor</label>
            <input type="text" id="lname" name="lname" />
            <input className="orderButton" type="submit" value="Order"></input>
          </form>
          <h1 className="totalPrice" onClick={() => showBasket()}>
            Total:{" "}
            {basket.reduce(
              (a, b) =>
                Number(b.size) ? a + b.basePrice * b.size : a + b.basePrice,
              0
            )}{" "}
            PLN
          </h1>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;