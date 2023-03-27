import React, { useState } from "react";

export const Form = ({
  handleSubmit,
  defaultValue = "",
  buttonLabel = "Add Task",
}) => {
  const [todo, setTodo] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(todo);
    e.target.reset();
    setTodo("");
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <input
        type="text"
        defaultValue={defaultValue}
        placeholder="what to do?"
        onChange={(e) => setTodo(e.target.value)}
      ></input>
      <button className="add">{buttonLabel}</button>
    </form>
  );
};
