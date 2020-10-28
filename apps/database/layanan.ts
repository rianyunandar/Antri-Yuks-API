import admin, { firestore } from 'firebase-admin';
import { serviceAccountCredentials } from './firebasekunci';
const serviceAccount = serviceAccountCredentials as admin.ServiceAccount;

export type Layanan = {
  nama_layanan: string;
  operator: string;
  jenis_layanan: string;
  kode_layanan: number;
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://digitalent-cd239.firebaseio.com',
});

const db = admin.firestore();

export class FirebaseClient {
  private db: FirebaseFirestore.Firestore;
  private accountRef = db.collection('layanans')


constructor() {
  this.db= db;
}
  
async addLayanan(layanan: Layanan){

}

async getlayananAll(){
  
}

async getlayananByKode(){
  
}

async deleteLayanan(){
  
}

async UpdateLayanan(){
  
}




}