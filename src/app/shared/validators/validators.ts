import { AbstractControl, ValidatorFn, Validators, FormControl, ValidationErrors } from '@angular/forms';

//---------------------------------------------------------------------------------------------------------------------------

//validator for supplier name that will accept only alpha and '-'. max of 50 characters
export function SupplierNameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value || !/^[A-Za-z-\s]{1,50}$/.test(value)) {
      return { invalidLastName: true }; // Invalid
    }
    return null; // Valid
  };
}

export function maxQuantityValidator(max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const forbidden = control.value > max;
    console.log('Validator triggered, value:', control.value, 'max:', max, 'forbidden:', forbidden);  // Add this line
    return forbidden ? { maxQuantity: { max, actual: control.value } } : null;
  };
}

//---------------------------------------------------------------------------------------------------------------------------

export function SelectedDiscountValidator(): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (value.includes(value)) {
      return null; // Valid
    }
      return { invalidSelectedDiscount: true }; // Invalid
  };
}

export function SelectedUserValidator(): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (value.includes(value)) {
      return null; // Valid
    }
      return { invalidSelectedDiscount: true }; // Invalid
  };
}

//validator for supplier name that will accept only alpha and '-'. max of 50 characters
export function CustomerNameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value || !/^[A-Za-z-\s]{1,50}$/.test(value)) {
      return { invalidCustomerName: true }; // Invalid
    }
    return null; // Valid
  };
}

export function quantityValidator(productQuantity?: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const quantity = control.value;
    if (productQuantity !== undefined && quantity > productQuantity) {
      return { 'exceeded': true }; // Quantity exceeded the available quantity
    }
    return null;
  };
}

export function CustomerSelectedNameValidator(validOptions: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (value && validOptions.includes(value)) {
      return null; // Valid
    }
    return { invalidSupplier: true }; // Invalid
  };
}

export function SelectedpaymentTypeValidator(validOptions: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (value && validOptions.includes(value)) {
      return null; // Valid
    }
    return { invalidSupplier: true }; // Invalid
  };
}

export function SelectedPaymentStatusValidator(validOptions: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (value && validOptions.includes(value)) {
      return null; // Valid
    }
    return { invalidSupplier: true }; // Invalid
  };
}

export function SelectedTransactionType(validOptions: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (value && validOptions.includes(value)) {
      return null; // Valid
    }
    return { invalidSupplier: true }; // Invalid
  };
}

export function SelectedOrderStatus(validOptions: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (value && validOptions.includes(value)) {
      return null; // Valid
    }
    return { invalidSupplier: true }; // Invalid
  };
}

//---------------------------------------------------------------------------------------------------------------------------

//validator for contact person that will accept only alpha and '-'. max of 50 characters
export function ContactPersonValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value || !/^[A-Za-z\s-]{1,50}$/.test(value)) {
      return { invalidLastName: true }; // Invalid
    }
    return null; // Valid
  };
}

//---------------------------------------------------------------------------------------------------------------------------

//validator for email
export function EmailValidatorl(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      console.log('email valid');
      return null; // Valid
    }
    return { invalidEmailAddress: true }; // Invalid
  };
}

//---------------------------------------------------------------------------------------------------------------------------

//validator for cellphone number that will accept only numerical, minimum of 10, and max of 12.
export function CellphoneValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (/^\d{10,12}$/.test(value)) {
      return null; // Valid
    }
    return { invalidCellphoneNumber: true }; // Invalid
  };
}


export function PinCodeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (value && /^\d+$/.test(value)) {
      return null; // Valid
    }
    return { invalidPinCode: true }; // Invalid
  };
}

export function UserIdValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (value && /^\d+$/.test(value)) {
      return null; // Valid
    }
    return { invalidPinCode: true }; // Invalid
  };
}

export function UserNameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value || !/^[A-Za-z-\s]{1,50}$/.test(value)) {
      return { invalidUserName: true }; // Invalid
    }
    return null; // Valid
  };
}

export function UserRoleValidator(validOptions: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (value && validOptions.includes(value)) {
      return null; // Valid
    }
    return { invalidUserRole: true }; // Invalid
  };
}

//---------------------------------------------------------------------------------------------------------------------------

//validator for cellphone number that will accept only numerical, minimum and maximum of 10.
export function TelephoneValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (/^\d{10,12}$/.test(value)) {
      return null; // Valid
    }
    return { invalidTelephoneNumber: true }; // Invalid
  };
}

//---------------------------------------------------------------------------------------------------------------------------

//Validator for terms of payment that will only accept enum values of 10 days, 15 days, and 20 days.
export function TermsofPaymentValidator(): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const validValue = ['None','10 Days', '15 Days', '30 Days'];
    if (value && validValue.includes(value)) {
      return null; // Valid

    }
      return { invalidTermsofPayment: true }; // Invalid
  };
}

//---------------------------------------------------------------------------------------------------------------------------

export function PaymentOptionValidator(validOptions: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (value && validOptions.includes(value)) {
      return null; // Valid
    }
    return { invalidPaymentOption: true }; // Invalid
  };
}

//---------------------------------------------------------------------------------------------------------------------------

export function ModeofPaymentValidator(): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const validValue = ['Cash', 'E-Wallet', 'Online Banking', 'Cheque'];
    if (value && validValue.includes(value)) {
      return null; // Valid
    }
      return { invalidModeofPayment: true }; // Invalid
  };
}

//---------------------------------------------------------------------------------------------------------------------------

//validator for supplier address that allows alphanumeric characters, spaces, dashes, dots, commas, hash symbols, and slashes in the address.
export function SupplierAddressValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    // Check if the value is provided and does not contain potentially harmful characters
    if (!value || /^[a-zA-Z0-9\s\-\.,#\/]+$/.test(value)) {
      return null; // Valid
    }

    return { invalidSupplierAddress: true }; // Invalid
  };
}

//---------------------------------------------------------------------------------------------------------------------------

export function SupplierValidator(validOptions: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (value && validOptions.includes(value)) {
      return null; // Valid
    }
    return { invalidSupplier: true }; // Invalid
  };
}

//---------------------------------------------------------------------------------------------------------------------------

export function ProductBrandValidator(validOptions: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (value && validOptions.includes(value)) {
      return null; // Valid
    }
    return { invalidProductBrand: true }; // Invalid
  };
}

//---------------------------------------------------------------------------------------------------------------------------

export function ProductBrandNameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    // Check if the value is provided and does not contain potentially harmful characters
    if (!value || /^[a-zA-Z0-9 ]+$/.test(value)) {
      return null; // Valid
    }

    return { invalidBrandName: true }; // Invalid
  };
}

//---------------------------------------------------------------------------------------------------------------------------

export function ProductCategoryValidator(validOptions: string[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (value && validOptions.includes(value)) {
      return null; // Valid
    }
    return { invalidProductCategory: true }; // Invalid
  };
}

//---------------------------------------------------------------------------------------------------------------------------

export function ProductCategoryNameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    // Check if the value is provided and does not contain potentially harmful characters
    if (!value || /^[a-zA-Z0-9\s\-\.,#\/]+$/.test(value)) {
      return null; // Valid
    }

    return { invalidCategoryName: true }; // Invalid
  };
}

//---------------------------------------------------------------------------------------------------------------------------

export function ProductPriceValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (value && /^\d+(\.\d{1,2})?/.test(value)) {
      return null; // Valid
    }
    return { invalidProductPrice: true }; // Invalid
  };
}

export function ProductSellingPriceValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (value && /^\d+(\.\d{1,2})?/.test(value)) {
      return null; // Valid
    }
    return { invalidProductSellingPrice: true }; // Invalid
  };
}

// export function createPriceValidator(pattern: RegExp, errorKey: string): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const value = control.value;
//     if (value && pattern.test(value)) {
//       return null; // Valid
//     }
//     return { [errorKey]: true }; // Invalid
//   };
// }

// export const ProductPriceValidator: ValidatorFn = createPriceValidator(/^\d+(\.\d{1,2})?$/, 'invalidProductPrice');
// export const ProductSellingPriceValidator: ValidatorFn = createPriceValidator(/^\d+(\.\d{1,2})?$/, 'invalidProductSellingPrice');


export function DiscountValueValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (value && /^\d+(\.\d{1,2})?/.test(value)) {
      return null; // Valid
    }
    return { invalidDiscountValue: true }; // Invalid
  };
}



//---------------------------------------------------------------------------------------------------------------------------

export function TransactioNameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value || !/^[A-Za-z-\s]{1,50}$/.test(value)) {
      return { invalidTransactionName: true }; // Invalid
    }
    return null; // Valid
  };
}

export function DiscountNameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value || !/^[A-Za-z-\s]{1,50}$/.test(value)) {
      return { invalidDiscountName: true }; // Invalid
    }
    return null; // Valid
  };
}

//---------------------------------------------------------------------------------------------------------------------------

export function UnitNameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (value) {
      return null; // Valid
    }
    return { invalidUnitName: true }; // Invalid
  };
}

export function DiscountCategoryValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (value) {
      return null; // Valid
    }
    return { invalidDiscountCategory: true }; // Invalid
  };
}

export function DiscountValueTypeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (value) {
      return null; // Valid
    }
    return { invalidDiscountValueType: true }; // Invalid
  };
}

export function UnitsofMeasurementNameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    // Check if the value is provided and does not contain potentially harmful characters
    if (!value || /^[a-zA-Z0-9\s\-\.,#\/]+$/.test(value)) {
      return null; // Valid
    }

    return { invalidUnitsOfMeasurement: true }; // Invalid
  };
}

export function AbbreviationValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    // Check if the value is provided and does not contain potentially harmful characters
    if (!value || /^[a-zA-Z0-9\s\-\.,#\/]+$/.test(value)) {
      return null; // Valid
    }

    return { invalidAbbreviation: true }; // Invalid
  };
}

export function DateReceivedValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value) {
      return null;
    }
      return { invalidDateReceived: true }; // Invalid if the date is in the future
  };
}

export function StartDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value) {
      return null;
    }
      return { invalidStartDate: true }; // Invalid if the date is in the future
  };
}

export function EndDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value) {
      return null;
    }
      return { invalidEndDate: true }; // Invalid if the date is in the future
  };
}

//---------------------------------------------------------------------------------------------------------------------------

export function QuantityValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (value && /^\d+(\.\d{1,2})?/.test(value)) {
      return null; // Valid
    }
    return { invalidQuantity: true }; // Invalid
  };
}

//---------------------------------------------------------------------------------------------------------------------------

export function TransactionTypeValidator(): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const validValue = ['Delivery', 'Direct Purchase'];
    if (value && validValue.includes(value)) {
      return null; // Valid
    }
      return { invalidTransactionType: true }; // Invalid
  };
}

export function TransactionDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value) {
      return null;
    }
      return { invalidTransactionDate: true }; // Invalid if the date is in the future
  };
}

//---------------------------------------------------------------------------------------------------------------------------

export function descriptionValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value || !/^[A-Za-z-\s]{1,255}$/.test(value)) {
      return { invalidDescription: true }; // Invalid
    }
    return null; // Valid
  };
}

//---------------------------------------------------------------------------------------------------------------------------

export function remarksValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value || !/^[A-Za-z-\s]{1,255}$/.test(value)) {
      return { invalidRemarks: true }; // Invalid
    }
    return null; // Valid
  };
}

//---------------------------------------------------------------------------------------------------------------------------

//validator for password containing a mix of uppercase and lowercase letters, numbers, and special characters
export function StrongPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.value as string;

    if (!password) {
      return null; // Return null if the password is not provided
    }

    // Regular expressions for password strength criteria
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

    const isValid = hasUppercase && hasLowercase && hasNumber && hasSpecialCharacter;

    // If the password meets all criteria, return null (valid), otherwise return an error object
    // return isValid ? null : { 'invalidPassword': true };
    if (isValid) {
        console.log('valid password')
        return null; // Valid
      }

    console.log('invalid password')
    return { 'invalidPassword': true }; // Invalid
  };
}

