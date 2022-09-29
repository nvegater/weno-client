import React from "react";
import { getProviders } from "next-auth/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { LoginWithGradient } from "../components/Authentication/LoginWithGradient";

const SignIn = (props: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const { providers } = props;

  return <LoginWithGradient providers={providers} />;
};

export const getStaticProps: GetServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: { providers },
  };
};

export default SignIn;
