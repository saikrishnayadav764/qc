import React from "react";
import "../styles/card.css";
const data = {
  id: "CAM-1",
  title: "Update User Profile Page UI",
  tag: ["Feature request"],
  userId: "usr-1",
  status: "Todo",
  priority: 4,
};
function Card({ data, grouping }) {
  const ispriority = grouping === "priority";
  return (
    <div className="card">
      <div className="cardtop">
        <p>{data.id}</p>
        {grouping !== "userId" && <img className="profile" src="profile.png" />}
      </div>
      <div className="cardmid">
        {grouping === "priority" && <img className="circ" src="cutload.png" />}
        {grouping === "userId" && <img className="circ" src="tick.png" />}
        <p className="title">{data.title}</p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: `${ispriority ? "flex-start" : "space-between"}`,
        }}
        className="carddown"
      >
        <div>
          <p>
            {grouping === "status" && (
              <span
                style={{ color: "grey", marginTop: "3.6px" }}
                class="material-symbols-outlined"
              >
                more_horiz
              </span>
            )}
            {grouping === "userId" && (
              <span class="material-symbols-outlined">more_horiz</span>
            )}
          </p>
        </div>

        
        <br />
        <br />

        <div className="carddowntag">
          <div>
            <img className="circ spec" src="feature.png" />
          </div>
          <p className="fr">{data.tag[0]}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
