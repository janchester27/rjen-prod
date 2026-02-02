interface ErrorMessages {
  invalidSupplierName: string;
  invalidContactPerson: string;
  invalidEmailAddress: string;
  invalidCellphoneNumber: string;
  invalidTelephoneNumber: String;
  invalidTermsofPayment: String;
  InvalidModeofPayment: String;
  invalidPaymentOption: String;
  invalidSupplierAddress: string;
  invalidProductPrice: string;
  invalidProductName: string;
  invalidProductCategory: string;
  invalidBrandName: string;
  invalidSupplier: string;
  invalidProductNameBrand: string;
  invalidCategoryName: string;
  invalidCustomerName: string;
  invalidquantity: string;
  invalidUnitName: string;
  invalidTransactionType: string;
  invalidDescription: string;
  invalidDeliveredBy: string;
  invalidRecievedBy: string;
  invalidTransactionDate: string;
  invalidRemarks: string;
  invalidQuantity: string;
  invalidSellingPrice: string;
  invalidDateReceived: string;
  invalidUnitsOfMeasurement: string;
  invalidAbbreviation: string;
  invalidDiscountValue: string;
  invalidDiscountName: string;
  invalidDiscountCaegory: string;
  invalidDiscountValueType: string;
  invalidStartDate: string;
  invalidEndDate: string;
  invalidDateOrdered: string;
  invalidSelectedCustomerName: string;
  invalidSelectedTransactionType: string;
  invalidTransactionStatus: string;
  invalidPaymentType: string;
  invalidSelectedDiscount: string;
  invalidSelectedUser: string;
  invalidUserId: string;
  invalidPinCode: string;
  invalidUserName: string;
  invalidUserRole: string;
  invalidPassword: string;
}

const errorMessages: ErrorMessages = {
invalidUserId: 'Must be numeric',
invalidSelectedCustomerName: 'Must select from the option',
invalidSelectedUser: 'Must select from the option',
invalidPinCode: 'Must be numeric and minimum and maximum length of 6',
invalidSelectedTransactionType: 'Must select from the option',
invalidTransactionStatus: 'Must select from the option',
invalidPaymentType: 'Must select from the option',
invalidEndDate: 'Must select date',
invalidStartDate: 'Must select date',
invalidDiscountValue: 'Must be numeric',
invalidDiscountValueType: 'Must select from the option',
invalidDateOrdered: 'Must select date',
  invalidSupplierName: 'Must contain only letters and dashes, maximum 50 characters.',
  invalidContactPerson: 'Must contain only letters and dashes, maximum 50 characters.',
  invalidProductNameBrand: 'Can only contain letters, numbers, spaces, dashes, dots, commas, hash symbols, and slashes.',
  invalidEmailAddress: 'Invalid email address.',
  invalidCellphoneNumber: 'Must be numeric, 10 digits.',
  invalidTelephoneNumber: 'Must be numeric, 10 digits.',
  invalidSupplierAddress: 'Can only contain letters, numbers, spaces, dashes, dots, commas, hash symbols, and slashes.',
  invalidTermsofPayment: 'Must select from the option',
  InvalidModeofPayment: 'Must select from the option',
  invalidPaymentOption: 'Must select from the option',
  invalidBrandName: 'Must select from the option',
  invalidProductCategory: 'Must select from the option',
  invalidProductName: 'Must contain only letters and dashes, maximum 50 characters.',
  invalidCategoryName: 'Must contain only letters and dashes, maximum 50 characters.',
  invalidProductPrice: 'Must be numeric',
  invalidSupplier: 'Must select from the option',
  invalidCustomerName: 'Must contain only letters and dashes, maximum 50 characters.',
  invalidDeliveredBy: 'Must contain only letters and dashes, maximum 50 characters.',
  invalidquantity: 'Must be numeric',
  invalidRecievedBy: 'Must contain only letters and dashes, maximum 50 characters.',
  invalidRemarks: 'Letters, numbers, spaces, commas, periods, or dashes only. Max 255 characters.',
  invalidDescription: 'Letters, numbers, spaces, commas, periods, or dashes only. Max 255 characters.',
  invalidTransactionDate: '',
  invalidTransactionType: 'Must select from the option',
  invalidUnitName: 'Must contain only letters and dashes, maximum 50 characters.',
  invalidQuantity: 'Must be numeric',
  invalidSellingPrice: 'Must be numeric',
  invalidDateReceived: 'Must select date',
  invalidUnitsOfMeasurement: 'Cannot be empty',
  invalidAbbreviation: 'Cannot be empty',
  invalidDiscountCaegory: 'Must select from the option',
  invalidDiscountName: 'Must contain only letters and dashes, maximum 50 characters.',
  invalidSelectedDiscount: 'Must select from the option',
  invalidUserName: 'Must contain only letters and dashes, maximum 50 characters.',
  invalidUserRole: 'Must select from the option',
  invalidPassword: 'Must contain uppercase, lowercase letters, numbers, and special characters.',

};

export const ERROR_MESSAGES: Readonly<ErrorMessages> = Object.freeze(errorMessages);
