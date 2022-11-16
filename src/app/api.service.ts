import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public http: HttpClient,
  ) { }

  //link API
  apiURL(){
    return 'http://localhost:7070/api';
  }
  getUser(){
    return this.http.get(this.apiURL()+ '/tampil.php');
  }
  deleteUser(id){
    return this.http.delete(this.apiURL()+'/hapus.php?id='+id);
  }

  ambilUser(id){
    return this.http.get(this.apiURL()+'/lihat.php?id='+id);
  }
}

