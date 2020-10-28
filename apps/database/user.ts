import admin, { firestore } from 'firebase-admin';
import { serviceAccountCredentials } from './firebasekunci';
const serviceAccount = serviceAccountCredentials as admin.ServiceAccount;

export type User = {
  username: string;
  password: string;
  role: string;
  nama: string;
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://digitalent-cd239.firebaseio.com',
});

const db = admin.firestore();

export class FirebaseClient {
  private db: FirebaseFirestore.Firestore;
  private accountRef = db.collection('users')


constructor() {
  this.db= db;
}
  
async addUser(layanan: User){

}

async getUserAll(){
  
}



async deleteUser(){
  
}

async UpdateUser(){
  
}




}