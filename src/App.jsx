import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        console.log(data);
      });
  }, []);

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;

    const user = { name, email };

    fetch(`http://localhost:5000/users`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        e.target.reset(); // reset the form
      })
      .catch((err) => console.log(err));

    e.target.reset(); // reset the form
    console.log(user);
  };

  return (
    <section className="main-application-body">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          style={{ padding: "10px" }}
        />
        <br />
        <br />
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          style={{ padding: "10px" }}
        />
        <br />
        <br />
        <button style={{ border: "1px solid #ccc" }}>Submit</button>
      </form>

      <div className="users">
        <ul style={{ textAlign: "left" }}>
          {users.map((user) => (
            <li key={user._id}>
              <strong>{user.name}</strong> || {user.email}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default App;
