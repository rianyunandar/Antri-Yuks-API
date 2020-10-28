import admin, { firestore } from 'firebase-admin';
import { serviceAccountCredentials } from './firebasekunci';
const serviceAccount = serviceAccountCredentials as admin.ServiceAccount;

export type Antrian = {
  kode_layanan: string;
  Nomer_antrian: string;
  Status: boolean;
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://digitalent-cd239.firebaseio.com',
});

const db = admin.firestore();

export class FirebaseClient {
  private db: FirebaseFirestore.Firestore;
  private accountRef = db.collection('antrians')


constructor() {
  this.db= db;
}
  
async addAntrian(antrian: Antrian){

}

async getAntrianALL(){
  
}


async getAntrianByStatus(){
  
}

async getAntrianByLayanan(){
  
}

async ResetAntrian(){
  
}

async updateStatusAntrian(){
  
}





}