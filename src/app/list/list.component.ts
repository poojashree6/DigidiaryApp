import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ListModel } from './list.model';
import { ListserviceService } from '../listservice.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  listValue!: FormGroup;
  listModelObject: ListModel = new ListModel();
  listData!: any;
  showadd!: boolean;
  showupdate!: boolean;

  constructor(private formbuilder: FormBuilder, private listservice: ListserviceService) { }
  ngOnInit(): void {
    this.listValue = this.formbuilder.group({
      date: [''],
      title: [''],
      body: ['']
    })
    this.getdata();
  }

  clickAdddata() {
    this.listValue.reset();
    this.showadd = true;
    this.showupdate = false;
  }

  postdata() {
    this.listModelObject.date = this.listValue.value.date;
    this.listModelObject.title = this.listValue.value.title;
    this.listModelObject.body = this.listValue.value.body;

    this.listservice.postlist(this.listModelObject)
      .subscribe(res => {
        console.log(res);
        alert("Note Added Succesfully");
        this.listValue.reset();
        this.getdata();
      })
  }

  getdata() {
    this.listservice.getlist()
      .subscribe(res => {
        this.listData = res;
      })
  }
  deletedata(list: any) {
    this.listservice.deletelist(list.id)
      .subscribe(res => {
        alert("Note Deleted");
        this.getdata();
      })
  }
  onEdit(list: any) {
    this.showadd = false;
    this.showupdate = true;

    this.listModelObject.id = list.id;
    this.listValue.controls['date'].setValue(list.date);
    this.listValue.controls['title'].setValue(list.title);
    this.listValue.controls['body'].setValue(list.body);
  }

  updatedata() {
    this.listModelObject.date = this.listValue.value.date;
    this.listModelObject.title = this.listValue.value.title;
    this.listModelObject.body = this.listValue.value.body;

    this.listservice.updatelist(this.listModelObject, this.listModelObject.id)
      .subscribe(res => {
        alert("Updated succesfully");
      })
    this.getdata();

  }
  searchlist(event: any) {
    console.log(event.target.value);

    if (event.target.value) {
      this.listservice.searchlist(event.target.value).subscribe(res => {
        this.listData = res;
      })
    } else {
      this.getdata();
    }

  }



}
