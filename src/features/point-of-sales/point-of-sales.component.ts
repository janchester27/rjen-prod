import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  TemplateRef,
  AfterViewChecked,
  AfterViewInit,
  Renderer2,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, FormControl } from '@angular/forms';
import { FeaturesService } from '../features.service';
import { maxQuantityValidator } from '../../app/shared/validators/validators';
import { StringNullableChain, debounce } from 'lodash';
import { DialogService } from 'primeng/dynamicdialog';
import { VoidComponent } from '../void/void.component';
import { ERROR_MESSAGES } from '../../app/shared/constants/constants';
import { UserIdValidator, PinCodeValidator } from '../../app/shared/validators/validators';
import { SuccessDialogComponent } from '../../app/shared/dialog/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../app/shared/dialog/error-dialog/error-dialog.component';
import moment from 'moment';

interface Product {
  product_id: number;
  product_name: string;
  selling_price: number;
  quantity: number;
  unit_name: string;
  brand_name: string;
  price: number;
  disabled?: boolean;
}

interface DataSource {
  data: Product[];
}

interface User {
  user_id: number;
  user_name: string;
}

@Component({
  selector: 'app-point-of-sales',
  templateUrl: './point-of-sales.component.html',
  styleUrl: './point-of-sales.component.css'
})
export class PointOfSalesComponent implements OnInit {

  customerNames: any[] = []
  existingCustomer: any[] = [];
  discountNames: any[] = []
  existingDiscount: any[] = [];
  // dataSource: any[] = [];
  productsName: Product[] = [];
  selectedDiscount: any = null;
  selectedCustomer: any = null;
  transacDate: Date = new Date;
  dataSource: DataSource = {
    data: [], // Initialize with an empty array
  };
  pageNo: number = 1;
  pageSize: number = Number.MAX_SAFE_INTEGER;
  total: number = 0;
  dataFiles: any;
  keyword: string = '';
  isDialogOpen: boolean = false;
  paidAmount: number = 0;
  remainingAmount: number = 0;
  piForms!: FormGroup;
  suppliesForm!: FormGroup;
  pincode!: string;
  username!: string;
  userName: User[] = [];
  isSmallScreen: boolean = false;
  ispiFormEditable: boolean = true;
  orderdate!: string;
  isliFormEditable: boolean = true;
  iscredsFormEditable: boolean = true;
  public index: number = 0;
  isCloseHovered: boolean = false;
  user_id: any = sessionStorage.getItem('user_id')
  disabledRows: Map<number, boolean> = new Map<number, boolean>();
  @Output() verificationResult: EventEmitter<boolean> = new EventEmitter<boolean>();
  displayDialog: boolean = false;

  @ViewChild('searchbox') myInputField!: ElementRef;
  @ViewChild('searchbox') searchbox!: ElementRef<HTMLInputElement>;
  @ViewChild('customerDropdown') customerDropdown!: ElementRef<HTMLElement>;
  @ViewChild('discountDropdown') discountDropdown!: ElementRef<HTMLElement>;
  @ViewChild('calculator') calculator!: ElementRef<HTMLElement>;
  @ViewChild('paidAmounts') paidAmounts!: ElementRef<HTMLElement>;
  @ViewChild('quantity') quantity!: ElementRef<HTMLElement>;
  @ViewChild('headerComponent') headerComponent!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    this.applyFilter = debounce(this.applyFilter, 2000);
    this.getAllProduct(this.keyword);
    this.getCustomerName();
    this.getDiscountName();
    this.suppliesForm = this.fb.group({
      supplies: this.fb.array([]),
    });

    this.piForms = this.fb.group({
      unCtrl: ['', [Validators.required, UserIdValidator]],
      pcCtrl: ['', [Validators.required, PinCodeValidator]],
    });

    this.supplies.valueChanges.subscribe(() => {
      this.cd.detectChanges(); // Trigger change detection when supplies change
    });
  }

  invalidUserId = ERROR_MESSAGES.invalidUserId;
  invalidPinCode = ERROR_MESSAGES.invalidPinCode;

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called');
    console.log('searchbox:', this.searchbox);
    this.focusOnInputField();
    this.addGlobalClickListener();
  }

  constructor(private service: FeaturesService,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private renderer: Renderer2,) {
    this.suppliesForm = this.fb.group({
      supplies: this.fb.array([this.createSupply()])
    });
  }

  isProductRow(supply: any): boolean {
    return supply.get('product_name')?.value !== null;
  }

  isBrandRow(supply: any): boolean {
    return supply.get('brand_name')?.value !== null;
  }

  get supplies(): FormArray {
    return this.suppliesForm.get('supplies') as FormArray;
  }

  addGlobalClickListener() {
    this.renderer.listen('document', 'click', (event) => {
      const target = event.target as HTMLElement;
      if (!this.isDialogOpen && !target.classList.contains('focusable') && !this.searchbox.nativeElement.contains(target) &&
        !this.customerDropdown.nativeElement.contains(target) &&
        !this.discountDropdown.nativeElement.contains(target) &&
        !this.calculator.nativeElement.contains(target) &&
        !this.paidAmounts.nativeElement.contains(target)) {
        this.searchbox.nativeElement.focus();
      }
    });
  }




  onVirtualKeyPress(key: string): void {
    const currentInput = this.searchbox.nativeElement;

    if (key === 'Delete') {
      currentInput.value = currentInput.value.slice(0, -1);
    } else {
      currentInput.value += key;
    }

    // Automatically apply the filter after each key press
    this.applyFilter(currentInput.value, currentInput);
  }

  focusOnInputField(): void {
    setTimeout(() => {
      if (this.searchbox?.nativeElement) {
        this.searchbox.nativeElement.focus();
      } else {
        console.error('searchbox or nativeElement is undefined');
      }
    }, 0);
  }

  getCustomerName() {
    this.service.getCustomerNames().subscribe(
      (response: any) => {
        if (response && Array.isArray(response)) {
          this.customerNames = response.map((customer: any) => ({
            customer_id: customer.customer_id,
            name: customer.customer_name
          }));
          this.existingCustomer = [...this.customerNames];
          this.dataSource.data = [...this.customerNames];
          console.log('customer names:', this.customerNames);
        } else {
          this.dataSource.data = [];
          this.total = 0;
        }
      },
      (error) => {
        console.error('Error fetching customers:', error);
      }
    );
  }


  getDiscountName() {
    this.service.cashierGetAllDiscount().subscribe(
      (response: any) => {
        if (response && response.discounts && Array.isArray(response.discounts)) {
          this.discountNames = response.discounts.map((discount: any) => ({
            discount_id: discount.discount_id,
            name: discount.discount_name,
            discount_value: discount.discount_value // Add the discount value here
          }));
          this.existingDiscount = [...this.discountNames];
          this.dataSource.data = [...this.discountNames];
          console.log('discount names:', this.discountNames);
        } else {
          this.dataSource.data = [];
          this.total = 0;
        }
      },
      (error) => {
        console.error('Error fetching discounts:', error);
      }
    );
  }

  onDiscountChange(event: any): void {
    this.selectedDiscount = event.value; // Update the selected discount
    this.calculateTotalAmount(); // Recalculate the total
    console.log('Selected discount:', this.selectedDiscount);
  }

  // Method to format the discount value with a '%' sign
  formatDiscountValue(value: number | undefined): string {
    return value !== undefined && value !== null ? `${value}%` : '';
  }

  getAllProduct(keyword: string) {
    let token = sessionStorage.getItem('token');
    this.service
      .getAllOverallProduct(keyword)
      .subscribe((data: any) => {
        this.dataFiles = data.products;
        this.total = data.totalResults;
        this.dataSource.data = data.products;
        this.service.search = data.result;
        console.log(data)
      });
  }


  applyFilter(value: string, searchbox: HTMLInputElement) {
    this.keyword = value.trim().toLowerCase();

    // Only filter if the keyword matches a complete product_id
    const filteredData = this.dataFiles.filter((product: Product) =>
      product.product_id.toString().toLowerCase() === this.keyword
    );

    if (filteredData.length > 0) {
      this.populateFormWithRowData(filteredData[0]);
    }

    searchbox.value = '';
    this.dataSource.data = this.dataFiles; // Resetting dataSource data after filtering
  }

  calculateTotalPrice(supply: AbstractControl) {
    const quantity = supply.get('quantity')?.value;
    const sellingPrice = supply.get('selling_price')?.value;
    const discountValue = supply.get('discount_value')?.value || 0;
    return (quantity * sellingPrice) - discountValue;

  }

  populateFormWithRowData(row: any): void {
    const existingRow = this.supplies.controls.find((control: AbstractControl) =>
      control.get('product')?.value === row.product_id
    );

    if (existingRow) {
      const currentQuantity = existingRow.get('quantity')?.value || 0;
      existingRow.get('quantity')?.setValue(currentQuantity + 1);
      return;
    }

    const supplyFormGroup = this.createSupply();
    supplyFormGroup.get('product')?.setValue(row.product_id);
    supplyFormGroup.get('product_name')?.setValue(row.product_name);
    supplyFormGroup.get('selling_price')?.setValue(row.selling_price);
    supplyFormGroup.get('price')?.setValue(row.price);
    supplyFormGroup.get('quantity')?.setValue(1);
    this.supplies.push(supplyFormGroup);

    this.cd.detectChanges();
    this.subscribeToSupplyChanges();
    this.disableProductRow(row);

    // Update total amount after adding supply
    this.total = this.calculateTotalAmount();
  }

  disableProductRow(row: any): void {
    if (row && row.product_id) {
      this.disabledRows.set(row.product_id, true);
      this.updateProductRowsState();
    }
  }

  enableProductRow(productId: number): void {
    if (this.disabledRows.has(productId)) {
      this.disabledRows.delete(productId);
      this.updateProductRowsState();
    }
  }

  createSupply(product: Product | null = null, discountId: number | null = null): FormGroup {
    return this.fb.group({
      product: ['', Validators.required],
      product_name: ['', Validators.required],
      brand_name: ['', Validators.required],
      unit_name: ['', Validators.required],
      selling_price: ['', Validators.required],
      price: ['', Validators.required],
      quantity: [[Validators.required, Validators.min(1)]],
      date: [new Date()],
      max_quantity: ['']
    });
  }

  addSupply(product: Product): void {
    const supplies = this.suppliesForm.get('supplies') as FormArray;
    const existingSupplyIndex = supplies.controls.findIndex((supply) =>
      supply.get('product')?.value.product_id === product.product_id
    );

    if (existingSupplyIndex !== -1) {
      // If the product already exists in the form, increment its quantity
      const existingSupply = supplies.at(existingSupplyIndex);
      const currentQuantity = existingSupply.get('quantity')?.value;
      existingSupply.get('quantity')?.setValue(currentQuantity + 1);
    } else {
      // If the product does not exist in the form, add a new row
      supplies.push(this.createSupply(product));
    }

    // Update total amount after adding or modifying supply
    this.total = this.calculateTotalAmount();
  }

  isSupplyInForm(productId: number): boolean {
    const supplies = this.suppliesForm.get('supplies') as FormArray;
    return supplies.controls.some((supply) => supply.get('product')?.value.product_id === productId);
  }

  removeSupply(index: number): void {
    const supplyGroup = this.supplies.at(index);
    const productId = supplyGroup.get('product')?.value;

    if (productId) {
      this.enableProductRow(productId);
    }

    this.supplies.removeAt(index);
  }

  incrementQuantity(index: number): void {
    const supplyControl = this.supplies.at(index) as FormGroup;
    const quantityControl = supplyControl.get('quantity');
    if (quantityControl) {
      quantityControl.setValue(quantityControl.value + 1);
      this.updateTotalPrice(supplyControl);
    }
  }

  decrementQuantity(index: number): void {
    const supplyControl = this.supplies.at(index) as FormGroup;
    const quantityControl = supplyControl.get('quantity');
    if (quantityControl && quantityControl.value > 1) {
      quantityControl.setValue(quantityControl.value - 1);
      this.updateTotalPrice(supplyControl);
    }
  }

  subscribeToSupplyChanges() {
    this.supplies.valueChanges.subscribe((supplies) => {
      this.total = this.calculateTotalAmount();
      supplies.forEach((supply: any, index: number) => {
        const product = this.productsName.find(p => p.product_id === supply.product_id);
        if (product) {
          this.supplies.at(index).get('quantity')?.setValidators([
            Validators.required,
            maxQuantityValidator(product.quantity)
          ]);
          this.supplies.at(index).get('quantity')?.updateValueAndValidity();
        }
      });
    });
  }

  updateProductRowsState(): void {
    this.dataSource.data = this.dataSource.data.map((product: Product) => ({
      ...product,
      disabled: this.disabledRows.get(product.product_id) ?? false,
    }));
    this.cd.detectChanges();
  }

  onPaidAmountChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.paidAmount = Number(input.value);
    if (this.remainingAmount < 0) {
      this.remainingAmount = 0;
    }
    this.calculateRemainingAmount();
  }

  calculateRemainingAmount(): void {
    if (this.paidAmount > 0) {
      this.remainingAmount = this.paidAmount - this.total;
    } else {
      this.remainingAmount = 0;
    }
  }

  calculateTotalAmount(): number {
    let total = 0;
    this.supplies.controls.forEach((supplyControl) => {
      const quantity = supplyControl.get('quantity')?.value;
      const price = supplyControl.get('selling_price')?.value;

      total += (quantity * price);
    });

    const discountAmount = total * (this.selectedDiscount?.discount_value || 0) / 100;
    this.total = total - discountAmount; // Apply the discount

    this.calculateRemainingAmount();
    return this.total;
  }

  updateTotalPrice(supplyControl: FormGroup): void {
    const quantity = supplyControl.get('quantity')?.value;
    const price = supplyControl.get('selling_price')?.value;
    const discountValue = supplyControl.get('discount_value')?.value || 0;
    const totalPrice = (quantity * price) - discountValue;
    supplyControl.get('total_price')?.setValue(totalPrice);

    // Update the total amount
    this.total = this.calculateTotalAmount();
  }

  showDialog() {
    this.displayDialog = true;
  }

  verifyPincode() {
    this.ispiFormEditable = false;
    this.isliFormEditable = false;
    this.iscredsFormEditable = false;

    const regdata = {
      "user_id": String(this.username),
      "pincode": String(this.pincode),
    }

    this.service.verifyPinCode(regdata).subscribe(
      (data) => {
        if (data.message === 'Invalid Pincode!') {
          this.openErrorDialog(data.message); // Display the error message
        } else {
          this.openSuccessDialog(); // Display the success dialog
          this.removeSupply(this.index);
          this.pinFormReset();
          this.displayDialog = false;
        }
      },
      (error) => {
        const errorMessage = error.error ? error.error.message : 'Something went wrong';
        this.openErrorDialog(errorMessage);
      }
    );

    console.log(regdata);
  }

  pinFormReset(): void {
    this.piForms.reset();
  }

  resetForm() {
    this.suppliesForm.reset();
    this.piForms.reset();
    this.selectedCustomer = null;
    this.selectedDiscount = null;
    this.total = 0;
    this.supplies.clear();
    this.paidAmount = 0;
    this.remainingAmount = 0;
    this.dataSource.data = []; // Clear the table data
    this.disabledRows.clear(); // Clear any disabled rows
    this.updateProductRowsState(); // Update the UI to reflect the reset
  }

  canSaveTransaction(): boolean {
    const hasSelectedCustomer = !!this.selectedCustomer;
    const hasSelectedDiscount = !!this.selectedDiscount;
    const hasSupplies = this.supplies.controls.length > 0;
    const isPaidAmountValid = this.paidAmount >= this.total;
    const isRemainingAmountValid = this.remainingAmount >= 0;  // Ensure remainingAmount is positive

    return hasSelectedCustomer && hasSelectedDiscount && hasSupplies && isPaidAmountValid && isRemainingAmountValid;
  }

  openSuccessDialog(): void {
    this.dialogService.open(SuccessDialogComponent, {
      width: '30%',
      data: { message: 'Order Successful' }
    });
  }

  openErrorDialog(message: string): void {
    this.dialogService.open(ErrorDialogComponent, {
      width: '300px',
      data: { errorMessage: message, message: 'Invalid Credentials!' }
    });
  }

  get pcCtrl() {
    return this.piForms.get('pcCtrl')
  }

  get unCtrl() {
    return this.piForms.get('unCtrl')
  }

  onInputChange(event: any, field: string): void {
    const input = event.target.value;
    const numberValue = input.replace(/[^0-9]/g, '');

    if (field === 'pincode') {
      this.pincode = numberValue;
      if (this.pcCtrl) {
        this.pcCtrl.setValue(this.pincode, { emitEvent: false });
      }
    } else if (field === 'username') {
      this.username = numberValue;
      if (this.unCtrl) {
        this.unCtrl.setValue(this.username, { emitEvent: false });
      }
    }
  }

  onSubmit() {

    // Map and collect order items from form controls
    const orderItems = this.supplies.controls.map(control => {
      const productId = control.get('product')?.value;
      const quantity = Number(control.get('quantity')?.value);
      const discountId = control.get('discount_name')?.value;
      const price = Number(control.get('price')?.value);
      const amount = this.calculateTotalPrice(control as FormGroup);
      const date = moment(control.get('date')?.value).format('YYYY-MM-DD');

      console.log('Control Values:', { productId, quantity, discountId, price, amount, date });

      return {
        "product_id": String(productId) || "",
        "quantity": quantity || "",
        "discount_id": String(this.selectedDiscount.discount_id),
        "amount": String(amount) || 0,
        "date": date,
        "created_by": this.user_id,
      };
    });

    console.log('Order Items before filtering:', orderItems);

    // Filter out invalid items
    const filteredTransactionItems = orderItems.filter(item => item.product_id);

    console.log('Filtered Order Items:', filteredTransactionItems);

    // Format the date and calculate the total amount
    const formattedDate = moment(this.orderdate).format('YYYY-MM-DD');
    const totalAmount = this.total;

    // Create payload
    const payload = {
      "customer_id": String(this.selectedCustomer.customer_id),
      "order_status": "Completed",
      "payment_type": "Cash",
      "payment_status": "Completed",
      "date": formattedDate,
      "total_amount": String(totalAmount),
      "remarks": "Not Available",
      "created_by": this.user_id,
      "order_items": filteredTransactionItems,
    };

    console.log('Payload:', payload);

    // Submit the order
    this.service.addOrder(payload).subscribe(
      (data) => {
        if (data.message === 'Successfully added all order items.') {
          // Display success messag e or navigate to another page
          this.printSmallReceipt();
          this.openSuccessDialog();
        } else {
          // Handle other cases, e.g., duplicate transaction
        }
      },
      (error) => {
        // Handle error
      }
    );
  }

  printSmallReceipt() {
    import('print-js').then((printJS) => {
      const printContent = document.getElementById('small-receipt-container')?.innerHTML;
      if (printContent) {
        printJS.default({
          printable: printContent,
          type: 'raw-html',
          style: `
    @page { margin: 0; }

    body {
      font-family: monospace;
      font-size: 10px;
      padding: 0;
      margin: 0;
      text-align: left;
    }

    #small-receipt-container {
      width: 200px;
      padding: 0;
      margin: 0 auto;
    }

    #small-receipt-container h2,
    #small-receipt-container h3 {
      font-size: 14px !important;
      margin: 2px 0;
      text-align: center;
    }

    #small-receipt-container p {
      text-align: center;
      margin: 2px 0;
    }

    #small-receipt-container table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px !important;
    }

    #small-receipt-container th,
    #small-receipt-container td {
      padding: 0;
      margin: 0;
      text-align: left;
    }

    #small-receipt-container strong {
      font-weight: bold;
    }
  `
        });
        console.log('Printed successfully');
        this.resetForm();
      } else {
        console.error('No content to print');
      }
    }).catch((error) => {
      console.error('Failed to load print-js or print:', error);
    });
  }

}
