import admin, { firestore, SDK_VERSION } from 'firebase-admin';
import { serviceAccountCredentials } from './firebasekunci';
const serviceAccount = serviceAccountCredentials as admin.ServiceAccount;

export type Antrian = {
  Kode_layanan: string;
  Nomer_antrian: number;
  Status: boolean;
  Index_antrian : string;
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
        await antrianRef.add({
          kode_layanan: antrian.Kode_layanan,
          Nomer_antrian: antrian.Nomer_antrian,
          Status: antrian.Status,
          index_antrian : antrian.Kode_layanan + '_'+antrian.Status});
    
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

// logic OR bukan and :( salah
// async getNextAntrian(codeservice:string){
 
//   const onprogress = antrianRef.where ('status','==', false).get();
//   const service = antrianRef.where ('kode_layanan','==',codeservice ).get();

//   const [
//     onprogressSnapShot,
//     serviceSnapShot
//   ] = await Promise.all([onprogress, service]);

//   const onprogressArray = onprogressSnapShot.docs;
//   const serviceArray = serviceSnapShot.docs;

//   //let nextantrian;  
//   return onprogressArray.concat(serviceArray);

// }
// }


async getbystatusservice(index_antrian : string){
  let snapshot;
  try {
    snapshot = await antrianRef.where ('index_antrian','==', index_antrian).get();
  } catch (error) {
    throw error
  }
}


}