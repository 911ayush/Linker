import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith} from 'rxjs/operators';
import { MessageServiceService } from '../message-service.service';

@Component({
  selector: 'app-messaging-page',
  templateUrl: './messaging-page.component.html',
  styleUrls: ['./messaging-page.component.css']
})
export class MessagingPageComponent implements OnInit {
  constructor(private messageService: MessageServiceService) { }
  name:string="ayush";
  myControl = new FormControl();
  message:string="";
  from:String='';
  fullDMess={
    "message":'',
    "from":'',
    "room":'',
    "Date":123,
    "second":345,
    "year":4567,
    "month":12,
    "minute":89,
    "hour":78
  }
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    // this.messageService.listen("start").subscribe((data) => {
    //   console.log(data);
    // })
    // this.messageService.listen("ayushrudra").subscribe((data) => {
    //   console.log(data);
    // })
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
  callFn(){
    this.fullDMess.message=this.message;
    this.message='';
    this.fullDMess.room="ayushrudra";
    this.fullDMess.from = this.name;
    this.fullDMess.Date = new Date().getDate();
    this.fullDMess.year = new Date().getFullYear();
    this.fullDMess.second = new Date().getSeconds();
    this.fullDMess.month = new Date().getMonth();
    this.fullDMess.minute = new Date().getMinutes();
    this.fullDMess.hour = new Date().getHours();
    console.log(this.fullDMess);
    this.messageService.emit("ayushrudra",this.fullDMess);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  openMessagingOption(){
    alert("hii");
  }
  toppings = new FormControl();

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  sendMessage(){
    this.callFn();
  }
}
