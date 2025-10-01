import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  projectData: any = null;

  // ---------------- Gallery ----------------
  galleryImages: string[] = ['pt1.jpg','pt2.jpg','pt3.jpg','pt4.jpg','pt5.jpg','pt6.jpg'];
  lightboxOpen: boolean = false;
  currentIndex: number = 0;

  openLightbox(index: number) {
    this.currentIndex = index;
    this.lightboxOpen = true;
  }

  closeLightbox() {
    this.lightboxOpen = false;
  }

  prevImage(event: Event) {
    event.stopPropagation();
    this.currentIndex = (this.currentIndex - 1 + this.galleryImages.length) % this.galleryImages.length;
  }

  nextImage(event: Event) {
    event.stopPropagation();
    this.currentIndex = (this.currentIndex + 1) % this.galleryImages.length;
  }

  // ---------------- Layout ----------------
  layoutImages: any[] = [
    { img: 'assets/images/lo1.jpg', title: '1 Bedroom, 1 Bathroom', info: 'Compact and cozy layout suitable for singles or couples.' },
    { img: 'assets/images/lo2.jpg', title: '2 Bedroom, 2 Bathroom', info: 'Comfortable layout for small families with ample space.' },
    { img: 'assets/images/lo3.jpg', title: '3 Bedroom, 2 Bathroom', info: 'Spacious layout for families, includes living and dining areas.' }
  ];
  layoutLightboxOpen: boolean = false;
  layoutIndex: number = 0;

  openLayout(index: number) {
    this.layoutIndex = index;
    this.layoutLightboxOpen = true;
  }

  closeLayout() {
    this.layoutLightboxOpen = false;
  }

  prevLayout(event: Event) {
    event.stopPropagation();
    this.layoutIndex = (this.layoutIndex - 1 + this.layoutImages.length) % this.layoutImages.length;
  }

  nextLayout(event: Event) {
    event.stopPropagation();
    this.layoutIndex = (this.layoutIndex + 1) % this.layoutImages.length;
  }

  // ---------------- JSON Data ----------------
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('assets/general.json')
      .pipe(catchError(err => { console.error(err); return of(null); }))
      .subscribe(res => {
        if (res?.content) this.projectData = res.content;
      });
  }

  // ---------------- Navbar Scroll & Active Link ----------------
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    if (!navbar) return;

    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;

      const section = document.querySelector(href) as HTMLElement;
      if (section) {
        const top = section.offsetTop - 60;
        const bottom = top + section.offsetHeight;
        if (window.scrollY >= top && window.scrollY < bottom) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  }

  // ---------------- Register Form ----------------
  onSubmitForm(form: any) {
    console.log('Form submitted:', form.value);
    alert('Form submitted successfully!');
  }

  onContactMe() {
    console.log('Contact Me button clicked');
    alert('Contact Me clicked!');
  }

}
