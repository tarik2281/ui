import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-overview-app',
  templateUrl: './overview-app.component.html',
  styleUrls: ['./overview-app.component.scss']
})
export class OverviewAppComponent implements OnInit, AfterViewInit {

  // isSticky = false;

  // @ViewChild('sentinel', {static:false}) sentinelDom: ElementRef<HTMLDivElement>;

  @ViewChild('test', {static:false}) container: ElementRef<HTMLDivElement>;

  constructor() { }

  ngOnInit() {
    // window.scrollTo({top: 384});
  }

  ngAfterViewInit(): void {
    // const observer = new IntersectionObserver(entries => {
    //   if (entries[0].isIntersecting) {
    //     this.isSticky = false
    //   }
    //   else {
    //     this.isSticky = true
    //   }
    // });
    //
    // observer.observe(this.sentinelDom.nativeElement);
  }

  scroll() {
    this.container.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
  }
}
