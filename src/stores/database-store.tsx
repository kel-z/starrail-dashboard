import { useState, useEffect, createContext } from "react";
import { GameData } from "@/types/game-data-types";
import { UserData } from "@/types/user-data/hsr-scanner-types";

const initialGameDataState: GameData = {
  version: "-1",
  light_cones: {},
  relic_sets: {},
  characters: {},
};

export const defaultUserDataState: UserData = {
  source: "NONE",
  version: -1,
  light_cones: [],
  relics: [],
  characters: [],
};

type HsrDataProviderState = {
  gameData: GameData;
  userData: UserData;
  setUserData: (userData: UserData) => void;
  isTrailblazerFemale: boolean;
  setIsTrailblazerFemale: (isFemale: boolean) => void;
};
export const HsrDataContext = createContext<HsrDataProviderState>({
  gameData: initialGameDataState,
  userData: defaultUserDataState,
  setUserData: () => null,
  isTrailblazerFemale: true,
  setIsTrailblazerFemale: () => null,
});

type HsrDataProviderProps = {
  children: React.ReactNode;
};
export const HsrDataProvider = ({ children }: HsrDataProviderProps) => {
  const [gameData, setGameData] = useState<GameData>(initialGameDataState);
  const [userData, setUserData] = useState<UserData>(defaultUserDataState);

  // yes, i'm making female the default. fight me.
  const [isTrailblazerFemale, setIsTrailblazerFemale] = useState<boolean>(true);

  useEffect(() => {
    const url =
      "https://raw.githubusercontent.com/kel-z/HSR-Data/main/output/game_data_verbose_with_icons.json";

    fetch(url)
      .then((response) => response.json())
      .then((data: GameData) => {
        setGameData(data);

        const userData = localStorage.getItem("userData");
        if (!userData) return;
        setUserData(JSON.parse(userData));
      });
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (userData) {
        const dataStr = JSON.stringify(userData);
        localStorage.setItem("userData", dataStr);
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [userData]);

  return (
    <HsrDataContext.Provider
      value={{
        gameData,
        userData,
        setUserData,
        isTrailblazerFemale,
        setIsTrailblazerFemale,
      }}
    >
      {children}
    </HsrDataContext.Provider>
  );
};
