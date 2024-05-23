import { LoanDetails, PersonalDetails } from "src/app/model/newModel.model";
import { Documents } from "./documents.model";

export interface ApplicationData {
  LoanDetails: LoanDetails[];
  PersonalDetails: PersonalDetails[];
  Documents: Documents[][];
}
