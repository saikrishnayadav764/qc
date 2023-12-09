import React from "react";
import Card from "./Card";
import "../styles/bar.css";
import { useState } from "react";

function Bar({ data, grouping, name }) {
  const reqkey = Object.keys(data)[0];
  const arrData = data[reqkey];
  const [cardsData, setCardsData] = useState(arrData);
  let count = arrData.length;
  const displayTop = () => {
    switch (grouping) {
      case "status": {
        return (
          <div className="barTopWrapper">
            <div className="barTopLeft">
              <p>
                <span className="material-symbols-outlined circtop">
                  radio_button_unchecked
                </span>
              </p>
              <p className="barName">{name}</p>
              <p>{count}</p>
            </div>
            <div className="barTopRight">
              <p>
                <span class="material-symbols-outlined">add</span>
              </p>
              <p>
                <span class="material-symbols-outlined">more_horiz</span>
              </p>
            </div>
          </div>
        );
      }

      case "userId": {
        return (
          <div className="barTopWrapper">
            <div
              style={{ display: "flex", alignItems: "center" }}
              className="barTopLeft"
            >
              <img className="profile" src="profile.png" />
              <p className="barName sameasname">{name}</p>
              <p className="sameasname">{count}</p>
            </div>
            <div className="barTopRight">
              <p>
                <span class="material-symbols-outlined">add</span>
              </p>
              <p>
                <span class="material-symbols-outlined">more_horiz</span>
              </p>
            </div>
          </div>
        );
      }

      case "priority": {
        return (
          <div className="barTopWrapper">
            <div
              style={{ display: "flex", alignItems: "center" }}
              className="barTopLeft"
            >
              <span class="material-symbols-outlined">more_horiz</span>
              <p className="barName">Priority-{name}</p>
              <p>{count}</p>
            </div>
            <div className="barTopRight">
              <p>
                <span class="material-symbols-outlined">add</span>
              </p>
              <p>
                <span class="material-symbols-outlined">more_horiz</span>
              </p>
            </div>
          </div>
        );
      }
    }
  };
  return (
    <div className="barindi">
      {displayTop()}
      {cardsData.map((data) => (
        <Card grouping={grouping} data={data} />
      ))}
    </div>
  );
}

export default Bar;
