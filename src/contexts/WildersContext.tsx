import {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import IWilderProps from "../interfaces/IWilder";
import ISkillProps from "../interfaces/ISkill";
import axios from "axios";

interface WilderContextType {
  wilders: IWilderProps[];
  dataSkills: ISkillProps[];
  fetchDataWilders: () => Promise<void> | void;
  fetchDataSkills: () => Promise<void> | void;
}

export const WildersContext = createContext<WilderContextType>({
  wilders: [],
  dataSkills: [],
  fetchDataWilders: () => {},
  fetchDataSkills: () => {},
});

export function WildersProvider({ children }: PropsWithChildren) {
  const [wilders, setWilders] = useState<IWilderProps[]>([]);
  const [dataSkills, setSkills] = useState<ISkillProps[]>([]);

  const fetchDataWilders = async () => {
    const result = await axios.get("http://localhost:5000/api/wilder");
    setWilders(result.data);
  };

  const fetchDataSkills = async () => {
    const result = await axios.get("http://localhost:5000/api/skill");
    setSkills(result.data);
  };

  useEffect(() => {
    fetchDataWilders();
    fetchDataSkills();
  }, []);

  return (
    <WildersContext.Provider
      value={{ wilders, dataSkills, fetchDataWilders, fetchDataSkills }}
    >
      {children}
    </WildersContext.Provider>
  );
}

export const useWilders = () => useContext(WildersContext);
