export interface UpdateRequestBody {
  applicationId: string;
  status: string;
  downPayment: number;
  downPaymentPercentage: number;
  euriborRate: number;
  euriborType: string;
  interestRate: number;
  leasingPeriod: number;
  margin: number;
  monthlyPayment: number;
}

export interface SolvencyCalculationResponse {
  netIncome: number;
  currentMonthlyPayment: number;
  otherMonthlyPayments: number;
  newMonthlyPayment: number;
  householdExpenditure: number;
  monthlyLivingExpenses: number;
  loanServiceRate: number;
}
