import {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import IWilderProps from "../interfaces/IWilder";
import axios from "axios";

interface WilderContextType {
  wilders: IWilderProps[];
  fetchData: () => Promise<void> | void;
}

export const WildersContext = createContext<WilderContextType>({
  wilders: [],
  fetchData: () => {},
});

export function WildersProvider({ children }: PropsWithChildren) {
  const [wilders, setWilders] = useState<IWilderProps[]>([]);

  const fetchData = async () => {
    const result = await axios.get("http://localhost:5000/api/wilder");

    setWilders(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <WildersContext.Provider value={{ wilders, fetchData }}>
      {children}
    </WildersContext.Provider>
  );
}

export const useWilders = () => useContext(WildersContext);
