import { onAuthStateChanged } from "firebase/auth";
import {db, auth}  from '../../../firebase'
import { collection, addDoc, getDoc, doc } from "firebase/firestore"; 

class User {
    constructor (name, email, imageurl ) {
        this.name = name;
        this.email = email;
        this.imageurl = imageurl;
    }
    toString() {
        return this.name + ', ' + this.email + ', ' + this.imageurl;
    }
  }
  
const userConverter = {
toFirestore: (user) => {
    return {
        name: user.name,
        email: user.email,
        imageurl: user.imageurl
        };
},
fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new User(data.name, data.email, data.imageurl);
}
};

const retreiveUserData  = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        //setData() 
        getDoc(doc(db, "users", uid).withConverter(userConverter)).then(docSnap => {
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            return docSnap.data();
          } else {
            console.log("No such document!");
          }
        })
      }
    });
  };

export const userData = retreiveUserData()


  
  

