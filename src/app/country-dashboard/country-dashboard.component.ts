import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountryService } from 'src/services/country.service';
import { Country } from 'src/models/country';

@Component({
  selector: 'app-country-dashboard',
  templateUrl: './country-dashboard.component.html',
  styleUrls: ['./country-dashboard.component.css']
})
export class CountryDashboardComponent implements OnInit {

  countryInfo !: FormGroup
  countryObj:Country = new Country();
  countryArray:Country[] = [];
  addVisible !: boolean;
  updateVisible !: boolean;
  constructor(private formbuilder:FormBuilder, private countryApi:CountryService, private router: Router) { }

  ngOnInit(): void {
    this.countryInfo = this.formbuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      code: ['', Validators.required],
    })
    this.getAllCountry();
  }

  logout () {
    this.router.navigate(['/login'])
  }

  addNewCountry() {
    this.countryObj.id = this.countryInfo.value.id;
    this.countryObj.name = this.countryInfo.value.name;
    this.countryObj.code = this.countryInfo.value.code;
    this.countryApi.addCountry(this.countryObj).subscribe(res => {
      alert('Country Added Successfully')
      this.getAllCountry();
      this.countryInfo.reset();
      this.router.navigate(['/country-dashboard'])
    }, err => {
      alert('Something went wrong')
    })
  }

  getAllCountry() {
    this.countryApi.getCountry().subscribe(res => {
      this.countryArray = res;
    })
  }

  deleteCountry(country: Country) {
    this.countryApi.deleteCountry(country.id).subscribe(res => {
      alert('Country Deleted Successfully')
      this.getAllCountry();
    })
  }

  editCountry(country: Country) {
    this.addVisible = false;
    this.updateVisible = true;
    this.countryInfo.controls['id'].setValue(country.id);
    this.countryInfo.controls['name'].setValue(country.name);
    this.countryInfo.controls['code'].setValue(country.code);
  }

  updateCountry() {
    this.countryObj.id = this.countryInfo.value.id;
    this.countryObj.name = this.countryInfo.value.name;
    this.countryObj.code = this.countryInfo.value.code;
    this.countryApi.editCountry(this.countryObj).subscribe(res => {
      alert('Country Updated Successfully')
      this.getAllCountry();
      this.countryInfo.reset();
      this.router.navigate(['/country-dashboard'])  
    })
  }

  disableUpdateButton() {
    this.addVisible = true;
    this.updateVisible = false;  
  }

  // disableAddButton() {
  //   this.addVisible = false;
  //   this.updateVisible = true;
  // }

  deleteAllCountry() {
    for (let i = 0; i < this.countryArray.length; i++) {
      this.countryApi.deleteCountry(this.countryArray[i].id).subscribe(res => {
        this.getAllCountry();
      })
      alert('Country Deleted Successfully')
    }
  }
}