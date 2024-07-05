import { Button, TextField } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { User } from "../types/User";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    phone: "",
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user.name || !user.email || !user.phone) {
      toast.error("All fields are required");
      return;
    }

    if (user.phone.length !== 10)
      toast.error("Phone number should be 10 digits");

    if (user.name && user.email && user.phone.length === 10) {
      localStorage.setItem("user", JSON.stringify(user));

      setUser({
        name: "",
        email: "",
        phone: "",
      });

      toast.success("User created successfully");
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-4 bg-slate-100 shadow-md p-8 rounded-md">
          <div className="flex flex-col gap-1">
            <label>Name</label>
            <TextField
              size="small"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              type="text"
              placeholder="Eg: John Doe"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Email</label>
            <TextField
              size="small"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              type="email"
              placeholder="Eg: johndoe@me.com"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Phone Number</label>
            <TextField
              onError={() => setUser({ ...user, phone: "" })}
              size="small"
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              type="tel"
              placeholder="Eg: 1234567890"
            />
          </div>

          <Button type="submit" variant="contained">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
