import React from "react";
import { cookies } from "next/headers";
import Navbar from "./navbar";
import NavbarBottom from "./navbarBottom";
// import Navbar from "./navbarNew";

const NavbarBottomComponent = async () => {
  var userinfo;
   const cookieStore = await cookies();
  const token = cookieStore.get("access-token")?.value;
  const user_id = cookieStore.get("user_id")?.value;
  const name = cookieStore.get("name")?.value;
  const image = cookieStore.get("image")?.value;
  const role = cookieStore.get("role")?.value;

  userinfo = {
    token,
    user_id,
    name,
    image,
    role,
  };
  console.log(userinfo);

  return (
    <div>
      <NavbarBottom className="container" user={userinfo} />
    </div>
  );
};

export default NavbarBottomComponent;
