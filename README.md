# Rian Yunandar 
## Rest API antrian
##### NodeJS, TypeScript, Firebase, Express

### Design Database
|  Layanan |  Antrian |
| ------------ | ------------ |
|    nama_layanan: string; |   Kode_layanan: string;  |
|    operator: string; |  Nomer_antrian: number;  |
|   jenis_layanan: string;  |  Status: boolean;  |
|  kode_layanan: string;  |   Index_antrian : string;  |

> dibuat dynamic dapat di buat untuk pelayanan apa saja

- cukup tambahkan layanan dengan method post /services/add 

- untuk membuat antrian dengan method post  /quees/add-> antrian di buat dengan parameter tambahan kode_layanan -> nomer antrian terbuat dan terkoneksi dengan layanan dengan field kode_layanan dan index_antrian

- untuk operator mendapatkan antrian selanjut nya dengan method get /quees/:service/:status -> :service diisi kode layanan , status false untuk antrian yang masih menunggu -> list antrian terfilter dengan nomer antrian terakhir yang statusnya false

- untuk update antrian done mengunakan method put /closed/:id -> antrian akan terupdate dengan status : true dan index antrian terupdate juga

- untuk reset nomer antrian method delete  /reset collection antrians akan ter- reset

### API end Point
- '/' home index
- /quees   :   antrianRouter
- /services :  layananRouter
- penjelasan end point lainnya serta parameter dan result silahkan lihat dokumentasi

###### This Git will help you if your seacrh how to
- Simple CRUD Using Firebase,TypeScript,NodeJS,Express
- Update with Customize data
- How to return data in NodeJS
- How To Filter SnapShot Firebase
- How to make Quee App API
- How to remove Bracket JSON 

###### Next Update
- AUTH USER
- Comment Detail every Fuction

`http://editor.md.ipandao.com`
