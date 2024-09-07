"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import BackdropWithLoading from "./backdrop-loading";

export default function SigninButton() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      signIn("github");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      className="p-3 flex flex-row justify-center items-center gap-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
      onClick={handleLogin}
    >
      <span className="text-2xl">Entrar com GitHub</span>
      <FaGithub size={30} />
      <BackdropWithLoading isLoading={loading} />
    </button>
  );
}
