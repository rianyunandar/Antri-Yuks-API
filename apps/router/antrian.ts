import {Router} from 'express';
import {AntrianClient} from '../database/antrian';
const antrianClient = new AntrianClient;

const antrianRouter = Router();



// kode_layanan: string;
// Nomer_antrian: number;
// Status: boolean;
// kode_status : string;


antrianRouter.post('/add' , async (req, res, next)=>
{
const codeservice =req.body.kode_layanan;
try {
    await antrianClient.addAntrian(codeservice);

} catch (error) {
    throw error;
  }

  res.json({
    message: 'success'
  });
});


antrianRouter.get('/all', async (req, res, next) => {
    let antrian;
    try {
        antrian = await antrianClient.getAntrianALL();
    } catch(error) {
      return next(error);
    }
  
    res.json(antrian);
  });


  antrianRouter.get('/nextnumber', async (req, res, next) => {
    let antrian;
    try {
        antrian = await antrianClient.getticketnumber();
    } catch(error) {
      return next(error);
    }
  
    res.json(antrian);
  });

  // antrianRouter.put('/antriansele/:id', async (req, res, next) => {
  //   const id =  req.params.id;
  //   const update = req.body
  //   let antrian;
  //   try {
  //       antrian = await antrianClient.updateStatusAntrian(id, update)
  //   } catch (error) {
  //     return next(error);
  //   }
  // });

  antrianRouter.delete('/reset', async (req, res, next) => {
    try {
      await antrianClient.ResetAntrian();
    } catch (error) {
      return next(error);
    }
    res.json({
      message: 'queees cleared',
    });
  })


  antrianRouter.get('/:id', async (req, res, next) => {
  const id =  req.params.id;
  let antrian;
    try {
        antrian = await antrianClient.getAntrianByLayanan(id);
    } catch(error) {
      return next(error);
    }
     
  
    res.json(antrian);
  });;

  antrianRouter.get('/:service/:status', async (req, res, next) => {
    const id = req.params.service+'_'+req.params.status;
    console.log(id);
    let antrian;
      try {
          antrian = await antrianClient.getbystatusservice(id);
      } catch(error) {
        return next(error);
      }
       
      res.json(antrian);
    });;




  
  //tambah filter by status
//   
// console.log('arr1', arr1);



export default antrianRouter;