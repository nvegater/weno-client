import React, { FC } from "react";

interface CreateWineryFormProps {
  username: string;
  email: string;
}

export const CreateWineryForm: FC<CreateWineryFormProps> = ({
  username,
  email,
}) => {
  return (
    <div>
      Hola <b>{" " + username}</b> with email <b>{email}</b>. You Register as a
      Winery Owner, but you havent created any winery yet. Please fill out the
      form to complete your registration.
    </div>
  );
};
