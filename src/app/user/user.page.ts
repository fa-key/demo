import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Preferences } from '@capacitor/preferences';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
const USERNAME = 'namasaya';
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  public namaUsers = '';
  id: any;
  nama: any;
  merek: any;
  mesin: any;
  tanggal: any;
  rerata: any;
  user: any[];
  constructor(
    public _apiService: ApiService,
    private alertController: AlertController,
    public loadingController: LoadingController,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.getUser();
  }

  ngOnInit() {
    console.log('cek fungsi halaman event init jalan');
    this.cekSesi();
    console.log(this.namaUsers);
  }

  async cekSesi() {
    const ambilNama = await Preferences.get({ key: USERNAME });
    if (ambilNama && ambilNama.value) {
      let namauser = ambilNama.value;
      this.namaUsers = namauser;
    } else {
    }
  }

  logout() {
    this.alertController
      .create({
        header: 'Perhatian',
        subHeader: 'Yakin Logout aplikasi ?',
        buttons: [
          {
            text: 'Batal',
            handler: (data: any) => {
              console.log('Canceled', data);
            },
          },
          {
            text: 'Yakin',
            handler: (data: any) => {
              //jika tekan yakin
              this.authService.logout();
              this.router.navigateByUrl('/', { replaceUrl: true });
            },
          },
        ],
      })
      .then((res) => {
        res.present();
      });
  }

  ionViewDidEnter() {
    console.log('jika selesai loading');
    this.getUser();
  }
  getUser() {
    /* eslint no-underscore-dangle: 0 */
    this._apiService.getUser().subscribe(
      (res: any) => {
        console.log('sukses', res);
        this.user = res;
      },
      (error: any) => {
        console.log('gagal', error);
        this.alertController
          .create({
            header: 'Notifikasi',
            message: 'Gagal memuat data user',
            buttons: ['OK'],
          })
          .then((res) => {
            res.present();
          });
      }
    );
  }
  deleteUser(id) {
    this.alertController
      .create({
        header: 'perhatian',
        subHeader: 'Yakin menghapus data ini?',
        buttons: [
          {
            text: 'Batal',
            handler: (data: any) => {
              console.log('dibatalkan', data);
            },
          },
          {
            text: 'Yakin',
            handler: (data: any) => {
              this._apiService.deleteUser(id).subscribe(
                (res: any) => {
                  console.log('sukses', res);
                  this.getUser();
                },
                (error: any) => {
                  console.log('error', error);
                  this.alertController
                    .create({
                      header: 'Notifikasi',
                      message: 'gagal memuat data user',
                      buttons: ['OK'],
                    })
                    .then((res) => {
                      res.present();
                    });
                }
              );
            },
          },
        ],
      })
      .then((res) => {
        res.present();
      });
  }
}
