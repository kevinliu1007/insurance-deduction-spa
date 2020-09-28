import '../assets/InsuranceDeductionComponent.scss';
import React, { Fragment, useContext, useState } from 'react';
import { Button, Col, Form, ListGroup } from 'react-bootstrap';
import axios, {AxiosResponse} from 'axios';
import { DeductionResponse } from '../model/DeductionResponse.interface';
import { Names } from '../model/Names.interface';
import { InsuranceDeductionContext } from '../context/InsuranceDeductionContext';
import { createDeductionRequest, validateAllInput, validateName } from '../util/DeductionUtil';
import PreviewDeductionComponent from './PreviewDeductionComponent';
import SpinnerComponent from './SpinnerComponent';
import { APIConstants } from '../constant/APIConstants';

const InsuranceDeductionComponent: React.FC = (): JSX.Element => {
  const [startedFiling, setStartedFiling] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [employeeInfo, setEmployeeInfo] = useState<Names>({
    firstName: '',
    middleName: '',
    lastName: '',
    firstInvalid: false,
    middleInvalid: false,
    lastInvalid: false,
  });
  const [dependentList, setDependentList] = useState<Names[]>([]);
  const {insuranceDeductionState, setInsuranceDeductionState} = useContext(InsuranceDeductionContext);

  const insuranceDeductionCall = async (): Promise<void> => {
    let deductionResponse: DeductionResponse;

    try {
      const requestParam = createDeductionRequest(employeeInfo, dependentList);

      await axios(APIConstants.INSURANCE_DEDUCTION_API, requestParam)
      .then( (response: AxiosResponse<DeductionResponse>) => {
        deductionResponse = response.data;
      }).catch( (error) => {
        console.log(error);
      }).finally( () => {
          insuranceDeductionState &&
            setInsuranceDeductionState &&
            setInsuranceDeductionState(deductionResponse);
          setShowSpinner(false);
          setShowPreview(true);
      });
    } catch (error) {
      console.log(error);
    } 
  };

  const handleSubmit = function (): void {
    setShowSpinner(true);
    insuranceDeductionCall();
  }

  const handleAddDependent = function (): void {
    setShowPreview(false);
    setDependentList(dependentList => [...dependentList,
      {
        firstName: '',
        middleName: '',
        lastName: '',
        firstInvalid: false,
        middleInvalid: false,
        lastInvalid: false,
      }
    ]);
  }

  const handleRemoveDependent: Function = function handleRemoveDependent(event: React.MouseEvent<HTMLElement, MouseEvent>, index: number) {
    const tempList = [...dependentList];
    tempList.splice(index, 1);
    setDependentList(tempList);
  }

  const handleUpdateName = function handleUpdateName(event: any): void {
    setShowPreview(false);

    const {id, name, value} = event.target;
    const parsedID = id.split('+');
    let valid: boolean = false;

    if (!startedFiling) {
      setStartedFiling(true);
    }

    if (parsedID.length === 2) {
      switch (name) {
        case 'firstName':
          valid = validateName(value, true);
          setEmployeeInfo({ ...employeeInfo, firstName: value, firstInvalid: valid});
          break;
        case 'middleName':
          valid = validateName(value, false);
          setEmployeeInfo({ ...employeeInfo, middleName: value, middleInvalid: valid});
          break;
        case 'lastName':
          valid = validateName(value, true);
          setEmployeeInfo({ ...employeeInfo, lastName: value, lastInvalid: valid});
          break;
      }
    } else {
      const tempList = [...dependentList];
      switch (name) {
        case 'firstName':
          valid = validateName(value, true);
          tempList[parseInt(parsedID[2])].firstName = value;
          tempList[parseInt(parsedID[2])].firstInvalid = valid;
          setDependentList(tempList);
          break;
        case 'middleName':
          valid = validateName(value, false);
          tempList[parseInt(parsedID[2])].middleName = value;
          tempList[parseInt(parsedID[2])].middleInvalid = valid;
          setDependentList(tempList);
          break;
        case 'lastName':
          valid = validateName(value, true);
          tempList[parseInt(parsedID[2])].lastName = value;
          tempList[parseInt(parsedID[2])].lastInvalid = valid;
          setDependentList(tempList);
          break;
      }
    }
  }

  return (
    <div className="InsuranceDeduction">
      <div>
        <Form noValidate onSubmit={handleSubmit}>
          <ListGroup>
            <Form.Label className="Form-label">Employee Information</Form.Label>

            <ListGroup.Item className="ListGroup-Item" variant="dark">
              <Form.Row>

                <Form.Group as={Col} md="4" controlId="employee+FirstName">
                  <Form.Label className="form-input-Label">First name</Form.Label>
                  <Form.Control
                    name="firstName"
                    value={employeeInfo.firstName}
                    isInvalid={employeeInfo.firstInvalid}
                    required
                    onChange={handleUpdateName}
                    type="text" />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid name.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="employee+MiddleName">
                  <Form.Label className="form-input-Label">Middle name</Form.Label>
                  <Form.Control 
                    name="middleName"
                    value={employeeInfo.middleName}
                    isInvalid={employeeInfo.middleInvalid}
                    onChange={handleUpdateName}
                    type="text" />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid name.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="4" controlId="employee+LastName">
                  <Form.Label className="form-input-Label">Last name</Form.Label>
                  <Form.Control
                    name="lastName"
                    value={employeeInfo.lastName}
                    isInvalid={employeeInfo.lastInvalid}
                    required
                    onChange={handleUpdateName}
                    type="text" />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid name.
                  </Form.Control.Feedback>
                </Form.Group>

              </Form.Row>
            </ListGroup.Item>

            <hr className="line-break"></hr>
            
            {dependentList.length > 0 && 
              <div>
                <hr></hr>

                <Form.Label className="Form-label">Employee's Dependent(s) Information</Form.Label>

                {dependentList.map( (value, index) => {
                  return (
                    <Fragment key={index}>
                      <ListGroup.Item className="ListGroup-Item" variant="dark">
                        <Form.Row>
                          <Form.Group as={Col} xs="4" controlId={"dependent+FirstName+"+index}>
                            <Form.Label className="form-input-Label">First name</Form.Label>
                            <Form.Control
                              name="firstName"
                              value={value.firstName}
                              isInvalid={dependentList[index].firstInvalid}
                              required
                              onChange={handleUpdateName}
                              type="text" />
                            <Form.Control.Feedback type="invalid">
                              Please enter a valid name.
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group as={Col} xs="4" controlId={"dependent+MiddleName+"+index}>
                            <Form.Label className="form-input-Label">Middle name</Form.Label>
                            <Form.Control
                              name="middleName"
                              value={value.middleName}
                              isInvalid={dependentList[index].middleInvalid}
                              onChange={handleUpdateName}
                              type="text" />
                            <Form.Control.Feedback type="invalid">
                              Please enter a valid name.
                            </Form.Control.Feedback>
                          </Form.Group>

                          <Form.Group as={Col} xs="4" controlId={"dependent+LastName+"+index}>
                            <Form.Label className="form-input-Label">Last name</Form.Label>
                            <Form.Control
                              name="lastName"
                              value={value.lastName}
                              isInvalid={dependentList[index].lastInvalid}
                              required
                              onChange={handleUpdateName}
                              type="text" />
                            <Form.Control.Feedback type="invalid">
                              Please enter a valid name.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Form.Row>
                      </ListGroup.Item>
                      <Button className="Remove-button" variant="dark" onClick={(e) => handleRemoveDependent(e, index)}>
                        Remove Dependent
                      </Button>
                    </Fragment>
                  );
                })}
              </div>
            }
          </ListGroup>
        </Form>
        
        <hr></hr>

      </div>
      
      <div>
        <Button 
          className="Submit-button" 
          variant="dark" 
          type="add-dependent" 
          onClick={handleAddDependent}>
          Add Dependent
        </Button>

        <Button 
          className="Submit-button"
          variant="dark" 
          type="submit" 
          disabled={!startedFiling || showSpinner || !validateAllInput(employeeInfo, dependentList)}
          onClick={handleSubmit}>
          {showSpinner ? 'Calculating...' : 'Submit'}
        </Button>
      </div>

      <div className="Spinner">
        {showSpinner && <SpinnerComponent />}
      </div>

      <div className="Table-content">
        {showPreview && <PreviewDeductionComponent />}
      </div>

    </div>
  );
};

export default InsuranceDeductionComponent;
