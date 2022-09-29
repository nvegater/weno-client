/** Runs a useEffect function only when a dependency changed, not upon the initial rendering */
import { useEffect, useRef } from "react";

export const useEffectOnChange: (fn: () => void, deps: any[]) => void = (
  fn,
  deps
) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      fn();
    } else {
      didMount.current = true;
    }
    // eslint-disable-next-line
  }, deps);
};

export function getUniqueListTyped<T>(array: Array<T>, key: string) {
  return [...new Map(array.map((item) => [item[key], item])).values()];
}
