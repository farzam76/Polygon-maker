import { useAppDispatch, useAppSelector } from "hooks";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../store/AuthenticationReducer";
import { genUniqueId } from "utils";
import { addGlobalUser } from "modules/global/GlobalReducer";
import { appRoutes } from "routes";

export const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const users = useAppSelector((state) => state.global.users);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation logic
    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill in all fields.");
    } else if (users.find((user) => user.username === formData.username)) {
      setError("Username already exists.");
    } else {
      // Clear any previous error message
      setError("");
      const userData = { id: genUniqueId(), ...formData, projectIds: [] };
      // Proceed with sign-up or other actions
      dispatch(signup(userData));
      dispatch(addGlobalUser(userData));
      navigate(appRoutes.PROJECT_ROUTE);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Signup</h2>

        <div className="mb-4 form-inline">
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleInputChange}
            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Sign Up
        </button>
        <Link to={appRoutes.LOGIN_ROUTE} className="text-blue-500 text-sm mt-4">
          Already have an account?
        </Link>
      </form>
    </div>
  );
};
