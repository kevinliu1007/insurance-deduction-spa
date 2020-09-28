import React, { useContext } from "react";
import { Table } from "react-bootstrap";
import { InsuranceDeductionContext } from "../context/InsuranceDeductionContext";

const PreviewDeductionComponent: React.FC = (): JSX.Element => {
  const { insuranceDeductionState } = useContext(InsuranceDeductionContext);

  console.log(insuranceDeductionState);

  return (
    <div>
      <h3>Employee's Deduction Details</h3>
      <Table bordered striped>
        <tbody>
          <tr>
            <td>Employee Name</td>
            <td>{insuranceDeductionState?.deductionResponse?.employeeDeduction.employeeName}</td>
          </tr>
          <tr>
            <td>Total Compensation</td>
            <td>{'$' + insuranceDeductionState?.deductionResponse?.compensationPerPaycheck.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Possible Discount Rate</td>
            <td>{insuranceDeductionState?.deductionResponse?.discountRate}</td>
          </tr>
          <tr>
            <td>Discount Applied for Employee</td>
            <td>{insuranceDeductionState?.deductionResponse?.employeeDeduction.discountApplied ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td>Pay Cut Per Paycheck</td>
            <td>{'$' + insuranceDeductionState?.deductionResponse?.employeeDeduction.paycutPerPaycheck.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Pay Cut For Last Paycheck Per Year</td>
            <td>{'$' + insuranceDeductionState?.deductionResponse?.employeeDeduction.paycutLastPaycheck.toFixed(2)}</td>
          </tr>
        </tbody>
      </Table>

      {insuranceDeductionState?.deductionResponse?.dependentDeduction 
          && insuranceDeductionState?.deductionResponse?.dependentDeduction?.length > 0 && 
        <div>
          <h3>Employee's Dependent(s) Deduction Details</h3>

          {insuranceDeductionState?.deductionResponse?.dependentDeduction?.map( (value, index) => {
            return (
              <div>
                <Table bordered striped>
                  <tbody>
                    <tr>
                      <td>{'Dependent ' + (index + 1) +'\'s Name'}</td>
                      <td>{value.dependentName}</td>
                    </tr>
                    <tr>
                      <td>{'Dependent ' + (index + 1) + '\'s Discount Applied'}</td>
                      <td>{value.discountApplied ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr>
                      <td>{'Dependent ' + (index + 1) +'\'s Pay Cut Per Paycheck'}</td>
                      <td>{'$' + value.paycutPerPaycheck.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>{'Dependent ' + (index + 1) + '\'s Pay Cut For Last Paycheck Of The Year'}</td>
                      <td>{'$' + value.paycutLastPaycheck.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            );
          })}
        </div>
      }

      <h3>Employee's Net Compensation Details</h3>
      <Table bordered striped>
        <tbody>
          <tr>
            <td>Net Compensation Per Paycheck</td>
            <td className="Table-element-net">{'$' + insuranceDeductionState?.deductionResponse?.employeeDeduction.compensation.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Net Compensation For Last Paycheck Of The Year</td>
            <td className="Table-element-net">{'$' + insuranceDeductionState?.deductionResponse?.employeeDeduction.compensationLastMonth.toFixed(2)}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default PreviewDeductionComponent;