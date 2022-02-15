import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from 'src/models/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getCountries() {}

  addCountry(country: Country) {}

  editCountry(country: Country) {}

  deleteCountry(country: Country) {}

}
