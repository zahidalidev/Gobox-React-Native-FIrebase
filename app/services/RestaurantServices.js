import firebase from "firebase"
import "firebase/firestore"
import uuid from "uuid";

import { firebaseConfig } from "../config/Db"

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}

const firestore = firebase.firestore();
const restaurantRef = firestore.collection('restaurants')

export const addRestaurant = async (name, uri) => {
    try {

        const snapshot = await restaurantRef.where('name', '==', name).get();
        if (snapshot.empty) {

            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    resolve(xhr.response);
                };
                xhr.onerror = function (e) {
                    reject(new TypeError("Network request failed"));
                };
                xhr.responseType = "blob";
                xhr.open("GET", uri, true);
                xhr.send(null);
            });

            const ref = firebase.storage().ref().child(uuid.v4());
            const snapshot = await ref.put(blob);

            // We're done with the blob, close and release it
            blob.close();

            const ImageUrl = await snapshot.ref.getDownloadURL();

            return await restaurantRef.add({ name: name, image: ImageUrl });
        }
        return false;
    } catch (error) {
        return false;
    }
}

export const getRestaurentRef = async () => {
    return restaurantRef;
}

export const getAllNewRestaurents = async () => {
    const snapshot = await restaurantRef.get();
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