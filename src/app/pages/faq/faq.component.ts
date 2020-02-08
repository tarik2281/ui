import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';

/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface DataNode {
  name: string;
  children?: DataNode[];
}

interface Question {
  title: string;
  answer: string;
  expanded?: boolean;
}

interface QuestionCategory {
  title: string;
  expanded?: boolean;
  questions: Question[];
}

const categories: QuestionCategory[] = [{
  title: 'Bedienung',
  questions: [
    {
      title: 'Wie wähle ich einen Badezusatz aus?',
      answer: 'afawefwef'
    }
  ]
},
  {
    title: 'Bedienung',
    questions: [
      {
        title: 'Wie wähle ich einen Badezusatz aus?',
        answer: 'afawefwef'
      }
    ]
  },
  {
    title: 'Bedienung',
    questions: [
      {
        title: 'Wie wähle ich einen Badezusatz aus?',
        answer: 'afawefwef'
      }
    ]
  }];


const QUESTION_DATA: DataNode[] = [
  {
    name: 'Allgemein',
    children: [
      {
        name: 'Was ist das?',
        children: [{ name: 'Ja' }]
      }
    ]
  },
  {
    name: 'Kontoverwaltung',
    children: [
      {
        name: 'abcdefghijklmnopqrstuvwxyz?',
        children: [{ name: 'Ja' }]
      }
    ]
  }
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

function nodeTransformer(node: DataNode, level: number) {
  return {
    expandable: !!node.children && node.children.length > 0,
    name: node.name,
    level,
  };
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  animations: [
    trigger('autoExpand', [
      transition(':enter', [
        style({ height: 0 }),
        animate('.5s ease')
      ]),
      transition(':leave', [
        // style({height:'auto'}),
        animate('.5s ease', style({ height: 0 }))
      ])
    ]),
    trigger('expand', [
      state('collapsed', style({ height: 0 })),
      state('expanded', style({})),
      transition('collapsed <=> expanded', [
        animate('1s cubic-bezier(0.35, 0, 0.25, 1)')
      ]),
      // transition(':enter', [
      //   style({ height: 0 }),
      //   animate('1s ease')
      // ])
    ])
  ]
})
export class FaqComponent implements OnInit {

  state = 'collapsed';

  transitioning = false;

  toggle() {
    if (this.transitioning) {
      return;
    }

    if (this.state === 'collapsed') {
      this.state = 'expanded';
    } else {
      this.state = 'collapsed';
    }
  }

  onAnimationStart(event) {
    this.transitioning = true;
    console.log(event);
  }

  onAnimationEnd(event) {
    this.transitioning = false;
    console.log(event);
  }

  constructor() {
    this.dataSource.data = QUESTION_DATA;
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    nodeTransformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  ngOnInit() {
  }

  get categories() {
    return categories;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
