import { atom } from 'recoil';
import {
  createBusinessData,
  createAssetData,
  createSavingsInvData,
  createHomesData,
  createPersonalAssetData,
  createPersonalDebtData,
  createBrokerageData,
  createBrokerageAcctData,
  createAllocationData,
  createRetirementData,
  createAltInvestmentData,
  createCollegeSavingsData,
  createStockPlanData,
  createLifeInsuranceData,
  createPrimaryVehicleData,
  createPortfolioData,
  createPortfolioAcctData,
  createPensionData,
  createDeferredCompData,
  createLoansData, createPlanData, createWorksheetData,
} from '../utils';

const apiUrl = atom({ key: 'apiUrl', default: process.env.REACT_APP_API_URL });

const navOpen = atom({ key: 'navOpen', default: true });

const currentUser = atom({
  key: 'currentUser',
  default: {id:null, email:'', first_name:'', last_name:''} as User
});

const userAuthorized = atom({
  key: 'userAuthorized',
  default: false,
});

const addGoalsDialogOpen = atom({
  key: 'addGoalsDialogOpen',
  default: false,
})

const userAccessToken = atom({
  key: 'userAccessToken',
  default: '',
});

const userRefreshToken = atom({
  key: 'userRefreshToken',
  default: '',
});

const businessesDataState = atom({
  key: 'businessesDataState',
  default: [
    createBusinessData('Mallory LLC', 'LLC', '700000', 'John', '30', '300000', []),
    createBusinessData('Brandon Corp.', 'C Corp', '2000000','John',  '30', '180000', []),
    createBusinessData('Mallory Bakeshop', 'Sole Proprietor', '60000','John',  '30', '20000', []),
    createBusinessData('Mobelux', 'Sole Proprietor', '250000','John',  '30', '10000', []),
  ],
});

const businessesWorksheetState = atom({
  key: 'businessesWorksheetState',
  default: [],
});

const realEstateDataState = atom({
  key: 'realEstateDataState',
  default: [
    createAssetData('Rental', 'NYC Apartment', 'John', '50', '300000', '30000', '30000', '1000'),
    createAssetData('Land', 'River City Ranch', 'John', '100', '1800000', '800000', '0', '1000'),
    createAssetData('Commercial', 'Office Space', 'Anne', '100', '10200000', '500000', '200000', '2000'),
    createAssetData('Other', 'Beach Front', 'Anne', '100', '10000', '1000', '0', '0'),
  ],
});

const SavingsInvestmentsDataState = atom({
  key: 'SavingsInvestmentsDataState',
  default: [
    createSavingsInvData('Account 1', 'John', 'Traditional', 700_000, 70_000, 300, 30, 30, 30),
    createSavingsInvData('Account 2', 'Joint', 'Taxable', 2_000_000, 70_000, 300, 30, 30, 30),
    createSavingsInvData('Account 3', 'Anna', 'Roth', 70_000, 70_000, 30, 30, 30, 30),
    createSavingsInvData('Account 4', 'John', 'Traditional', 70_000, 70_000, 30, 30, 30, 30),
  ],
});

const HomesDataState = atom({
  key: 'HomesDataState',
  default: [
    createHomesData('John','Richmond', 'Legal Residence', '500000', '30000', '0', '4000'),
    createHomesData('Joint', 'Virginia Beach', 'Legal Residence', '800000', '80000', '0', '12000'),
    createHomesData('Anne', 'DC', 'Part-Time Residence', '1000000', '500000', '50000', '2000'),
    createHomesData('John', 'Richmond', 'Legal Residence', '300000', '100000', '15000', '2000'),
  ]
});

const PersonalAssetsDataState = atom({
  key: 'PersonalAssetsDataState',
  default: [
    createPersonalAssetData('John', 'RV', 'Family Roadster', '140000', '52000'),
    createPersonalAssetData('John', 'Vehicle', 'Annes Tundra', '15000', '5000'),
    createPersonalAssetData('John', 'Antiques', 'Johns Coins', '25000', ''),
    createPersonalAssetData('John', 'Watercraft', 'Sunseeker', '40000', ''),
  ]
});

const PersonalDebtDataState = atom({
  key: 'PersonalDebtDataState',
  default: [
    createPersonalDebtData('John', 'Personal Loan', 'Lorem', '22000', '4', ''),
    createPersonalDebtData('John', 'College Loan', 'Grad School', '14000', '7', ''),
    createPersonalDebtData('John', 'Credit Card', 'Amex', '5000', '3', ''),
    createPersonalDebtData('John', 'Other', 'Other', '2000', '1', ''),
  ]
});

const RetirementDataState = atom({
  key: 'RetirementDataState',
  default: [
    createRetirementData('John', 'PieTopia', '401(k)', '80000', '60000', '45000', ''),
    createRetirementData('Anne', 'PieTech', '403(b)', '100000', '70000', '55000', ''),
    createRetirementData('John', 'Mobelux', 'SEP IRA', '80000', '60000', '45000', ''),
    createRetirementData('John', 'PieTech', '401(k)', '200000', '160000', '120000', ''),
  ]
});

const altInvestmentDataState = atom({
  key: 'altInvestmentDataState',
  default: [
    createAltInvestmentData('John', 'Private Equity', 'Spotify', '200000', '20000'),
    createAltInvestmentData('John', 'Hedge Fund', 'Robinhood', '120000', '5000'),
    createAltInvestmentData('John', 'Limited Partnership', 'Mobelux', '200000', ''),
    createAltInvestmentData('John', 'Other', '', '60000', ''),
  ]
});

const collegeSavingsDataState = atom({
  key: 'collegeSavingsDataState',
  default: [
    createCollegeSavingsData('Timmy', '529', '100000'),
    createCollegeSavingsData('Susan', 'Coverdell', '60000'),
  ],
})

const stockPlanDataState = atom({
  key: 'stockPlanDataState',
  default: [
    createStockPlanData('John', 'Stock Option', 'APPL', '20000'),
    createStockPlanData('John', 'Restricted Stock', 'TSLA', '10000'),
    createStockPlanData('Anne', 'Stock Option', 'TSLA', '20000'),
    createStockPlanData('Anne', 'Restricted Stock', 'APPL', '5000'),
  ],
})

const lifeInsuranceDataState = atom({
  key: 'lifeInsuranceDataState',
  default: [
    createLifeInsuranceData('John', 'Permanent', 'Mobelux', '500000', '300', '100000'),
    createLifeInsuranceData('Anne', 'Universal', 'PieTech', '400000', '500', '120000'),
    createLifeInsuranceData('John', 'Variable', 'Pietopia', '500000', '300', '100000'),
  ],
});

const primaryVehicleDataState = atom({
  key: 'primaryVehicleDataState',
  default: [
    createPrimaryVehicleData('John', 'John', 'Ford', 'Mustang', '2018', '24000', '', '', ''),
    createPrimaryVehicleData('Anne', 'John', 'Tesla', 'Model S', '2019', '44000', '', '', ''),
    createPrimaryVehicleData('Both', 'Leasing Company', 'RV', 'LS100', '2020', '120000', '', '1700', '2028'),
  ],
})

const pensionDataState = atom({
  key: 'pensionDataState',
  default: [
    createPensionData('John', 'Future', 'Age 62', '1000', '50', 'None', 'Anne Dies',  ''),
  ],
})

const deferredCompDataState = atom({
  key: 'deferredCompDataState',
  default: [
    createDeferredCompData('John', 'Future', '', '', ''),
    createDeferredCompData('John', 'Receiving Now', '', '', ''),
  ],
})

const loanDataState = atom({
  key: 'loanDataState',
  default: [
    createLoansData('Joint', 'Gifting', 'Loan to Kim', '63000', '1', 'Offset by Gifting', '', '', '', '', '1/26', '22', '4000'),
    createLoansData('Joint', 'Repaid', 'Loan to Joe to buy house', '90000', '1', '', '6/20', '100000', '10', '4000', '6/30', '', ''),
  ],
})

const routeSlideState = atom({
  key: 'routeSlideState',
  default: [
    {
      route: '/',
      pageTitle: 'Dashboard',
      animationState: {
        initial: { x: "-100%" },
        animate: { x: 0 },
        exit: { x: "-100%" },
      }
    },
    {
      route: '/know-your-client',
      pageTitle: 'Know Your Clients',
      animationState: {
        initial: { x: "-100%" },
        animate: { x: 0 },
        exit: { x: "-100%" },
      }
    },
    {
      route: '/rita',
      pageTitle: 'RITA',
      animationState: {
        initial: { x: "-100%" },
        animate: { x: 0 },
        exit: { x: "-100%" },
      }
    },
    {
      route: '/wyzplan',
      pageTitle: 'Wyzplan',
      animationState: {
        initial: { x: "-100%" },
        animate: { x: 0 },
        exit: { x: "-100%" },
      }
    },
  ],
});

const directionalRoutes = atom({
  key: 'directionalRoutes',
  default: [
    {
      route: '/wyzplan',
      pageTitle: 'Wyzplan',
      animationState: {
        initial: { x: "-100%" },
        animate: { x: 0 },
        exit: { x: "-100%" },
      }
    },
    {
      route: '/assets-debts',
      pageTitle: 'Assets & Debts',
      animationState: {
        initial: { x: "-100%" },
        animate: { x: 0 },
        exit: { x: "-100%" },
      }
    },
  ],
});

const defaultDataSectionStates = {
  aboutYou: {
    title: 'About You',
    active: true,
    visited: true,
    completed: true,
    hidden: false,
    guide: true,
  },
  rita: {
    title: 'RITA',
    active: true,
    visited: true,
    completed: true,
    hidden: false,
    guide: true,
  },
  netWorth: {
    title: 'Net Worth - Asset & Debt Summary',
    active: true,
    visited: true,
    completed: false,
    hidden: false,
    guide: true,
  },
  businessYouOwn: {
    title: 'Business You Own',
    active: true,
    visited: true,
    completed: false,
    hidden: false,
    guide: true,
  },
  realEstate: {
    title: 'Investment Real Estate',
    active: false,
    visited: false,
    completed: false,
    hidden: false,
    guide: true,
  },
  homes: {
    title: 'Home(s) You Own to Live In',
    active: false,
    visited: false,
    completed: false,
    hidden: false,
    guide: true,
  },
  primaryVehicles: {
    title: 'Primary Vehicles You Will Replace at Planned Intervals',
    active: false,
    visited: false,
    completed: false,
    hidden: false,
    guide: true,
  },
  personalUseAssets: {
    title: 'Other Personal Use Assets that Have Market Value',
    active: false,
    visited: false,
    completed: false,
    hidden: false,
    guide: true,
  },
  personalDebt: {
    title: 'Personal Debt Not Linked to an Asset',
    active: false,
    visited: false,
    completed: false,
    hidden: false,
    guide: true,
  },
  employerRetirement: {
    title: 'Employer Retirement Plan',
    active: false,
    visited: false,
    completed: false,
    hidden: false,
    guide: true,
  },
  brokerages: {
    title: 'Investment & Savings Accounts',
    active: false,
    visited: false,
    completed: false,
    hidden: false,
    guide: true,
  },
  collegeSavings: {
    title: 'College Savings Plans',
    active: false,
    visited: false,
    completed: false,
    hidden: false,
    guide: true,
  },
  pension: {
    title: 'Pension',
    active: false,
    visited: false,
    completed: false,
    hidden: false,
    guide: true,
  },
  deferredCompensation: {
    title: 'Deferred Compensation',
    active: false,
    visited: false,
    completed: false,
    hidden: false,
    guide: true,
  },
  stockPlans: {
    title: 'Stock Plans',
    active: false,
    visited: false,
    completed: false,
    hidden: false,
    guide: true,
  },
  lifeInsurance: {
    title: 'Cash Value Life Insurance',
    active: false,
    visited: false,
    completed: false,
    hidden: false,
    guide: true,
  },
  loans: {
    title: 'Loan(s) Owed to You',
    active: false,
    visited: false,
    completed: false,
    hidden: false,
    guide: true,
  },
  specialPortfolio: {
    title: 'Special Portfolio',
    active: false,
    visited: false,
    completed: false,
    hidden: false,
    guide: true,
  },
  altInvestments: {
    title: 'Alternative Investments',
    active: false,
    visited: false,
    completed: false,
    hidden: false,
    guide: true,
  },
};

const assetsDebtEditState = atom({
  key: 'assetsDebtEditState',
  default: false,
});

const dataSectionsEditable = atom({
  key: 'dataSectionsEditable',
  default: false,
})

const manualInstitutions = atom({
  key: 'manualInstitutions',
  default: [],
})

const globalDataSections = atom({
  key: 'globalDataSections',
  default: defaultDataSectionStates,
});

const activeDataKey = atom({
  key: 'activeDataKey',
  default: 'aboutYou',
});

const dialogCellActive = atom({
  key: 'dialogCellActive',
  default: false,
});

const employmentDialogActive = atom({
  key: 'employmentDialogActive',
  default: false,
});

const retirementDialogActive = atom({
  key: 'retirementDialogActive',
  default: false,
});

const profitDialogActive = atom({
  key: 'profitDialogActive',
  default: false,
});

const sellSharesDialogActive = atom({
  key: 'sellSharesDialogActive',
  default: false,
});

const buySharesDialogActive = atom({
  key: 'buySharesDialogActive',
  default: false,
});


const onBoardingCompleted = atom({
  key: 'onBoardingCompleted',
  default: false,
});

const settingsDrawerActive = atom({
  key: 'settingsDrawerActive',
  default: false,
});

const onBoardTypeState = atom({
  key: 'onBoardTypeState',
  default: 'Vertical',
});

const staggerTrigger = atom({
  key: 'staggerTrigger',
  default: false,
});

const onBoardScrollHeight = atom({
  key: 'onBoardScrollHeight',
  default: -120,
});

const brokeragesDataState = atom({
  key: 'brokeragesDataState',
  default: [
    createBrokerageData(
      'Schwab',
      'John',
      false,
      [
        createBrokerageAcctData(
          'Acct 1',
          'Taxable',
          500_000,
          true,
          200_000,
          325_000,
          [
            // createHoldingsData(
            //   '1',
            //   'ABC',
            //   130_000,
            //   50_000,
            //   createAllocationData('enter', 'Stock', null, null, null)
            // )
          ],
          createAllocationData('select', 'manual', 20, 34, 46)
        ),
      ]
    )
  ],
});

const portfolioDataState = atom({
  key: 'portfolioDataState',
  default: [
    createPortfolioData('High Growth', 'John', 'Taxable', [
      createPortfolioAcctData('Schwab', 'Account 1', '200000'),
      createPortfolioAcctData('Robinhood', 'Account A', '185000'),
    ]),
    createPortfolioData('Speculative', 'John', 'Roth', [
      createPortfolioAcctData('Acct B', 'Holding', '75000'),
    ]),
  ],
});

const plansDataState = atom({
  key: 'plansDataState',
  default: [
    createPlanData(
      'plan-1',
      'Plan 1',
      '2021-11-17',
      '2021-11-17',
      createWorksheetData(
        'worksheet-1',
        'Worksheet 1',
        '2021-11-17',
        '2021-11-17',
        []
        )
    ),
    createPlanData(
      'plan-2',
      'Plan 2',
      '2021-11-17',
      '2021-11-17',
      createWorksheetData(
        'worksheet-1',
        'Worksheet 1',
        '2021-11-17',
        '2021-11-17',
        []
      )
    )
  ],
});

const employmentGoalPeriods = atom({
  key: 'employmentGoalPeriods',
  default: [
    createPlanData(
      'plan-1',
      'Plan 1',
      '2021-11-17',
      '2021-11-17',
      createWorksheetData(
        'worksheet-1',
        'Worksheet 1',
        '2021-11-17',
        '2021-11-17',
        []
      )
    ),
    createPlanData(
      'plan-2',
      'Plan 2',
      '2021-11-17',
      '2021-11-17',
      createWorksheetData(
        'worksheet-1',
        'Worksheet 1',
        '2021-11-17',
        '2021-11-17',
        []
      )
    )
  ],
});

export {
  apiUrl,
  navOpen,
  currentUser,
  userAccessToken,
  userRefreshToken,
  businessesDataState,
  realEstateDataState,
  SavingsInvestmentsDataState,
  routeSlideState,
  directionalRoutes,
  HomesDataState,
  PersonalAssetsDataState,
  PersonalDebtDataState,
  RetirementDataState,
  assetsDebtEditState,
  manualInstitutions,
  globalDataSections,
  dialogCellActive,
  brokeragesDataState,
  onBoardingCompleted,
  dataSectionsEditable,
  userAuthorized,
  activeDataKey,
  altInvestmentDataState,
  collegeSavingsDataState,
  stockPlanDataState,
  lifeInsuranceDataState,
  settingsDrawerActive,
  onBoardTypeState,
  defaultDataSectionStates,
  staggerTrigger,
  onBoardScrollHeight,
  primaryVehicleDataState,
  portfolioDataState,
  pensionDataState,
  deferredCompDataState,
  loanDataState,
  businessesWorksheetState,
  plansDataState,
  addGoalsDialogOpen,
  employmentDialogActive,
  retirementDialogActive,
  profitDialogActive,
  sellSharesDialogActive,
  buySharesDialogActive,
  employmentGoalPeriods,
}
