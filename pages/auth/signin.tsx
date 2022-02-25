import React from "react";
import { getProviders } from "next-auth/react";
import { InferGetServerSidePropsType } from "next";
import { LoginWithGradient } from "../../components/Authentication/LoginWithGradient/LoginWithGradient";

const Signin = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { providers } = props;

  return <LoginWithGradient providers={providers} />;
};

export const getServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: { providers },
  };
};

export default Signin;
