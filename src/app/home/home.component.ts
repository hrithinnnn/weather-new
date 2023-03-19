import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { debounceTime, filter } from 'rxjs';
import { API_KEY, API_URL } from '../api.config';

interface SearchResults {
  country: string,
  region: string,
  name: string,
  humidity:string
  url: string
}

interface Weather {
  current: {
    humidity:string,
    condition: {
      text: string,
      icon: string,
      
    },
    feelslike_c: number,
    temp_c: number,
  }
  location: {
    name: string
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  search = "";

  namee!: "";

  searchControl!: UntypedFormControl;

  results: SearchResults[] = [];

  weather: Weather | null = null;

  @ViewChild('menuTrigger') trigger!: MatMenuTrigger;

  @ViewChild('resultDiv') resultDiv!: ElementRef<HTMLDivElement>;

  searchURL = `${API_URL}/search.json?key=${API_KEY}`;

  weatherURL = `${API_URL}/forecast.json?key=${API_KEY}`;

  ipURL = `${API_URL}/forecast.json?key=${API_KEY}&q=auto:ip`;

  constructor(private http: HttpClient) { 

    this.searchControl = new UntypedFormControl('');

    this.searchControl.valueChanges.pipe(
      filter((val) => !!val),
      debounceTime(500)
    ).subscribe((val) => {

      this.searchCall(val);
      // this.trigger.openMenu();
    })
  }

  ngOnInit(): void {

    this.http.get(this.ipURL).subscribe((res) => {

      if(!res) return;

      this.weather = res as Weather;

      console.log(res);
    })
  }

  searchCall(search: string) {

    this.http.get(`${this.searchURL}&q=${search}`).subscribe((res) => {

      if(!res) return;

      this.results = res as SearchResults[];

      this.openResult();
    })
  }

  closeResult() {
    this.namee="";
    this.resultDiv.nativeElement.style.display = 'none';
  }

  openResult() {

    this.resultDiv.nativeElement.style.display = 'unset';
  }

  showWeather(url: string) {

    if(!url || url === "") return;

    this.http.get(`${this.weatherURL}&q=${url}`).subscribe((res) => {

      if(!res) return;

      this.weather = res as Weather;

    })
  }

  clickBody(event: MouseEvent) {

    if(!event.target) return;


    // console.log('event', event.target)

    // if(Array.from(this.resultDiv.nativeElement.children).includes(event.target as Element)) return;

    this.closeResult();
  }

}
