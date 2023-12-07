import { useState, useEffect, createContext } from "react";
import { GameData } from "@/types/game-data";
import { UserData } from "@/types/hsr-scanner-data";

const initialGameDataState: GameData = {
  version: "UNKNOWN",
  light_cones: {},
  relic_sets: {},
  characters: {},
};

const initialUserDataState: UserData = {
  source: "UNKNOWN",
  version: -1,
  light_cones: [],
  relics: [],
  characters: [],
};

type HsrDataProviderState = {
  gameData: GameData;
  userData: UserData;
  setUserData: (userData: UserData) => void;
};

export const HsrDataContext = createContext<HsrDataProviderState>({
  gameData: initialGameDataState,
  userData: initialUserDataState,
  setUserData: () => null,
});

type HsrDataProviderProps = {
  children: React.ReactNode;
};
export const HsrDataProvider = ({ children }: HsrDataProviderProps) => {
  const [gameData, setGameData] = useState<GameData>(initialGameDataState);
  const [userData, setUserData] = useState<UserData>(initialUserDataState);

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
      }}
    >
      {children}
    </HsrDataContext.Provider>
  );
};
