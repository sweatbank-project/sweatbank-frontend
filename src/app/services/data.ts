import { LeaseData } from "../components/client/application/data";

export interface AuthResponseData {
  token: string;
  role: string;
  user: AuthUserData;
}

export interface AuthUserData {
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  address: string;
  birthdate: Date;
}

export interface UserLeasesResponseData {
  leases: LeaseData[];
}
