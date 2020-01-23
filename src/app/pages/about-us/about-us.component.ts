import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

interface Person {
  readonly img: string;
  readonly name: string;
  readonly description: string;
}

const PEOPLE: Person[] = [
  {
    img: 'assets/Entrepreneur and CEO Philipp.jpg',
    name: 'Philipp Dingelmann',
    description: 'Philipp ist der erste Gründer und CEO der SmarTIIS. Er zeichnet sich vor\n' +
      'allem durch seine Kreativität und seinen entrepreneurial Spirit aus. Er\n' +
      'hat BWL im Bachelor an der Uni Essen und dann im Master in Berlin\n' +
      'studiert. Nach seinem Studium arbeitete er 2 Jahre in der\n' +
      'Beratungsgesellschaft KPMG als IT-Berater in Berlin und besuchte\n' +
      'währenddessen mehrere Messen und Events für Start-Up Gründer.'
  },
  {
    img: 'assets/Computer Engineer Tom.jpg',
    name: 'Tom Lorenz',
    description: 'Für das Technische ist Tom als Ingenieur zuständig. Noch während seines\n' +
      'Masterstudiums in Berlin lernte er Philipp auf einer Messe für Gründer\n' +
      'kennen und entwickelte mit ihm zusammen erste Ideen und Prototypen.\n' +
      'Toms Stärke liegt darin, dass er nicht in Grenzen denkt und bereit ist,\n' +
      'sich jeder Herausforderung zu stellen.'
  },
  {
    img: 'assets/Software Engineer Michael.jpg',
    name: 'Michael Mertens',
    description: 'In Zeiten der Digitalisierung darf ein Softwareentwickler in einem\n' +
      'innovativen Start-Up nicht fehlen. Informatiker Michael ist durch sein\n' +
      'logisches Denken und seiner IT-Affinität bereits bei mehreren\n' +
      'Wettbewerben positiv aufgefallen, sodass Philipp und Tom auf ihn\n' +
      'aufmerksam geworden sind. Die Vorstellung, in einem eigenen\n' +
      'Unternehmen verantwortlich für die Entwicklung einer Software zu sein,\n' +
      'hat ihn sofort überzeugt, sich den beiden anzuschließen.'
  },
  {
    img: 'assets/Marketing Manager Eliza.jpg',
    name: 'Eliza Braun',
    description: 'Ohne die richtige Vermarktung ist die beste Idee nutzlos – hier setzt Eliza\n' +
      'als Verantwortliche für das Design an. Eliza und Philipp sind gute\n' +
      'Freunde seit dem ersten Semester, sodass es für sie selbstverständlich\n' +
      'ist, ihre Fähigkeiten mit den anderen zu teilen. Sie arbeitet eng mit den\n' +
      'anderen Gründern zusammen, um möglichst viele Informationen und\n' +
      'Details über die Produkte zu bekommen. Bei der Produktentwicklung\n' +
      'und der Erstellung von Prototypen arbeiten meistens alle 4 Gründer\n' +
      'zusammen, wobei Eliza vor allem beim Design die führende Hand ist.'
  }
];

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
  animations: [
    trigger('crossfade', [
      state('hidden', style({
        opacity: 0.1
      })),
      state('visible', style({
        opacity: 1
      })),
      transition('hidden <=> visible', [
        animate('0.2s')
    ])
  ])]
})
export class AboutUsComponent implements OnInit {

  personIndex = 0;
  nextPersonIndex = -1;

  fadeState = 'visible';

  constructor() { }

  ngOnInit() {
  }

  animationDone() {
    if (this.fadeState === 'hidden') {
      this.fadeState = 'visible';
      this.personIndex = this.nextPersonIndex;
      this.nextPersonIndex = -1;
    }
  }

  setNextPerson(index: number) {
    if (this.personIndex !== index) {
      this.nextPersonIndex = index;
      this.fadeState = 'hidden';
    }
  }

  isThumbnailActive(index: number) {
    return (this.nextPersonIndex !== -1 && index === this.nextPersonIndex) ||
      (this.nextPersonIndex === -1 && index === this.personIndex);
  }

  get person() {
    return PEOPLE[this.personIndex];
  }

  get allPeople() {
    return PEOPLE;
  }
}
