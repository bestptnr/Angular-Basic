import { Component } from '@angular/core';

@Component({
  selector:'app-servers',
  // selector: '[app-servers]',
  // selector:'.app-servers',
  templateUrl:'./servers.component.html',
  styleUrl: './servers.component.css'
})
export class ServersComponent {
  allowNewServer : boolean = false
  serverCreationStatus : string  = 'No server was created!'
  serverName : string = "test"
  serverCreated : boolean = false
  servers :string[] = ['TestServer','TestServer2']
  constructor () {
    setTimeout(()=>{
      this.allowNewServer = true
    },2000);
  }

  onCreateServer(){
    this.serverCreated = true
    this.servers.push(this.serverName)
    this.serverCreationStatus = 'Server was craeted! ' + this.serverName
  }
  onUpdateServerName(event : Event){
    this.serverName  =  (<HTMLInputElement>event.target).value
  }

}
