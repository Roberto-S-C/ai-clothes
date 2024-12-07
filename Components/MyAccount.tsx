import { useRouter } from "next/navigation";
import React from "react";
import { useCookies } from "react-cookie";

function MyAccount({ user }) {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <p className="font-bold text-xl">Username: {user.username}</p>
      <p className="font-bold text-xl">Email: {user.email}</p>
      <button
        onClick={() => {
          removeCookie("token", { path: "/" });
          router.replace("/login");
        }}
        className="flex justify-center text-xl text-black w-1/2 font-bold text-md bg-yellow-300 p-2 rounded-md hover:bg-black hover:text-yellow-300 m-3"
      >
        Logout
      </button>
    </div>
  );
}

export default MyAccount;
