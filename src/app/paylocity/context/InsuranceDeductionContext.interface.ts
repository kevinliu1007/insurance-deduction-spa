import { DeductionResponse } from '../model/DeductionResponse.interface';

export interface DeductionState {
  deductionResponse: DeductionResponse | undefined;
}

export interface InsuranceDeductionContextProps {
  insuranceDeductionState: DeductionState | undefined;
  setInsuranceDeductionState: Function;
};
