import {Router} from 'express';
import {AntrianClient} from '../database/antrian';
const antrianClient = new AntrianClient;

const antrianRouter = Router();


antrianRouter.post('/queee' , async (req, res, next)=>
{
const antrian = req.body;
try {
    await antrianClient.addAntrian(antrian);

} catch (error) {
    throw error;
  }

  res.json({
    message: 'success'
  });
});


antrianRouter.get('/queee', async (req, res, next) => {
    let antrian;
    try {
        antrian = await antrianClient.getAntrianALL();
    } catch(error) {
      return next(error);
    }
  
    res.json(antrian);
  });

  antrianRouter.put('/queee/:id', async (req, res, next) => {
    const id =  req.params.id;
    const update = req.body
    let antrian;
    try {
        antrian = await antrianClient.updateStatusAntrian(id, update)
    } catch (error) {
      return next(error);
    }
  
    res.json(antrian);
  });

  antrianRouter.delete('/queee/reset', async (req, res, next) => {
    try {
      await antrianClient.ResetAntrian();
    } catch (error) {
      return next(error);
    }
    res.json({
      message: 'queees cleared',
    });
  })

  //tambah filter by status
//   const arr1 = data.filter(d => d.age > 37);
// console.log('arr1', arr1);



export default antrianRouter;