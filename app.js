let products = [
  {
    id: 1,
    name: "Tv",
    brand: "Soney",
    price: "300$",
    discription: "It's a goof Tv",
    picture: "https://picsum.photos/400/300?random=1",
    availibility: 3,
    count: 0,
  },
  {
    id: 2,
    name: "Tv",
    brand: "samsung",
    price: "350$",
    discription: "It's a good as Tv",
    picture: "https://picsum.photos/400/300?random=2",
    availibility: 3,
    count: 0,
  },
  {
    id: 3,
    name: "Tv",
    brand: "Lg",
    price: "450$",
    discription: "It's a Tv",
    picture: "https://picsum.photos/400/300?random=3",
    availibility: 5,
    count: 0,
  },
  {
    id: 4,
    name: "Phone",
    brand: "Iphone",
    price: "350$",
    discription: "It's a good as phone",
    picture: "https://picsum.photos/400/300?random=4",
    availibility: 0,
    count: 0,
  },
  {
    id: 5,
    name: "Phone",
    brand: "samsung",
    price: "350$",
    discription: "It's a phone",
    picture: "https://picsum.photos/400/300?random=5",
    availibility: 5,
    count: 0,
  },
  {
    id: 6,
    name: "Phone",
    brand: "LG",
    price: "900$",
    discription: "It's a really good as Phone",
    picture: "https://picsum.photos/400/300?random=6",
    availibility: 5,
    count: 0,
  },
  {
    id: 7,
    name: "Keybord",
    brand: "Apple",
    price: "350$",
    discription: "It's a good as Keyboard",
    picture: "https://picsum.photos/400/300?random=7",
    availibility: 9,
    count: 0,
  },
  {
    id: 8,
    name: "Keyboard",
    brand: "samsung",
    price: "350$",
    discription: "It's Keyboard",
    picture: "https://picsum.photos/400/300?random=8",
    availibility: 3,
    count: 0,
  },
];

let productsDiv = document.getElementById("productsDiv");
let cartDiv = document.getElementById("cart");

function loadProducts() {
  var i;
  for (i = 0; i < products.length; i++) {
    let productDiv = document.createElement("div");
    productsDiv.appendChild(productDiv);
    productDiv.insertAdjacentHTML(
      "afterbegin",
      `<h3 class="name">${products[i].name}</h3>  
      <img src=${products[i].picture} alt=${products[i].name}/>
      <h4>${products[i].brand}</h4> 
      <h3>${products[i].price}</h3>
      <p>${products[i].discription}</p>
      <p id="availibility"> Unit Availble : ${products[i].availibility}</p>
      <button class="addBtn" onclick="addToCart(this.id)" id=${products[i].id} >Add to Cart</button>`
    );
    productDiv.className = "productDiv";
  }
  availibilityCheck();
}
loadProducts();

function availibilityCheck() {
  let i;
  for (i = 0; i < products.length; i++) {
    if (products[i].availibility < 1) {
      document.getElementById(products[i].id).disabled = true;
    }
  }
}
let seceltedProduct = [];

function addToCart(e) {
  availibilityCheck();
  let itemId = e;
  let i;
  for (i = 0; i < products.length; i++) {
    if (products[i].id == itemId) {
      let isInCart = seceltedProduct.includes(products[i]);
      if (isInCart === true) {
        products[i].count++;
        document.getElementById(
          "amount"
        ).innerText = `amount :  ${products[i].count} `;
        products[i].availibility--;
        // document.getElementById(
        //   "availibility"
        // ).innerText = `Unit Availble : ${products[i].availibility}`;
      } else {
        seceltedProduct.push(products[i]);
        products[i].count++;
        products[i].availibility--;
        // document.getElementById(
        //   "availibility"
        // ).innerText = `Unit Availble : ${products[i].availibility}`;
        // let cartProducts = document.createElement("div");
        // cartDiv.appendChild(cartProducts);
        // cartProducts.className = "cartProducts";
        // cartProducts.insertAdjacentHTML(
        //   "afterbegin",
        //   `<h3 class="name">${products[i].brand} ${products[i].name}  for  ${products[i].price}</h3>
        //       <img src=${products[i].picture} class="cartPicture" alt=${products[i].name}/>
        //       <span id="amount"> amount :  ${products[i].count}</span>
        //       <button class="addInCart" onclick="addInCart(this.id)" id=${products[i].id} > Add</button>
        //       <button class="removeInCart" onclick="removeInCart(this.id)" id=${products[i].id}> Remove</button>
        //       `
        // );
      }
    }
  }
}
function addInCart(e) {
  availibilityCheck();
  let itemId = e;
  let i;
  for (i = 0; i < products.length; i++) {
    if (products[i].id == itemId) {
      if (products[i].availibility >= 1) {
        products[i].count++;
        document.getElementById(
          "amount"
        ).innerText = `amount :  ${products[i].count} `;
        products[i].availibility--;
      } else if (products[i].availibility < 1) {
        document.getElementById(products[i].id).disabled = true;
      }
    }
  }
}

function removeInCart(e) {
  let itemId = e;
  let i;
  for (i = 0; i < products.length; i++) {
    if (products[i].id == itemId) {
      products[i].count--;
      products[i].availibility++;
      //   if (products[i].count < 1) {
      //     let cleanDiv = document.getElementsByClassName("name").parentElement;
      //     console.log(cleanDiv);
      //     cleanDiv.innerHTML = "";
      //   }
      //   document.getElementById(
      //     "amount"
      //   ).innerText = `amount : ${products[i].count}`;
      //   document.getElementById(
      //     "availibility"
      //   ).innerText = `Unit Availble : ${products[i].availibility}`;
    }
  }
}
