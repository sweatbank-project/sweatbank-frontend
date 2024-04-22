export const calculateDownPayment = (
  costOfCar: number,
  downPaymentPercentage: number
): number => {
  const downPaymentDecimal = downPaymentPercentage / 100;
  const downPayment = costOfCar * downPaymentDecimal;
  return downPayment;
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
