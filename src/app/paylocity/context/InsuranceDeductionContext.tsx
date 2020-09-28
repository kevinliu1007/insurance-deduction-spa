import {InsuranceDeductionContextProps}
  from './InsuranceDeductionContext.interface';
import React, {useState} from 'react';
import {InitialState} from './InitialState';
import { DeductionResponse } from '../model/DeductionResponse.interface';

const InsuranceDeductionContext = React.createContext<Partial<InsuranceDeductionContextProps>>({});

const Provider = (props: any): JSX.Element => {
  const [state, setState] = useState(InitialState);
  const setDeductionResponse: Function = function setDeductionResponse(deductionResponse: DeductionResponse) {
    setState({
      insuranceDeductionState: {
        deductionResponse: deductionResponse,
      }
    });
  }

  return (
    <InsuranceDeductionContext.Provider
      value={{
        insuranceDeductionState: state.insuranceDeductionState,
        setInsuranceDeductionState: setDeductionResponse,
      }}
    >
      {props.children}
    </InsuranceDeductionContext.Provider>
  );
};

export {InsuranceDeductionContext, Provider};
