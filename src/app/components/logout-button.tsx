"use client";

import { signOut } from "next-auth/react";

import { MdLogout } from "react-icons/md";

export default function LogoutButton() {
  return (
    <button
      className="flex flex-row justify-center items-center"
      onClick={() => signOut()}
    >
      <MdLogout size={30} className="hover:text-gray-300" />
    </button>
  );
}
