import React from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const User = () => {
  const router = useRouter();
  const username = typeof router.query.id === "string" ? router.query.id : "";
  const [t] = useTranslation("global");

  return (
    <>
      {username === "" ? (
        <h1>{t("userNotFound")}</h1>
      ) : (
        <h1>
          {" "}
          {t("userId")}
          {username}
        </h1>
      )}
    </>
  );
};

export default User;
