import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  userList: AngularFireList<any>;
  
  constructor(public firebase:AngularFireDatabase) { 
    this.userList = this.firebase.list('user');
    this.username = '';
    this.email = '';
    this.password = '';
    this.repeatPassword = '';
  }

  ngOnInit(): void {
  }
  addUser() {
    if(this.validateFieldsSignIn()) {
      this.userList.push({
        username: this.username,
        email: this.email,
        password: this.password
      });
      alert('User added correctly');
      this.clearForm();
    } else {
      alert('You need to complete each field');
    }
  }
  clearForm() {
    this.username = '';
    this.email = '';
    this.password = '';
    this.repeatPassword = '';
  }
  validateFieldsSignIn() {
    if(this.username === '' || this.email === '' || this.password === '' || this.repeatPassword === '') {
      return false;
    } else {
      return true;
    }
  }

  // Styes
  changePositionSignUp() {
    const signUp = document.getElementById('sign-up-front') || document.createElement('div');
    const logIn = document.getElementById('log-in-front') || document.createElement('div');
    signUp.style.zIndex = '0';
    logIn.style.zIndex = '1';
    signUp.style.transition = 'all 2s ease';
    logIn.style.transition = 'all 2s ease';
    signUp.style.transform = 'translate(100%, 0%)';
    logIn.style.transform = 'translate(100%, 0%)';
  }
  changePositionLogIn() {
    const signUp = document.getElementById('sign-up-front') || document.createElement('div');
    const logIn = document.getElementById('log-in-front') || document.createElement('div');
    signUp.style.zIndex = '1';
    logIn.style.zIndex = '0';
    signUp.style.transition = 'all 2s ease';
    logIn.style.transition = 'all 2s ease';
    signUp.style.transform = 'translate(0%, 0%)';
    logIn.style.transform = 'translate(0%, 0%)';
  }
}