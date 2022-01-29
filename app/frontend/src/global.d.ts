import * as React from "react";

declare global {
  type ButtonProps = {
    label?: string;
    onClick?: any;
    small?: boolean | null | undefined;
    selectable?: boolean | null | undefined;
    active?: boolean | null | undefined;
    actionable?: boolean | null | undefined;
    style?: any;
    disabled?: boolean | null | undefined;
  }

  interface GoalDialogProps {
    business: BusinessRowProps | null,
    setBusiness: any
  }

  interface DashCardProps {
    title: string,
    label: string,
    route: string,
  }

  interface AlertProps {
    open: boolean,
    setOpen: (open: boolean) => void,
    onConfirm: () => void,
    title: string,
    children: React.ReactChildren
  }

  type BusinessRowProps = {
    isNew?: boolean | null | undefined;
    name: string;
    legal: string;
    value: string;
    ownership: string;
    debt: string;
    goals: Array<BusinessGoalTypes>;
  }

  interface BrokerageTypes {
    name: string;
    owner: string;
    marginLoan: boolean;
  }

  interface PeriodsTypes {
    periodBegins: string;
    periodEnds: string;
    totalAnnualIncome: string;
    annualIncrease: string;
  }

  interface RetirementPeriodsTypes {
    periodBegins: string;
    contributions: string;
    traditionalIra: string;
    rothIra: string;
    afterTax: string;
  }

  interface ProfitPeriodsTypes {
    periodBegins: string;
    periodEnds: string;
    totalAnnualIncrease: string;
    ownershipShare: string;
    yourAmount: string;
    annualIncrease: string;
  }

  interface BusinessGoalTypes {
    type: string;
    name: string;
    periods: Array<PeriodsTypes>;
  }

  interface BrokerageAllocationTypes {
    type: string;
    selectedType: string | null | undefined;
    cash: number | null | undefined;
    bond: number | null | undefined;
    stock: number | null | undefined;
  }

  interface PlanTypes {
    id: string;
    name: string;
    updated: string;
    created: string;
    worksheet: WorksheetTypes;
  }

  interface WorksheetTypes {
    id: string;
    name: string;
    updated: string;
    created: string;
    businesses: Array<BusinessRowProps>;
  }

  interface BrokerageHoldingTypes {
    ticker: string;
    description: string;
    value: number;
    costBasis: number;
    allocation: BrokerageAllocationTypes;
  }

  interface BrokerageAccountTypes {
    name: string;
    taxCategory: string;
    value: number;
    hasHoldings: boolean;
    taxFreeValue: number;
    costBasis: number;
    holdings: Array<BrokerageHoldingTypes>;
    allocation: BrokerageAllocationTypes;
  }

  interface PortfolioAccountTypes {
    firm: string;
    account: string;
    value: string;
  }

  interface CustomThemeProps {
    children: React.ReactNode;
  }

  interface ThemeContextValues {
    currentTheme: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    setTheme: Function | null;
  }

  interface QuadrantLayoutProps {
    className: string;
    items: number;
    rowHeight: number | undefined;
    cols: number;
  }

  interface User {
    id: number|null;
    email: string;
    first_name: string;
    last_name: string;
  }

  type GridItemObject = {
    x: number;
    y: number;
    w: number;
    h: number;
    i: string;
  }

  interface OptionTypes {
    value: string,
    label: string,
  }

  interface OwnerSelectProps {
    onChange: (event: React.ChangeEvent<{ value: unknown }>) => void,
    value: string,
    ownerOptions: Array<OptionTypes>,
  }
}

export {}
