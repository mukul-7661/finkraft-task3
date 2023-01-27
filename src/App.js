import { useState } from "react";
import "./App.css";

function App() {
  // var firebaseRef = app.database().ref("emails");

  const [details, setDetails] = useState({
    gender: "",
    location: "",
    name: "",
  });

  const submitHandler = async (event) => {
    event.preventDefault();

    const { gender, location, name } = details;

    const res = await fetch(
      "https://finkraft-task-default-rtdb.firebaseio.com/details.json",
      {
        method: "POST",
        body: JSON.stringify({
          gender,
          location,
          name,
        }),
      }
    );

    setDetails({
      gender: "",
      location: "",
      name: "",
    });
  };

  return (
    <div className="App">
      <form onSubmit={submitHandler} type="submit">
        <label for="gender">Enter gender</label>

        <input
          onChange={(e) => {
            setDetails({ ...details, gender: e.target.value });
          }}
          value={details.gender}
          id="gender"
        ></input>
        <label for="location">Enter location</label>
        <input
          onChange={(e) => {
            setDetails({ ...details, location: e.target.value });
          }}
          id="location"
          value={details.location}
        ></input>
        <label for="name">Enter name:</label>
        <input
          onChange={(e) => {
            setDetails({ ...details, name: e.target.value });
          }}
          id="name"
          value={details.name}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
