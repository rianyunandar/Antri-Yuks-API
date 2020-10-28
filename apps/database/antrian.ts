import admin, { firestore } from 'firebase-admin';
import { serviceAccountCredentials } from './firebasekunci';
const serviceAccount = serviceAccountCredentials as admin.ServiceAccount;

export type Antrian = {
  kode_layanan: string;
  Nomer_antrian: number;
  Status: boolean;
  kode_status : string;
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://digitalent-cd239.firebaseio.com',
});

const db = admin.firestore();
const antrianRef = db.collection('antrians');
const layananRef = db.collection('layanans');


export class AntrianClient {
  private db: FirebaseFirestore.Firestore;
  private antrianRef = db.collection('antrians')
 // private layananRef = db.collection('layanans');

constructor() {
  this.db= db;
  this.antrianRef = antrianRef;
 // this.layananRef = layananRef;
}
  
async addAntrian(antrian: Antrian){
    try {
        await antrianRef.add(antrian);
      
      } catch (error) {
        throw error
      }
}

async getAntrianALL(){
    let snapshot;
    try {
      snapshot = await this.antrianRef.get()
    } catch (error) {
      throw error
    } 
}


async getAntrianByStatus(status: boolean){
    let snapshot;
    try {
      snapshot = await antrianRef.where ('status','==', status).get();
    } catch (error) {
      throw error
    }
}

async getAntrianByLayanan(codeservice:string){
    let snapshot;
    try {
      snapshot = await antrianRef.where ('kode_layanan','==', codeservice).get();
    } catch (error) {
      throw error
    }
}

async ResetAntrian(){
    try {
        //await db.collection('antrians').get()
        await antrianRef.get().then(res => {
          res.forEach(element => {
            element.ref.delete();
          });
      
      })} catch (error) {
        throw error
      }
}

async updateStatusAntrian(id: string, update: Object) {
    let snapshot;
    try {
      await antrianRef.doc(id).update({
        ...update
      });
      snapshot = await antrianRef.doc(id).get();
    } catch (error) {
      throw error;
    } return snapshot.data();
}

async panggilAntrian(Nomer_antrian : number){
    let snapshot;
    try {
      snapshot = await antrianRef.where ('Nomer_antrian','==', Nomer_antrian).get();
    } catch (error) {
      throw error
    }
}

// async nextantrian(Nomer_antrian : number){
//     let snapshot;
//     try {
//       snapshot = await antrianRef.where ('Nomer_antrian','==', Nomer_antrian).get();
//     } catch (error) {
//       throw error
//     }
// }


}