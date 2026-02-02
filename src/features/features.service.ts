import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, retry, throwError, Observable } from 'rxjs';
import { environment } from '../app/environments/environment.development';

interface Environment {
  production: boolean;
  apiURL: string;
  tkn: string;
  user_id: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class FeaturesService {

  environmentTyped = environment as Environment;

  token: any;
  userId: any;
  search:any;
  suppliesId: any;
  transactionId: any;

  getOverallProductURL = this.environmentTyped.apiURL + 'cashier/products/all'
  getAllDiscountURL = this.environmentTyped.apiURL + 'cashier/discount/all'
  getAllCustomerURL = this.environmentTyped.apiURL + 'cashier/customer/all'
  getAllProductURL = this.environmentTyped.apiURL + 'cashier/products/all'
  getCustomerNamesURL = this.environmentTyped.apiURL + 'cashier/customer/names'
  addOrdersURL = this.environmentTyped.apiURL + 'cashier/order/addOrder'
  varifyVoidPincodeURL = this.environmentTyped.apiURL + 'cashier/void/pincode/verify'
  cashierGetAllDiscountsURL = this.environmentTyped.apiURL + 'cashier/discounts'
  sendEmailVerificationURL = this.environmentTyped.apiURL + 'admin/sendEmailVerification'
  verifyEmailURL = this.environmentTyped.apiURL + 'cashier/verifyEmail'
  resetPasswordURL = this.environmentTyped.apiURL + 'cashier/password/reset'
  resetPinCode = this.environmentTyped.apiURL + 'cashier/void/pincode/reset'


  constructor(private http:HttpClient) {
    this.token = sessionStorage.getItem('token')
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }


  getHeaders(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  getAllOverallProduct(keyword:string){
    const customerId = sessionStorage.getItem('product_id')
    let options = {headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization':this.token})};
    return this.http.get(`${this.getOverallProductURL}?keyword=${keyword}`, options).pipe(
      map(data => data),
      retry(1),
      catchError(this.handleError)
    );
  }

  getAllDiscount(pageNo: number, pageSize: number, keyword: string): Observable<any[]> {
    const discountId = sessionStorage.getItem('discount_id');
    let options = { headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token}) };
    return this.http.get<any[]>(`${this.getAllDiscountURL}?pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`, options).pipe(
      map(data => data), // Ensure data is correctly mapped to the expected structure
      retry(1),
      catchError(this.handleError)
    );
  }

  cashierGetAllDiscount(): Observable<any[]> {
    const discountId = sessionStorage.getItem('discount_id');
    let options = { headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token}) };
    return this.http.get<any[]>(`${this.cashierGetAllDiscountsURL}`, options).pipe(
      map(data => data), // Ensure data is correctly mapped to the expected structure
      retry(1),
      catchError(this.handleError)
    );
  }

  getAllCustomer(pageNo:number, pageSize:number, keyword:string){
    const customerId = sessionStorage.getItem('customer_id')
    let options = {headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization':this.token})};
    return this.http.get(`${this.getAllCustomerURL}?pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`, options).pipe(
      map(data => data),
      retry(1),
      catchError(this.handleError)
    );
  }

  getAllProduct(pageNo:number, pageSize:number, keyword:string){
    const customerId = sessionStorage.getItem('product_id')
    let options = {headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization':this.token})};
    return this.http.get(`${this.getAllProductURL}?pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`, options).pipe(
      map(data => data),
      retry(1),
      catchError(this.handleError)
    );
  }

  getCustomerNames(){
    console.log(this.getCustomerNamesURL)
    let headers = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token}),
    }
    return this.http.get<any>(`${this.getCustomerNamesURL}`, headers).pipe(
      map((data) => data),
      retry(1),
      catchError(this.handleError)
    );
  }
  addOrder(form: any){
    console.log(this.addOrdersURL)
    let headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token }),
    };
    return this.http.post<any>(this.addOrdersURL, form, headers).pipe(
      map((data) => data),
      retry(1),
      catchError(this.handleError)
    );
  }

  verifyPinCode(form: any){
    console.log(this.varifyVoidPincodeURL)
    let headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token }),
    };
    return this.http.post<any>(this.varifyVoidPincodeURL, form, headers).pipe(
      map((data) => data),
      retry(1),
      catchError(this.handleError)
    );
  }


  sendEmailVerification(form: any){
    console.log(this.sendEmailVerificationURL)
    let headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token }),
    };
    return this.http.post<any>(this.sendEmailVerificationURL, form, headers).pipe(
      map((data) => data),
      retry(1),
      catchError(this.handleError)
    );
  }

  verifyEmail(form: any){
    console.log(this.verifyEmailURL)
    let headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token }),
    };
    return this.http.post<any>(this.verifyEmailURL, form, headers).pipe(
      map((data) => data),
      retry(1),
      catchError(this.handleError)
    );
  }

  resetPassword(form: any){
    console.log(this.resetPasswordURL)
    let headers = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token }),
    };
    return this.http.post<any>(this.resetPasswordURL, form, headers).pipe(
      map((data) => data),
      retry(1),
      catchError(this.handleError)
    );
  }
}
