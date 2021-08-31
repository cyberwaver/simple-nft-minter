import { useRouter } from "next/router";
import { createContext, useContext, useState, useMemo, useEffect } from "react";

const voidFn = () => {};

type NotifProps = null | {
  message: string;
  type: string;
  options: any;
};

type NotifFns = {
  notifyError: (message: string, options?: any) => void;
  notifySuccess: (message: string, options?: any) => void;
};

type UseNotifProps = [NotifProps, NotifFns];

const NotifContext = createContext<UseNotifProps>([null, { notifyError: voidFn, notifySuccess: voidFn }]);

export const NotificationProvider = ({ children }): JSX.Element => {
  const Router = useRouter();
  const [contextData, setContextData] = useState(null);
  const notifyError = (message: string, options?: any) => {
    setContextData((contextData) => ({ ...contextData, message, type: "ERROR", options }));
  };
  const notifySuccess = (message: string, options?: any) => {
    setContextData((contextData) => ({ ...contextData, message, type: "SUCCESS", options }));
  };
  const value = useMemo<UseNotifProps>(() => [contextData, { notifyError, notifySuccess }], [contextData]);
  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      setContextData(null);
    });
  }, []);
  return <NotifContext.Provider value={value}>{children}</NotifContext.Provider>;
};

export const useNotification = () => useContext<UseNotifProps>(NotifContext);
