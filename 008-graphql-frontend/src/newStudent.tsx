import React from "react";
export default function Form() {
  return (
    <>
      <form action="">
        <label>
          <input type="text" name="name" placeholder="Name" />
        </label>
        <label>
          <input type="text" name="Class" placeholder="Class" />
        </label>
        <label>
          <input type="text" name="Gender" placeholder="Gender" />
        </label>
        <label>
          <input type="text" name="House" placeholder="House" />
        </label>
        <label>
          <input type="text" name="name" placeholder="Age" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}
