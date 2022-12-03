import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as jspdf from "jspdf";
import { Subscription } from "rxjs";
import { Todo } from "../models/todo.model";
import { ToDoService } from "../services/todo.service";
import {UserOptions} from 'jspdf-autotable' ;
import 'jspdf-autotable';

interface jsPDFWithPlugin extends jspdf.jsPDF {
  autotable : (option :UserOptions) => jspdf.jsPDF ;
}

@Component ({
selector : 'my-todo' ,
templateUrl : './todo.component.html',
styleUrls : ['./todo.component.css' ]
})

export class ToDoComponent implements OnInit , OnDestroy {

  today;
  todos : Todo[];
  todoSub : Subscription;
  title = 'List of tasks';
  head = [['ID', 'Country', 'Rank', 'Capital']]

  constructor (private todoService : ToDoService , private router : Router)
  {

  }


ngOnInit()
{
  this.today = this.todoService.today;
  //this.todos = this.todoService.todos;
  this.todoSub = this.todoService.todoSubject.subscribe(
    (value : any[]) => {
      this.todos = value;
    },
    (error) => {
      console.log("error :"+ error);

    },
    ()=> {
      console.log("Observable completé !");

    }
  );
  this.todoService.emitTodos();

}
onchangeStatus(i:number)
{
  this.todoService.onchangeStatus(i);
}

onchangeIsModif(i : number)
{
  this.todoService.onchangeIsModif(i);
}

onView (id : number)
{
  this.router.navigate(["single-todo", id]);
}
ngOnDestroy(){
  this.todoSub.unsubscribe();
}

exportToPDFAutoTable () {

  const head = [['Name', 'Description', 'Status', 'Image']]
  const data = this._getDataForPdfTable();
  const fileName = this.title.replace(' ', '_') + '_' + Math.floor((Math.random() * 1000000) + 1) + '.pdf';

  const doc = new jspdf.jsPDF('p' , 'px' , 'a4') as jsPDFWithPlugin;

    doc.setFontSize(18);
    doc.text('My PDF Table', 11, 8);
    doc.setFontSize(11);
    doc.setTextColor(100);


    doc.autotable({
      head: head,
      body: data,
      theme: 'plain',
      didDrawCell: data => {
        console.log(data.column.index)
      }
    })

    // Open PDF document in new tab
    doc.output('dataurlnewwindow')

    // Download PDF document
    doc.save(fileName);

}

exportDataToPDF() {
  // Creating a unique file name for my PDF
  const fileName = this.title.replace(' ', '_') + '_' + Math.floor((Math.random() * 1000000) + 1) + '.pdf';
  console.log(fileName);

  // Default export is a4 paper, portrait, using millimeters for units
  const doc = new jspdf.jsPDF('l', 'mm', "a4");
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  const titleXPos = (doc.internal.pageSize.getWidth() / 2) - (doc.getTextWidth(this.title) / 2);
  doc.text(this.title, titleXPos, 20);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  console.log(this._createHeadersForPdfTable(['Name', 'Description', 'Status', 'Image' ]));

  doc.table(10, 35, this._getDataForPdfTable(), this._createHeadersForPdfTable([
    'Name', 'Description', 'Status', 'Image'
  ]), { autoSize: false });
  doc.save(fileName);
}

private _createHeadersForPdfTable(keys: string[]) {
  const result: jspdf.CellConfig[] = [];
  result.push({ name: 'Name', prompt: 'Name',   width: 70,   align: 'center',   padding: 10  });
  result.push({ name: 'Description', prompt: 'Description',   width: 150,   align: 'center',   padding: 10  });
  result.push({ name: 'Status', prompt: 'Status',   width: 55,   align: 'center',   padding: 10  });
  result.push({ name: 'Image', prompt: 'Image',   width: 60,   align: 'center',   padding: 10  });
  // for (let i = 0; i < keys.length; i += 1) {
  //   result.push({
  //     name: keys[i],
  //     prompt: keys[i],
  //     width: 55,
  //     align: 'center',
  //     padding: 10
  //   });
  // }

  return result;
}

private _getDataForPdfTable() {
  const data = [];
  for (let i = 0; i < this.todos.length; i++) {
    data.push({
      Name: this.todos[i].todoName,
      Description: this.todos[i].todoDesc,
      Status: this.todos[i].todoStatus ?  'In Progress' :'Completed',
      Image: this.todos[i].image,
    });
  }
  return data;
}

}
