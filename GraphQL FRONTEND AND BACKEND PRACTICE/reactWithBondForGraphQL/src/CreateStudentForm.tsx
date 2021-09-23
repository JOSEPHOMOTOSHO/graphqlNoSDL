import React, { FC, useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";

const CREATE_STUDENT = gql`
  mutation CreateStudent(
    $fullname: String!
    $gender: String!
    $age: Int!
    $class: String!
  ) {
    createStudent(
      newStudent: {
        fullname: $fullname
        gender: $gender
        age: $age
        class: $class
      }
    ) {
      name
      gender
      age
      class
      id
    }
  }
`;

function CreateStudent() {
  let [fullname, setfullname] = useState("");
  let [gender, setGender] = useState("");
  let [age, setAge] = useState(0);
  let [classInput, setclassInput] = useState("");

  const [createStudentFunction, { data, loading, error }] = useMutation(
    CREATE_STUDENT,
    {
      variables: {
        fullname,
        gender,
        age,
        class: classInput,
      },
    }
  );

  function handleSubmit(event: any) {
    event.preventDefault();
    console.log("submit working");
    createStudentFunction();
  }
  if (loading) return <>"Submitting..."</>;
  if (error) return <>`Submission error! ${error.message}`</>;

  return (
    <div style={{ width: "80%" }}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fullname">
          <input
            type="text"
            id="fullname"
            placeholder="Enter fullname"
            name="fullname"
            onChange={(e) => setfullname(e.currentTarget.value)}
            required
            style={{ height: "29px" }}
          />
        </label>

        <label htmlFor="gender">
          <input
            type="text"
            id="gender"
            placeholder="Enter gender"
            name="gender"
            onChange={(e) => setGender(e.currentTarget.value)}
            required
            style={{ height: "29px" }}
          />
        </label>

        <label htmlFor="age">
          <input
            onChange={(e) => setAge(+e.currentTarget.value)}
            type="number"
            id="age"
            placeholder="Enter age"
            name="age"
            style={{ height: "29px" }}
            required
          />
        </label>

        <label htmlFor="class">
          <input
            type="text"
            id="class"
            placeholder="Enter class"
            name="class"
            onChange={(e) => setclassInput(e.currentTarget.value)}
            required
            style={{ height: "29px" }}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default CreateStudent;
