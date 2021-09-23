import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { gql, useQuery } from "@apollo/client";
import Form from "./newStudent";

const ALL_STUDENTS = gql`
  query ALL_STUDENTS {
    students {
      id
      name
      age
      class
    }
  }
`;

interface student {
  id: number;
  name: string;
  age: number;
  class: string;
}

function App() {
  const { data, loading, error } =
    useQuery<{ students: student[] }>(ALL_STUDENTS);

  if (loading) {
    return <>Loading information from server</>;
  }

  if (error) {
    // Todo: use an Error Boundary
    return <>There was an error - try again later</>;
  }

  const students = data!.students.map((student) => (
    <li key={student.id}>
      {student.name} aged {student.age} in {student.class}
    </li>
  ));

  return (
    <div className="App">
      <header className="App-header">
        <Form />
        <p>Hello GraphQl + React!</p>
        <ul>{students}</ul>
      </header>
    </div>
  );
}

export default App;
