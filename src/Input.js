import React, { useState } from "react";

const Input = ({ onSubmit }) => {
  // TODO move this in thr App because we will need it for external state
  const [item, setItem] = useState("");

  const handleClick = () => {
    if (item) onSubmit(item);
    setItem("");
  };

  const handleChange = (e) => {
    e.preventDefault();
    setItem(e.target.value);
  };

  return (
    <>
      <div>
        <input onChange={handleChange} placeholder="e.g. eggs" value={item} />
        <button type="submit" onClick={handleClick}>
          Submit
        </button>
      </div>
    </>
  );
};

export default Input;
