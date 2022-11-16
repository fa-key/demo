import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Http } from '@capacitor-community/http';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.page.html',
  styleUrls: ['./user-edit.page.scss'],
})
export class UserEditPage implements OnInit {
  id: any;
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
  ) {
    this.route.params.subscribe((param: any) => {
      this.id = param.id;
      console.log(this.id);
      this.ambilUser(this.id);
    });
  }

  ngOnInit() {}

  ambilUser(id) {
    this._apiService.ambilUser(id).subscribe(
      (res: any) => {
        console.log('sukses', res);
        let user = res;
        this.nama = user.nama;
        this.merek = user.merek;
        this.mesin = user.mesin;
        this.tanggal = user.tanggal;
        this.rerata = user.rerata;
      },
      (error: any) => {
        console.log('error', error);
        alert('gagal ambil data');
      }
    );
  }

  editUser() {
    let url = this._apiService.apiURL() + '/edit.php';
    Http.request({
      method: 'POST',
      url: url,
      headers: { 'Content-Type': 'application/json' },
      data: {
        id: this.id,
        nama: this.nama,
        merek: this.merek,
        mesin: this.mesin,
        tanggal: this.tanggal,
        rerata: this.rerata,
      },
    }).then((data) => {
      this.alertController
        .create({
          header: 'Notifikasi',
          message: 'Berhasil edit data user',
          buttons: ['OK'],
        })
        .then((res) => {
          res.present();
        });
      this.router.navigateByUrl('/user');
    });
  }
}
