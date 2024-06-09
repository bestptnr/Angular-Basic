import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  price: number = 0;
  finalValue: number = 0;

  appCounter  =20
  width = 200
  height=200
  
  activate : boolean = false


  customerList : string[] = ['best1','best2','best3']

  testNumberChange(value:number){
    console.log("event ->",value)
  }

  calculateValue() : void{
    if(this.price !== 0 ){
      this.finalValue =  (this.price * 3)/4
    }
  }

  doAppMinChange(value:number){
    console.log("Min change value : ",value)
  }

  doAppMaxChange(value:number){
    console.log("Max change value : ",value)

  }


  onPushCustomer(){
    this.customerList.push("best"+(this.customerList.length+1))
  }
  onUnshiftCustomer(){
    this.customerList.unshift("best"+(this.customerList.length+1))
  }
  removeCustomer(index : number){
    this.customerList.splice(index,1)
  }
}
