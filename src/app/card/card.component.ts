import { Component, OnInit,Input,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
@Input() title:string="";
@Input() count:string="";
@Output() addcardEvent=new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  triggerEvent(item:any){
    this.addcardEvent.emit(item);
    console.log(item);
  }
}
