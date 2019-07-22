
import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';
import { BehaviorSubject } from 'rxjs/Rx';
import { Platform } from 'ionic-angular/platform/platform';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export interface Emp {
  id: number,
  name: string,
  email: string,
  cellno: string,
  pic: any,
  occupation: string

}

@Injectable()
export class DatabaseProvider {


  db: SQLiteObject;

  private databaseReady: BehaviorSubject<boolean>;
  employees = new BehaviorSubject([]);
  constructor( private sqlite: SQLite, private platform: Platform) {
    console.log('Hello DatabaseProvider Provider');
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      this.openOrCreate();
    })
  }

  getDatabaseState() {
    return this.databaseReady.asObservable();
  }

  openOrCreate() {
    console.log('Open/Create DB')
    return this.sqlite.create({
      name: 'employee_data.db',
      location: 'default',

    }).then((db: SQLiteObject) => {
      this.db = db;
      return this.db.sqlBatch([
        'CREATE TABLE IF NOT EXISTS class(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(32))',
        'CREATE TABLE IF NOT EXISTS employee(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(32), email VARCHAR(50), pic TEXT, cellno VARCHAR(20), occupation VARCHAR(30))'
      ]).then((data) => {
        console.log('After Batch')
        this.databaseReady.next(true);
        return data;
      });
    })
  }

  addemployees(name, email, pic, cellno,occupation){
    return this.db.executeSql('INSERT INTO employee (name, email, pic, cellno, occupation) VALUES (?,?,?,?,?)', [name, email, pic, cellno, occupation]);
  }
updateemployee(emp: Emp){
  let data = [emp.name,emp.email,emp.cellno, emp.pic,emp.occupation];
 return this.db.executeSql(`UPDATE employee SET name = ?, email = ?, cellno = ?,pic=?, occupation = ? WHERE id = ${emp.id}`, data).then((data) =>{
   this.loadEmployees();
 })
}
loadEmployees() {
  return this.db.executeSql('SELECT * FROM employee', []).then(data => {
    let employees: Emp [] = [];

    if (data.rows.length > 0) {
      for (var i = 0; i < data.rows.length; i++) {


        employees.push({
          id: data.rows.item(i).id,
          name: data.rows.item(i).name,
          email: data.rows.item(i).email,
          cellno: data.rows.item(i).cellno,
          pic: data.rows.item(i).pic,
          occupation: data.rows.item(i).occupation
         });
      }
    }
    this.employees.next(employees);
  });
}
  getemployees(){
    return this.db.executeSql('SELECT * FROM employee', null).then((data) => {
      let results = [];
      for (let i = 0; i < data.rows.length; i++){
        results.push({name : data.rows.item(i).name, email :  data.rows.item(i).email, pic :  data.rows.item(i).pic, cellno : data.rows.item(i).cellno, occupation :  data.rows.item(i).occupation , id: data.rows.item(i).id})
      }
      return results;
    });
  }
  delete_byID(id){
    return new Promise((resolve,reject) =>{
      this.db.executeSql("DELETE FROM employee WHERE id=? ",[id])
  .then(res=>resolve(res))
  .catch(err=>reject(err));
    })
  }
get_dataByid(id): Promise<Emp> {

return  this.db.executeSql('SELECT * FROM employee WHERE id=?',[id]).then(data => {

  return {
    id: data.rows.item(0).id,
    name: data.rows.item(0).name,
    email: data.rows.item(0).email,
    pic:  data.rows.item(0).pic,
    cellno:  data.rows.item(0).cellno,
    occupation:  data.rows.item(0).occupation
    //img: data.rows.item(0).img
  }
});
}
  addClass(data){
    return this.db.executeSql('INSERT INTO class (name) VALUES (?)', [data]);
  }

  getCsass(){
    return this.db.executeSql('SELECT * FROM class', null).then((data) => {
      let results = [];
      for (let i = 0; i < data.rows.length; i++){
        results.push({name: data.rows.item(i).name, id: data.rows.item(i).id})
      }
      return results;
    }, err => {
      console.log("ERROR", err);
      return [];
    });
  }

  }


