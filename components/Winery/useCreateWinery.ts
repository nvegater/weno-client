import { useRouter } from "next/router";
import {
  CreateWineryInputs,
  FieldError,
  useCreateWineryMutation,
  UserInputs,
} from "../../graphql/generated/graphql";
import { useState } from "react";

interface UseRegisterWineryHookResult {
  handleRegisterSubmit: any;
}

type UseRegisterWineryHook = () => UseRegisterWineryHookResult;

type CreateWineryFormInputs = {
  userInputs: UserInputs;
  createWineryInputs: CreateWineryInputs;
};
const useCreateWinery: UseRegisterWineryHook = () => {
  const [, createWinery] = useCreateWineryMutation();
  const [error, setError] = useState<FieldError[]>([]);
  const router = useRouter();

  const handleRegisterSubmit = async ({
    userInputs,
    createWineryInputs,
  }: CreateWineryFormInputs) => {
    const response = await createWinery({
      userInputs: {
        ...userInputs,
      },
      createWineryInputs: {
        ...createWineryInputs,
      },
    });

    if (response.data?.createWinery.errors) {
      console.log(response.data?.createWinery.errors);
      setError(response.data.createWinery.errors);
      console.log(error);
    } else {
      const id = response.data?.createWinery.winery?.id;
      router.push("winery/" + id).then();
    }
  };

  return {
    handleRegisterSubmit,
  };
};

export default useCreateWinery;
