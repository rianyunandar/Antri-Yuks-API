import admin, { firestore } from 'firebase-admin';
import { serviceAccountCredentials } from './firebasekunci';
const serviceAccount = serviceAccountCredentials as admin.ServiceAccount;

export type Layanan = {
  nama_layanan: string;
  operator: string;
  jenis_layanan: string;
  kode_layanan: string;
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://digitalent-cd239.firebaseio.com',
});

const db = admin.firestore();
const layananRef = db.collection('layanans');


export class LayananClient {
  private db: FirebaseFirestore.Firestore;
  private layananRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;


constructor() {
  this.db= db;
  this.layananRef = layananRef;
}
  
async addlayanan(layanan: Layanan){
  try {
    await layananRef.add(layanan);
  
  } catch (error) {
    throw error
  }}


async getlayananAll(){
  let snapshot;
  try {
    snapshot = await this.layananRef.get()
  } catch (error) {
    throw error
  }
}

async getlayananByKode(codeservice: string){
  let snapshot;
  try {
    snapshot = await layananRef.where ('kode_layanan','==', codeservice).get();
  } catch (error) {
    throw error
  }
}

async deleteLayanan(id: string){
  try {
    await layananRef.doc(id).delete();
  
  } catch (error) {
    throw error
  }
}

async UpdateLayanan(id: string, update: Object){
  let snapshot;
  try {
    await layananRef.doc(id).update({
      ...update
    });
    snapshot = await layananRef.doc(id).get();
  } catch (error) {
    throw error;
  }

  return snapshot.data();
}




}