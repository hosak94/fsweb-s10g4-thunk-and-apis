import React, { useState } from "react";

function Item({ data }) {
  const [visible, setvisible] = useState(false);

  return (
    <div
      onClick={() => setvisible(!visible)}
      className="shadow-md bg-white text-center"
    >
      <p className="text-2xl p-10">{data.setup}</p>
      {visible && <p className="text-2xl p-10">{data.punchline}</p>}
    </div>
  );
}

export default Item;
