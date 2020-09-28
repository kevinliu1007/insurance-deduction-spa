import { Names } from "../model/Names.interface";

export const createDeductionRequest: Function = function createDeductionRequest(employeeInfo: Names, dependentList: Names[]) {
  const employeeName: string = employeeInfo.firstName + ' ' + 
      (employeeInfo.middleName !== undefined && employeeInfo.middleName + ' ') + employeeInfo.lastName;
  let dependentNames: string = '';
  console.log(dependentList);
  
  if (dependentList.length > 0) {
    dependentList.forEach( (dependentName: Names) => {
      console.log('imhere');
      dependentNames += dependentName.firstName + ' ' + (dependentName.middleName !== undefined && dependentName.middleName + ' ') 
          + dependentName.lastName + ',';
      console.log(dependentNames);
    });
  }

  return {
    params: {
      employee: employeeName,
      dependent: dependentNames,
    }
  };
}

export const validateName: Function = function validateName(name: string | undefined, required: boolean): boolean {
  let isInvalid = false;

  if (name === undefined || name.length < 1) {
    if (required) {
      isInvalid = true;
    } else {
      isInvalid = false;
    }
  } else if (!/^([a-zA-Z]+\s)*[a-zA-Z]+$/i.test(name)) {
    isInvalid = true;
  }

  return isInvalid;
}
export const validateAllInput: Function = function validateAllInput(employeeInfo: Names, dependentList: Names[]) {
  let valid: boolean = false;

  valid = !(validateName(employeeInfo.firstName, true)
    || validateName(employeeInfo.lastName, true)
    || validateName(employeeInfo.middleName, false));

  dependentList.forEach((name: Names) => {
    valid = valid && !(validateName(name.firstName, true)
      || validateName(name.lastName, true)
      || validateName(name.middleName, false));
  });

  return valid;
}