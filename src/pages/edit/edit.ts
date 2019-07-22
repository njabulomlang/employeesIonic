import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { DatabaseProvider, Emp } from '../../providers/database/database';
import { CameraOptions, Camera } from '@ionic-native/camera';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseProvider: DatabaseProvider,public toastCtrl: ToastController, private viewCtrl: ViewController,
    private camera: Camera) {
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
  upload(){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.employees.pic = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }
}
