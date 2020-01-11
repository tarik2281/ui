import {Component, OnInit} from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material';

/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
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
        name: 'abcdefghijklmnopqrstuvwxyz?',
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

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  private _transformer = (node: DataNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  constructor() {
    this.dataSource.data = QUESTION_DATA;
  }

  ngOnInit() {
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
