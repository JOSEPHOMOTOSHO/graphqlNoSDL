import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { gql, useQuery } from "@apollo/client";
import CreateStudent from "./CreateStudentForm";

const allStudents = gql`
  query allStudents {
    students {
      id
      age
      name
      class
    }
  }
`;

interface studentInterface {
  id: number;
  age: number;
  name: string;
  class: string;
}

function App() {
  const { data, loading, error } = useQuery(allStudents);

  if (loading) {
    return <>Data is loading</>;
  }

  if (error) return <>Error in getting data</>;

  const myStudents = data.students.map((student: studentInterface) => (
    <li key={student.id}>
      {student.name} is aged {student.age} and in class {student.class}
    </li>
  ));
  return (
    <div className="App">
      <header className="App-header">
        <p>Hello GraphQL + React!</p>
        <p>My Students</p>
        <ul>{myStudents}</ul>
        <CreateStudent />
      </header>
    </div>
  );
}

export default App;
