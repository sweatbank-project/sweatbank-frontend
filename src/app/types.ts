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