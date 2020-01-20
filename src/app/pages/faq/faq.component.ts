import {Component, OnInit} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material';

interface DataNode {
  name: string;
  children?: DataNode[];
}

const QUESTION_DATA: DataNode[] = [
  {
    name: 'Allgemein',
    children: [
      {
        name: 'Was ist das?',
        children: [{name: 'Ja'}]
      }
    ]
  },
  {
    name: 'Kontoverwaltung',
    children: [
      {
        name: 'Was ist das?',
        children: [{name: 'Ja'}]
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
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {


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

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
