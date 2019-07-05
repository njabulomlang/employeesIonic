import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { DatabaseProvider, Emp } from '../../providers/database/database';

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {
  employees : Emp = null;

  studID: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseProvider: DatabaseProvider,public toastCtrl: ToastController, private viewCtrl: ViewController) {
        this.studID =  this.navParams.data;
   this.loadStudents(this.studID);
  }

  ionViewDidEnter() {


  }
 loadStudents(id) {
    this.databaseProvider.get_dataByid(id).then((res) => {
      console.log(res);

      this.employees = res;
    })
  }
  update(){

    this.databaseProvider.updateemployee(this.employees).then(async (res) => {
      let toast = await this.toastCtrl.create({
        message: 'Employee updated',
        duration: 3000
      });
      toast.present();
      this.viewCtrl.dismiss({ reload: true });
    });
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
