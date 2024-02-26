import React, { useState } from "react";
import { supabase } from "../lib/helper/supabaseClient";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const signIn = async () => {
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        throw error;
      }
      
      console.log("Signed in successfully:", user);
      alert("Signed in successfully!");

      // Redirect user to dashboard or desired page
      // Example: window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error signing in:", error.message);
      alert("Error signing in: " + error.message);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="button" onClick={signIn}>
          Sign In
        </button>
      </form>
    </div>
  );
}
