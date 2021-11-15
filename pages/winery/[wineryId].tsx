import React from "react";
import { useRouter } from "next/router";

const Winery = () => {
  const router = useRouter();
  const wineryId =
    typeof router.query.wineryId === "string"
      ? parseInt(router.query.wineryId as string)
      : -1;

  return (
    <>
      {wineryId === -1 ? (
        <h1>Winery not found</h1>
      ) : (
        <h1>Winery Id {wineryId}</h1>
      )}
    </>
  );
};

export default Winery;
