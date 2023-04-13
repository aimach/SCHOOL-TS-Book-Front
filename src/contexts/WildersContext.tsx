import { createContext, useContext, PropsWithChildren } from "react";
import IWilderProps from "../interfaces/IWilder";
import ISkillProps from "../interfaces/ISkill";
import { useQuery, gql } from "@apollo/client";

interface WilderContextType {
  wilders: IWilderProps[];
  dataSkills: ISkillProps[];
  fetchDatas: () => Promise<void> | void;
}

export const WildersContext = createContext<WilderContextType>({
  wilders: [],
  dataSkills: [],
  fetchDatas: () => {},
});

const GET_WILDERS_AND_SKILLS = gql`
  query getAllWilders {
    getAllWilders {
      id
      name
      email
      description
      skills {
        id
        name
      }
    }
    getAllSkills {
      id
      name
    }
  }
`;

export function WildersProvider({ children }: PropsWithChildren) {
  const { data, refetch } = useQuery(GET_WILDERS_AND_SKILLS);
  const wilders = data?.getAllWilders || [];
  const dataSkills = data?.getAllSkills || [];

  const fetchDatas = async () => {
    await refetch();
  };

  return (
    <WildersContext.Provider value={{ wilders, dataSkills, fetchDatas }}>
      {children}
    </WildersContext.Provider>
  );
}

export const useWilders = () => useContext(WildersContext);
