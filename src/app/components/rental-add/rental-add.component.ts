import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Rental } from 'src/app/models/rental';

import { ResponseModel } from 'src/app/models/responseModel';
import { User } from 'src/app/models/user';
import { CarService } from 'src/app/services/car.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css'],
  providers: [DatePipe],
})
export class RentalAddComponent implements OnInit {
  rentalAddForm: FormGroup;
  rental:Rental;
  car: Car;
  userId: number;
  carId: number;
  rentalId: number;
  rentDate: Date;
  returnDate: Date;
  minDate: string | any;
  maxDate: string | null;
  firstDateSelected: boolean = false;
  dateAvailable: ResponseModel;
  user: User = new User();
  email = this.localStorageService.get('email');

  constructor(
    private carService: CarService,
    private datePipe: DatePipe,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private rentalService: RentalService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getEmail();
    this.createRentalAddForm();
    this.activatedRoute.params.subscribe((params) => {
      this.getCarDetailsByCarId(params['carId']);
    });
  }

  onChangeEvent(event: any) {
    this.minDate = event.target.value;
    this.firstDateSelected = true;
  }

  getRentMinDate() {
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    return this.minDate;
  }
  getReturnMinDate() {
    if (this.rentDate != undefined) {
      let stringToDate = new Date(this.rentDate);
      let new_date = new Date();
      new_date.setDate(stringToDate.getDate() + 1);
      return new_date.toISOString().slice(0, 10);
    } else {
      return this.rentDate;
    }
  }
  getReturnMaxDate() {
    this.maxDate = this.datePipe.transform(
      new Date(new Date().setFullYear(new Date().getFullYear() + 2)),
      'yyyy-MM-dd'
    );
    return this.maxDate;
  }
  getCarDetailsByCarId(carId: number) {
    this.carService.getCarDetailsByCarIdSingle(carId).subscribe((response) => {
      this.car = response.data;
    });
  }
  calculatePrice() {
    if (this.returnDate) {
      let returnDate = new Date(this.returnDate.toString());
      let rentDate = new Date(this.rentDate.toString());

      let returnDay = Number.parseInt(returnDate.getDate().toString());
      let rentDay = Number.parseInt(rentDate.getDate().toString());

      let returnMonth = Number.parseInt(returnDate.getMonth().toString());
      let rentMonth = Number.parseInt(rentDate.getMonth().toString());

      let returnYear = Number.parseInt(returnDate.getFullYear().toString());
      let rentYear = Number.parseInt(rentDate.getFullYear().toString());

      let result =(returnDay -rentDay +(returnMonth - rentMonth) * 30 +(returnYear - rentYear) * 365) *this.car.dailyPrice;

      if (result > 0) {
        return result;
      }
      this.toastrService.info(
        'Bu tarihler arasında arabayı kiralayamazsınız',
        'Geçersiz tarih seçimi'
      );
      return 0;
    } else {
      return this.car.dailyPrice;
    }
  }
  createRentalAddForm() {
    this.rentalAddForm = this.formBuilder.group({
      userId: ['', Validators.required],
      carId: ['', Validators.required],
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
    });
  }
  addRental() {
    if (this.rentalAddForm.valid) {
      let carModel = Object.assign({}, this.rentalAddForm.value);
      this.rentalService.add(carModel).subscribe((response) =>{
          this.toastrService.success(
            'Ödeme sayfasına yönlendiriliyorsunuz.',
            'Başarılı işlem'
          );
          this.router.navigate(['details/payment', this.car.id]);
        },
        (responseError) => {
          this.toastrService.error(
            responseError.error.message,
            'Doğrulama hatası'
          );
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }
  getEmail() {
    if (this.email) {
      this.userService.getByEmail(this.email).subscribe((response) => {
        this.user = response;
      });
    }
  }
}
