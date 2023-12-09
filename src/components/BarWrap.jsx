import React from "react";
import Bar from "./Bar";
import "../styles/barwrap.css";

function BarWrap({ data, grouping }) {
  return (
    <div className="BarWrap">
      {data.map((data, ind) => (
        <Bar
          data={data}
          key={ind}
          grouping={grouping}
          name={Object.keys(data)[0]}
        />
      ))}
    </div>
  );
}

export default BarWrap;
