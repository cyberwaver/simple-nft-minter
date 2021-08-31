import { createContext, useContext, useState, useMemo, useEffect } from "react";
import getWeb3 from "@Utils/getWeb3";
import { isEmpty } from "lodash";
// import * as truffleContractClient from "@truffle/contract";
import MinterContract from "../../artifacts/contracts/Minter.sol/Minter.json";
import Web3 from "web3";

const AuthContext = createContext([
  {},
  { authenticateUser: () => {}, unauthenticateUser: () => {} },
]);
export const AuthProvider = ({ children }) => {
  const [contextData, setContextData] = useState({});
  const [authenticationActionPointer, setAuthenticationActionPointer] =
    useState(0);

  const authenticateUser = () => {
    setAuthenticationActionPointer((p) => (p < 0 ? 1 : p + 1));
  };

  const unauthenticateUser = () => {
    setAuthenticationActionPointer((p) => (p > 0 ? -1 : p - 1));
  };

  useEffect(() => {
    if (authenticationActionPointer > 0) {
      (async () => {
        if (isEmpty(contextData)) return;
        try {
          const { web3 } = contextData;
          const accounts = await web3.eth.getAccounts();
          web3.eth.defaultAccount = accounts[0];
          console.log("ETH ACCOUNTS: ", accounts);
          setContextData((context) => ({ ...context, account: accounts[0] }));
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`
          );
          console.error(error);
        }
      })();
    }

    if (authenticationActionPointer < 0) {
      setContextData({});
    }
  }, [authenticationActionPointer]);

  useEffect(() => {
    getWeb3().then((web3) => {
      console.log(
        "MINTER CONTRACT ADDRESS: ",
        process.env.NEXT_PUBLIC_MINTER_CONTRACT_ADDRESS
      );
      const minterContract = new web3.eth.Contract(
        MinterContract.abi,
        process.env.NEXT_PUBLIC_MINTER_CONTRACT_ADDRESS
      );
      console.log({ minterContract });
      setContextData((context) => ({ ...context, web3, minterContract }));
    });
  }, []);

  const value = useMemo(
    () => [contextData, { authenticateUser, unauthenticateUser }],
    [contextData]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
