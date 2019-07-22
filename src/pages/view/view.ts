import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider, Emp } from '../../providers/database/database';

/**
 * Generated class for the ViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})
export class ViewPage {
  employees : Emp = null;
  studID: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private databaseProvider: DatabaseProvider) {
    this.studID =  this.navParams.data;
    this.loadStudents(this.studID);
  }

  ionViewDidLoad() {

  }
  loadStudents(id) {
    this.databaseProvider.get_dataByid(id).then((res) => {
      console.log(res);

      this.employees = res;
    })
  }
}
