import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
/**
 * Generated class for the AddStudentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-students',
  templateUrl: 'add-students.html',
})
export class AddStudentsPage {
  employee = {
    name: '',
    email:'',
    pic:'',
    cellno:'',
    occupation: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams ,public alertCtrl: AlertController,
    private databaseProvider: DatabaseProvider, private viewCtrl: ViewController) {
  }
  createEmployee() {
    if(this.employee.name=="" || this.employee.email=="" || this.employee.cellno=="" || this.employee.occupation==""){
      const alert = this.alertCtrl.create({
        title: 'Attention!',
        subTitle: 'Please input all fields',
        buttons: ['OK']
      });
      alert.present();
    } else this.databaseProvider.addemployees(this.employee.name, this.employee.email, this.employee.pic, this.employee.cellno,this.employee.occupation).then((data) => {
      this.viewCtrl.dismiss({ reload: true });
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  onSubmit(value) {
    console.log(value)
  }

}
