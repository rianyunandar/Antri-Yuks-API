import dbfire  from './firebaseDB'

export type Antrian = {
  Kode_layanan: string;
  Nomer_antrian: number;
  Status: boolean;
  Index_antrian : string;
};



const antrianRef = dbfire.collection('antrians');


export class AntrianClient {
  private db: FirebaseFirestore.Firestore;
  private antrianRef = dbfire.collection('antrians')
 // private layananRef = db.collection('layanans');

constructor() {
  this.db= dbfire;
  this.antrianRef = antrianRef;
 }
  
async addAntrian(codeservice: string){
  console.log(codeservice )
    try {
      const ticketnumber = await this.getticketnumber();
      let ticket = ticketnumber[0];
      
       
       console.log(ticket)
        await antrianRef.add({
          kode_layanan: codeservice,
          Nomer_antrian:ticket,
          Status: false,
          index_antrian : codeservice + '_'+false});
    console.log('test code : ',codeservice )
        } catch (error) {
        throw error
      }
}

async getticketnumber()
{
  let ticketnumber
   try {
    ticketnumber = await this.antrianRef.orderBy('Nomer_antrian','desc').limit(1).get();
    //if ticketnumber.is
    } catch (error) {
      throw error
    } 
    console.log(ticketnumber);
    return ticketnumber.docs.map(doc => doc.data().Nomer_antrian+1); //max number +1
}



async getAntrianALL(){
    let snapshot;
    try {
      snapshot = await this.antrianRef.get()
    } catch (error) {
      throw error
    } 
    console.log(snapshot);
    return snapshot.docs.map(doc => doc.data());
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
      }  
      )} catch (error) {
        throw error
      }
      await antrianRef.add({
        kode_layanan: 'test',
        Nomer_antrian: 0,
        Status: 1,
        index_antrian : 'test_true'


})
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
    return snapshot.docs.map(doc => {return {...doc.data(), id: doc.id} }); // data+ id
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