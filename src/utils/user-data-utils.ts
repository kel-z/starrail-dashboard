import { UserData } from "@/types/user-data/hsr-scanner";

export const loadHsrScannerDataString = (
  userDataString: string,
  setUserData: (userData: UserData) => void,
): boolean => {
  let userDataJSON: UserData;
  try {
    userDataJSON = JSON.parse(userDataString);
  } catch (e) {
    return false;
  }

  if (
    !userDataJSON.source ||
    userDataJSON.source !== "HSR-Scanner" ||
    !userDataJSON.version ||
    userDataJSON.version !== 3
  ) {
    return false;
  }

  setUserData(userDataJSON);
  return true;
};
