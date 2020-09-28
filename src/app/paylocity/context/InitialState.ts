import { DeductionResponse, DependentDeduction, EmployeeDeduction } from "../model/DeductionResponse.interface";

const employeeDeduction: EmployeeDeduction = {
  employeeName: '',
  compensation: -1,
  compensationLastMonth: -1,
  paycutPerPaycheck: -1,
  paycutLastPaycheck: -1,
  discountApplied: false,
}

const dependentDeduction: DependentDeduction = {
  dependentName: '',
  paycutPerPaycheck: -1,
  paycutLastPaycheck: -1,
  discountApplied: false,
}

const deductionResponse: DeductionResponse = {
  discountRate: '',
  compensationPerPaycheck: -1,
  employeeDeduction: employeeDeduction,
  dependentDeduction: [dependentDeduction],
  _links: {
    $ref: '',
  }
}

export const InitialState = {
  insuranceDeductionState: {
    deductionResponse: deductionResponse,
  }
};
