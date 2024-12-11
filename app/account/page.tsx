"use client";

import React, { useEffect, useState } from "react";
import MyProduct from "../../Components/MyProduct";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import MyAccount from "../../Components/MyAccount";
import MyPurchase from "../../Components/MyPurchase";
import { HashLoader } from "react-spinners";

function Account() {
  const [selectedMenuItem, setSelectedMenuItem] = useState(1);
  const menuItems = ["Profile", "My Products", "Purchases"];

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);

  const [cookies, setCookie] = useCookies(["token"]);

  const router = useRouter();

  useEffect(() => {
    if (!cookies.token) return router.push("/login");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/account`, {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data));

    setLoading(false);
  }, []);

  if (loading) return (<div className="flex justify-center items-center h-screen"><HashLoader size={50} color={"#fcd34d"} loading={true} /></div>) 

  return (
    <div>
      <div>
        <div className="flex border-2 border-black bg-yellow-300">
          {menuItems.map((item, index) => {
            return selectedMenuItem === index ? (
              <button
                key={item}
                className="flex-1 bg-black text-yellow-300 font-bold border border-black"
              >
                {item}
              </button>
            ) : (
              <button
                key={item}
                onClick={() => setSelectedMenuItem(index)}
                className="flex-1 bg-yellow-300 text-black font-bold border border-black"
              >
                {item}
              </button>
            );
          })}
        </div>
        <div className="flex justify-center m-5">
          {selectedMenuItem == 0 && user && <MyAccount user={user} />}
          {selectedMenuItem == 1 && <MyProduct />}
          {selectedMenuItem == 2 && <MyPurchase />}
        </div>
      </div>
    </div>
  );
}

export default Account;
