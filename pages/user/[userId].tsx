import React from "react";
import { useRouter } from "next/router";

const User = () => {
  const router = useRouter();
  const username = typeof router.query.id === "string" ? router.query.id : "";

  return (
    <>
      {username === "" ? <h1>USer not found</h1> : <h1>User Id {username}</h1>}
    </>
  );
};

export default User;
