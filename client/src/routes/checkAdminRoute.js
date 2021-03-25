import { authorize } from "../services/auth";

let check = false;

const checkRole = async () => {
  try {
    let role = await authorize();
    if (role.data === "admin") {
      check = true;
    } else {
      check = false;
    }
  } catch (error) {}
};

export const isAuthenticatedAd = () => {
  return check;
};
