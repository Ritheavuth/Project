import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from 'src/models/country';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private http: HttpClient) { }

  getCountry() {
    return this.http.get<Country[]>('http://localhost:3000/country').pipe(map(res => {return res}));
  }

  addCountry(country : Country) {
    return this.http.post<Country>('http://localhost:3000/country', country).pipe(map(res => {return res}));
  }

  editCountry(country : Country) {
    return this.http.put<Country>('http://localhost:3000/country/' + country.id, country).pipe(map(res => {return res}));
  }

  deleteCountry(id : string) {
    return this.http.delete<Country>('http://localhost:3000/country/' + id).pipe(map(res => {return res}));
  }

  deleteAllCountry() {
    return this.http.delete<Country[]>('http://localhost:3000/country').pipe(map(res => {return res}));
  }
}
