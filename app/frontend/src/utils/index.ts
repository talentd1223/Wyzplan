// eslint-disable-next-line @typescript-eslint/ban-types
const times = (n: number) => (f: Function): void => {
  const iter = (i: number) => {
    if (i === n) return
    f (i)
    iter (i + 1)
  }
  return iter (0)
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createBusinessData(
  name: string,
  legal: string,
  value: string,
  owner: string,
  ownership: string,
  debt: string,
  goals: Array<BusinessGoalTypes>
) {
  return { name, legal, value, owner, ownership, debt, goals };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createAssetData(
  type: string,
  description: string,
  owner: string,
  owned: string,
  value: string,
  debt: string,
  income: string,
  expense: string,
) {
  return { type, description, owner, owned, value, debt, income, expense };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createPersonalAssetData(
  owner: string,
  type: string,
  description: string,
  marketValue: string,
  debt: string,
) {
  return { owner, type, description, marketValue, debt };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createPersonalDebtData(
  owner: string,
  type: string,
  description: string,
  balance: string,
  rate: string,
  monthlyPayment: string,
) {
  return { owner, type, description, balance, rate, monthlyPayment };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createHomesData(
  owner: string,
  location: string,
  use: string,
  value: string,
  debt: string,
  income: string,
  expense: string,
) {
  return { owner, location, use, value, debt, income, expense };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createRetirementData(
  owner: string,
  employer: string,
  planType: string,
  roth: string,
  preTax: string,
  afterTax: string,
  loanFromPlan: string,
) {
  return { owner, employer, planType, roth, preTax, afterTax, loanFromPlan };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createPensionData(
  owner: string,
  type: string,
  benefitBegins: string,
  monthlyAmount: string,
  partnerPortion: string,
  cola: string,
  benefitEnds: string,
  value: string,
) {
  return { owner, type, benefitBegins, monthlyAmount, partnerPortion, cola, benefitEnds, value };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createBrokerageData(
  name: string,
  owner: string,
  marginLoan: boolean,
  accounts: Array<BrokerageAccountTypes>,
) {
  return {
    name,
    owner,
    marginLoan,
    accounts,
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createPortfolioData(
  name: string,
  owner: string,
  type: string,
  accounts: Array<PortfolioAccountTypes>,
) {
  return {
    name,
    owner,
    type,
    accounts,
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createPortfolioAcctData(
  firm: string,
  account: string,
  value: string,
) {
  return { firm, account, value };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createAltInvestmentData(
  owner: string,
  type: string,
  description: string,
  value: string,
  costBasis: string,
) {
  return { owner, type, description, value, costBasis }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createCollegeSavingsData(
  owner: string,
  type: string,
  value: string,
) {
  return { owner, type, value }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createPlanData(
  id: string,
  name: string,
  created: string,
  updated: string,
  worksheet: WorksheetTypes,
) {
  return { id, name, created, updated, worksheet }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createWorksheetData(
  id: string,
  name: string,
  created: string,
  updated: string,
  businesses: Array<BusinessRowProps>,
) {
  return { id, name, created, updated, businesses }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createLoansData(
  owner: string,
  type: string,
  description: string,
  loanBalance: string,
  interestRate: string,
  howPaid: string,
  originationDate: string,
  amountBorrowed: string,
  term: string,
  payment: string,
  payOffDate: string,
  annualGiftBegin: string,
  annualGiftAmount: string,

) {
  return {
    owner,
    type,
    description,
    loanBalance,
    interestRate,
    howPaid,
    originationDate,
    amountBorrowed,
    term,
    payment,
    payOffDate,
    annualGiftBegin,
    annualGiftAmount,
  }
}


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createStockPlanData(
  owner: string,
  type: string,
  ticker: string,
  value: string,
) {
  return { owner, type, ticker, value }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createDeferredCompData(
  owner: string,
  type: string,
  value: string,
  distributionPeriod: string,
  annualPayment: string,
) {
  return { owner, type, value, distributionPeriod, annualPayment  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createPrimaryVehicleData(
  driver: string,
  owner: string,
  make: string,
  model: string,
  year: string,
  value: string,
  debt: string,
  payment: string,
  endDate: string,
) {
  return { driver, owner, make, model, year, value, debt, payment, endDate  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createLifeInsuranceData(
  owner: string,
  type: string,
  company: string,
  insurance: string,
  premium: string,
  value: string,
) {
  return { owner, type, company, insurance, premium, value }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createBrokerageAcctData(
  name: string,
  taxCategory: string,
  value: number,
  hasHoldings: boolean,
  taxFreeValue: number,
  costBasis: number,
  holdings: Array<BrokerageHoldingTypes>,
  allocation: BrokerageAllocationTypes,
) {
  return {
    name,
    taxCategory,
    value,
    hasHoldings,
    taxFreeValue,
    costBasis,
    holdings,
    allocation,
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createAllocationData(
  type: string,
  selectedType: string | null | undefined,
  cash: number | null | undefined,
  bond: number | null | undefined,
  stock: number | null | undefined,
) {
  return {
    type,
    selectedType,
    cash,
    bond,
    stock,
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createHoldingsData(
  ticker: string,
  description: string,
  value: number,
  costBasis: number,
  allocation: BrokerageAllocationTypes,
) {
  return {
    ticker,
    description,
    value,
    costBasis,
    allocation,
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function createSavingsInvData(
  account: string,
  owner: string,
  taxCategory: string,
  value: number,
  taxFreeValue: number,
  costBasis: number,
  allocationC: number,
  allocationB: number,
  allocationS: number,
) {
  return {
    account,
    owner,
    taxCategory,
    value,
    taxFreeValue,
    costBasis,
    allocationC,
    allocationB,
    allocationS,
    holdings: [
      { ticker: '1234', description: 'Lorem Ipsum Lorem IpsumLorem IpsumLorem', value: 70_000, costBasis: 70, allocationC: '30%', allocationB: '40%', allocationS: '30%' },
      { ticker: '1234', description: 'Lorem Ipsum Lorem IpsumLorem IpsumLorem', value: 70_000, costBasis: 70, allocationC: '30%', allocationB: '40%', allocationS: '30%' },
      { ticker: '1234', description: 'Lorem Ipsum Lorem IpsumLorem IpsumLorem', value: 70_000, costBasis: 70, allocationC: '30%', allocationB: '40%', allocationS: '30%' },
      { ticker: '1234', description: 'Lorem Ipsum Lorem IpsumLorem IpsumLorem', value: 70_000, costBasis: 70, allocationC: '30%', allocationB: '40%', allocationS: '30%' },
    ],
  };
}

function randomKey(): string {
  return Math.random().toString(36).substr(2, 5);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const numberWithCommas = (x: string | number) => x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');


const nFormatter = (num: number): string => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup.slice().reverse().find((el) => num >= el.value);
  return item ? `$${(num / item.value).toFixed(4).replace(rx, "$1")}${item.symbol}` : "0";
}

export {
  times,
  createBusinessData,
  createAssetData,
  randomKey,
  createSavingsInvData,
  createHomesData,
  createPersonalAssetData,
  createPersonalDebtData,
  numberWithCommas,
  createRetirementData,
  createBrokerageData,
  createBrokerageAcctData,
  createHoldingsData,
  createAllocationData,
  createAltInvestmentData,
  createCollegeSavingsData,
  createStockPlanData,
  createLifeInsuranceData,
  createPrimaryVehicleData,
  createPortfolioData,
  createPortfolioAcctData,
  createPensionData,
  createDeferredCompData,
  createLoansData,
  createPlanData,
  createWorksheetData,
  nFormatter,
}
