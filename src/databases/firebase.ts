import admin from 'firebase-admin';
import { serviceAccountCredentials } from '../serviceAccountKey';
const serviceAccount = serviceAccountCredentials as admin.ServiceAccount;

export type Antri = {
  nomor_antri: number;
  jenis_layanan: string;
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://dts20-tugas21.firebaseio.com'
});

const db = admin.firestore();
const accountRef = db.collection('antri');

export class FirebaseClient {
  private  db : FirebaseFirestore.Firestore;
  private accountRef :  FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>

  constructor() {
    this.db = db;
    this.accountRef = accountRef
  }

  async addData(antri: Antri){
    try{
        await accountRef.add(antri);
    } catch (error){
        throw error
    }
    return;
  }

  async getData() {
    let snapshot;
    try{
      snapshot = await this.accountRef.get();
    }catch (error){
      throw error
    }

    console.log(snapshot)
    return snapshot.docs.map(doc => doc.data())
  }

  async getDataById(id: string) {
    let snapshot;
    try {
      snapshot = await accountRef.doc(id).get()

    } catch (error){
      throw error;
    }
    return snapshot.data();
  }

  async getDataByAccountNumber(antriNumber: number) {
    let snapshot;
    try {
      snapshot = await accountRef.where('nomor_antri', '==', antriNumber).get();
    }catch(error){
      throw error;
    }

    return snapshot.docs.map(docs => docs.data())
  }

  async getDataByNoAntri(antri: number) {
    let snapshot;
    try {
      snapshot = await accountRef.where('nomor_antri', '>=', antri).get();
    } catch(error) {
      throw error;
    }

    return snapshot.docs.map(doc => doc.data());
  }
}