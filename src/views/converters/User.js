class User {
    constructor (name, email, imageurl, phonenum, country, money, item, favoritepets) {
        this.name = name;
        this.email = email;
        this.imageurl = imageurl;
        this.phonenum = phonenum;
        this.country = country;
        this.money = money;
        this.item = item;
        this.favoritepets = favoritepets;
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
        item: user.item,
        favoritepets: user.favoritepets
        };
},
fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new User(data.name, data.email, data.imageurl, data.phonenum, data.country, data.money, data.item, data.favoritepets);
}
};


export {userConverter}


  
  

