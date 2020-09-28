export interface DeductionResponse {
  discountRate: string;
  compensationPerPaycheck: number;
  employeeDeduction: EmployeeDeduction;
  dependentDeduction: DependentDeduction[] | undefined;
  _links: {
    $ref: string;
  }
}

export interface EmployeeDeduction {
  employeeName: string;
  compensation: number;
  compensationLastMonth: number;
  paycutPerPaycheck: number;
  paycutLastPaycheck: number;
  discountApplied: boolean;
}

export interface DependentDeduction {
  dependentName: string;
  paycutPerPaycheck: number;
  paycutLastPaycheck: number;
  discountApplied: boolean;
}
