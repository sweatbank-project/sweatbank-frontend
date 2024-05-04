export const calculateDownPayment = (
  costOfCar: number,
  downPaymentPercentage: number
): number => {
  const downPaymentDecimal = downPaymentPercentage / 100;
  const downPayment = costOfCar * downPaymentDecimal;
  return downPayment;
};

const calculateDownPaymentPercentage = (
  costOfCar: number,
  downPayment: number
): number => {
  const downPaymentPercentage = costOfCar / downPayment;
  //return Math.round(downPaymentPercentage * 100) / 100;
  return downPaymentPercentage;
};

export const calculateContractFee = (costOfCar: number): number => {
  const minimumFee = 200;
  return Math.max(minimumFee, costOfCar / 100);
};

export const calculateTotalInterestRate = (
  euriborRate: number,
  margin: number
): number => {
  const interestRate = euriborRate + margin;
  return interestRate;
};

export const calculateMonthlyPayment = (
  costOfCar: number,
  downPayment: number,
  totalInterestRate: number,
  numberOfPayments: number
): number => {
  const interestRatePerMonth = totalInterestRate / 100 / 12;
  const carPriceAfterDownPayment = costOfCar - downPayment;

  const numerator =
    carPriceAfterDownPayment *
    interestRatePerMonth *
    Math.pow(1 + interestRatePerMonth, numberOfPayments);

  const denominator = Math.pow(1 + interestRatePerMonth, numberOfPayments) - 1;
  // Round to 2 decimal places
  return Math.round((numerator / denominator) * 100) / 100;
};

export const initialCalculation = (
  costOfCar: number,
  downPayment: number,
  leasingPeriod: number
) => {
  const leasingPeriodMonths = leasingPeriod * 12;

  const downPaymentPercentage = calculateDownPaymentPercentage(
    costOfCar,
    downPayment
  );
  const contractFee = calculateContractFee(costOfCar);

  //---MAGIC NUMBERS!---
  const euriborType = 'EURIBOR_6_MONTH';
  const euriborRate = 3.893;
  const margin = 2;
  //---MAGIC NUMBERS!---

  const interestRate = calculateTotalInterestRate(euriborRate, margin);
  const monthlyPayment = calculateMonthlyPayment(
    costOfCar,
    downPayment,
    interestRate,
    leasingPeriodMonths
  );

  return {
    downPaymentPercentage,
    contractFee,
    euriborType,
    euriborRate,
    margin,
    interestRate,
    monthlyPayment,
  };
};
