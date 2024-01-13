import { UserData } from "@/types/user-data/hsr-scanner-types";
import { SroData } from "@/types/user-data/sro-types";
import { convertSroToHsrScannerData } from "./sro-conversion-utils";

export const loadHsrScannerDataString = (
  userDataString: string,
  setUserData: (userData: UserData) => void,
  setIsTrailblazerFemale: (isTrailblazerFemale: boolean) => void,
): boolean => {
  let userDataJSON: UserData | SroData;
  try {
    userDataJSON = JSON.parse(userDataString);
  } catch (e) {
    return false;
  }

  if (
    "format" in userDataJSON &&
    (userDataJSON.format === "SRO" || userDataJSON.format === "SROD")
  ) {
    const convertedUserData = convertSroToHsrScannerData(
      userDataJSON,
      setIsTrailblazerFemale,
    );
    setUserData(convertedUserData);
    return true;
  }

  if (
    !userDataJSON.source ||
    !["HSR-Scanner", "SRD"].includes(userDataJSON.source) ||
    !userDataJSON.version ||
    userDataJSON.version !== 3
  ) {
    return false;
  }

  setUserData(userDataJSON);
  return true;
};
