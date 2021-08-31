import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "@Store/contexts/authentication";
import { RenderIf } from "@Components/shared/render-if.component";

export const ProtectedComp = ({ children }) => {
  const [{ account }] = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!account) router.push("/");
  }, []);
  return <RenderIf onTrue={account}>{children}</RenderIf>;
};
