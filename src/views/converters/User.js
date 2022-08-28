class User {
    constructor (name, email, imageurl, phonenum, country, money, item) {
        this.name = name;
        this.email = email;
        this.imageurl = imageurl;
        this.phonenum = phonenum;
        this.country = country;
        this.money = money;
        this.item = item;
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
        imageurl: user.imageurl,
        phonenum: user.phonenum,
        country: user.country,
        money: user.money,
        item: user.item
        };
},
fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new User(data.name, data.email, data.imageurl, data.phonenum, data.country, data.money, data.items);
}
};

// const retreiveUserData  = () => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         const uid = user.uid;
//         //setData() 
//         getDoc(doc(db, "users", uid).withConverter(userConverter)).then(docSnap => {
//           if (docSnap.exists()) {
//             console.log("Document data:", docSnap.data());
//             return docSnap.data();
//           } else {
//             console.log("No such document!");
//           }
//         })
//       }
//     });
//   };

export {userConverter}


  
  

