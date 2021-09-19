import firebase from "firebase"
import "firebase/firestore"

import { firebaseConfig } from "../config/Db"

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

const firestore = firebase.firestore();
const categoryRef = firestore.collection('categories')

export const addCategory = async (title) => {
    try {
        const snapshot = await categoryRef.where('label', '==', title).get();
        if (snapshot.empty) {
            return await categoryRef.add({ label: title, value: title });
        }
        return false;
    } catch (error) {
        return false;
    }
}

export const getCategories = async () => {
    return categoryRef;
}

export const getAllNewCategories = async () => {
    const snapshot = await categoryRef.get();
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