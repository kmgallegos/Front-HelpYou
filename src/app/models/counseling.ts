import { user } from "./user";

export class Counseling {
  idCounseling: number = 0;
  meetingDateCounseling: Date = new Date();
  meetingTimeCounseling: string = "";  // Agregar este campo
  commentCounseling: string = "";
  user: user = new user();
}
