import React, { useMemo, useState } from "react";
import "./styles.css";

const MIN_LIMIT = 2;
const MAX_LIMIT = 20000;

export default function App() {
  const [limit, setLimit] = useState(100);

  const handleChangeLimit = (event) => {
    const newLimit = Math.min(
      Math.max(Number(event.target.value), MIN_LIMIT),
      MAX_LIMIT
    );
    setLimit(newLimit);
  };

  const numbers = useMemo(() => {
    const sqrtOfLimit = Math.sqrt(limit);

    let result = Object.fromEntries(
      [...new Array(limit - 1)].map((value, index) => [index + 2, true])
    );

    for (let number = 2; number < sqrtOfLimit; number++) {
      let target = number * number;

      while (target <= limit) {
        result[target] = false;
        target += number;
      }
    }

    return result;
  }, [limit]);

  return (
    <div className="App">
      <input
        type="number"
        min={MIN_LIMIT}
        value={limit}
        onChange={handleChangeLimit}
      />
      <br />
      {Object.entries(numbers).map(([number, value]) => (
        <div key={number} className={`number number--${value.toString()}`}>
          {number}
        </div>
      ))}
    </div>
  );
}
