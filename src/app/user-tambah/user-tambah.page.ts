import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Http } from '@capacitor-community/http';
import { Alert } from 'selenium-webdriver';
@Component({
  selector: 'app-user-tambah',
  templateUrl: './user-tambah.page.html',
  styleUrls: ['./user-tambah.page.scss'],
})
export class UserTambahPage implements OnInit {
  nama: any;
  merek: any;
  mesin: any;
  tanggal: any;
  rerata: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _apiService: ApiService,
    private alertController: AlertController,
    public loadingController: LoadingController
  ) {}
  ngOnInit() {}
  addUser() {
    /*eslint prefer-const: 2*/
    /*eslint-env es6*/
    /* eslint no-underscore-dangle: 0 */
    let url =
      this._apiService.apiURL() +
      '/tambah.php'; /*error 'url' is never modified, use 'const' instead.*/
    Http.request({
      method: 'POST',
      url: url,
      headers: { 'Content-Type': 'application/json' },
      data: {
        nama: this.nama,
        merek: this.merek,
        mesin: this.mesin,
        tanggal: this.tanggal,
        rerata: this.rerata,
      },
    }).then((data) => {
      this.nama = '';
      this.merek = '';
      this.mesin = '';
      this.tanggal = '';
      this.rerata = '';
      this.alertController
        .create({
          header: 'Notifikasi',
          message: 'Berhasil input data user',
          buttons: ['OK'],
        })
        .then((res) => {
          res.present();
        });
      this.router.navigateByUrl('/user');
    },(error) => {
      this.alertController
        .create({
          header: 'Notifikasi',
          message: 'Gagal Input data',
          buttons: ['OK'],
        })
        .then((res) => {
          res.present();
        });
    });
  }
}
