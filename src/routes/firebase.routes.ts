import { Router } from 'express';
import { FirebaseClient } from '../databases/firebase';
const firebaseClient = new FirebaseClient();

const router = Router();

//@route    POST /customer/antri
//@desc     Add antri data
router.post('/antri', async (req, res, next) => {
    const antri = req.body;
    try {
        await firebaseClient.addData(antri)
    }catch(error){
        throw error
    }
    res.json({
        message: 'success'
    })
});

//@route    GET /customer/antri
//@desc     Get all antri data
router.get('/antri', async (req, res, next) => {
  let antri;
  try {
    antri = await firebaseClient.getData();
  } catch (error){
      return next(error)
  }
  res.json(antri)
});

//@route    GET /customer/:id
//@desc     Get antri data by Id
router.get('/antri/:id', async (req, res, next) => {
  const id = req.params.id;
  let antri;
  try {
    antri = await firebaseClient.getDataById(id)
  }catch(error){
      return next(error)
  }

  res.json(antri)
});

//@route    GET /customer/antri/number/:antriNum
//@desc     Get antri details by account antri number
router.get('/antri/number/:antriNum', async (req, res, next) => {
  const antriNum = Number(req.params.antriNum);
  let antri;
  try {
      antri = await firebaseClient.getDataByAccountNumber(antriNum)
  } catch (error){
      return next(error);
  }
  res.json(antri);
});

//@route    GET /customer/antri/number/:antriNum
//@desc     Get antri details greater than antri number
router.get('/antri/numberA/:antriNum', async (req, res, next) => {
    const antriNum = Number(req.params.antriNum);
  let antri;
  try {
    antri = await firebaseClient.getDataByNoAntri(antriNum);
  } catch(error) {
    return next(error);
  }

  res.send(antri);
});

export default router;