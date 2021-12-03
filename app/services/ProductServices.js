import firebase from "firebase"
import "firebase/firestore"

import { firebaseConfig } from "../config/Db"

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

const firestore = firebase.firestore();
const productRef = firestore.collection('products')


export const addProduct = async (body) => {
    try {
        return await productRef.add(body);
    } catch (error) {
        console.log("Product Service Error: ", error)
    }
}

export const getProducts = async () => {
    const snapshot = await productRef.get();
    if (snapshot.empty) {
        return false;
    }

    let res = []
    snapshot.forEach(doc => {
        let tempRes = doc.data()
        tempRes.docId = doc.id
        res.push(tempRes)
    });

    return res;
}

export const getProductRef = async () => {
    return productRef;
}