import { user } from "./user";

export class card {
  idCard: number = 0;
  ownerCard: string = "";
  number_card: string = "";
  month_expirationCard: string = "";
  year_expirationCard: string = "";
  cvvCard: number = 0;
  nameCard: string = "";
  user: user = new user();
}
