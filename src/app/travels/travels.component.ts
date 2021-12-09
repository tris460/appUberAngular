import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-travels',
  templateUrl: './travels.component.html',
  styleUrls: ['./travels.component.scss']
})
export class TravelsComponent implements OnInit {
  travelList: AngularFireList<any>;
  travel: Array<any>;
  userList: AngularFireList<any>;
  user: Array<any>;
  $userId: string;
  travelForUser: Array<any>;

  constructor(public firebase:AngularFireDatabase, private router: Router) {
    const userInfo = localStorage.getItem('loggedUser');
    if(!userInfo){
      this.router.navigateByUrl('/login')
    }

    this.travelList = this.firebase.list('travel');
    this.travel = [];
    this.userList = this.firebase.list('user');
    this.user = [];
    this.$userId = '';
    this.travelForUser = [];
    this.getDataTable();
  }
  
  ngOnInit(): void {
  }
  
  getDataTable() {
    this.userList.snapshotChanges().subscribe(item => {
      item.forEach(user => {
        const x: any = user.payload.toJSON();
        let emailUser = localStorage.getItem('loggedUser');
        const email = `{"user":"${x.email}"}`;
        if(email === emailUser) {
          this.$userId = user.key ? user.key : '';
        }
      });
    });
    this.travelList.snapshotChanges().subscribe(item => {
      this.travel = [];
      item.forEach(t => {
        let x = t.payload.toJSON();
        this.travel.push(x);
      });
      this.travelForUser = [];
      this.travel.forEach((item)=>{
        if(item.user === this.$userId) {
          this.travelForUser.push(item);
        }
      })
    });
  }

}
