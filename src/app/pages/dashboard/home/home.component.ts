import { Component, OnInit } from '@angular/core';
import { CarouselImages } from 'src/app/consts/carousel-images';
import { Carousel } from 'src/app/models/carousel.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  images: Carousel[] = [];
  selectedIndex: number = 0;
  indicator: boolean = true;
  slide: boolean = true;

  constructor() {
    this.images = CarouselImages;
  }

  ngOnInit(): void {
    this.autoSlide();
  }

  selectImage(i: number) {
    this.selectedIndex = i;
  }

  autoSlide() {
    if(this.slide) {
      setInterval(() => {
        if(this.selectedIndex === this.images.length - 1) {
          this.selectedIndex = 0;
        }else {
          this.selectedIndex++;
        }
      },3000)
    }
  }

}
