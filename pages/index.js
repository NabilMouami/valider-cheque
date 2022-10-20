import { useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post("/api/signin", user).then((res) => {
      Cookie.set("emailamal", res.data[0].email);

      router.push("/post");
    });
  };

  return (
    <div className="login">
      <h3>user login</h3>
      <form onSubmit={submitHandler}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Password"
            name="password"
          />
        </div>
        <button type="submit" className="btn">
          login
        </button>
      </form>
    </div>
  );
}
