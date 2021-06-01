// the data
let products = [
  {
    id: 1,
    name: "Tv",
    brand: "Soney",
    price: "300",
    discription: "It's a goof Tv",
    picture: "https://picsum.photos/700/300?random=1",
    availibility: 3,
    count: 0,
    sum: null,
  },
  {
    id: 2,
    name: "Tv",
    brand: "samsung",
    price: "350",
    discription: "It's a good as Tv",
    picture: "https://picsum.photos/700/300?random=2",
    availibility: 3,
    count: 0,
    sum: null,
  },
  {
    id: 3,
    name: "Tv",
    brand: "Lg",
    price: "450",
    discription: "It's a Tv",
    picture: "https://picsum.photos/700/300?random=3",
    availibility: 5,
    count: 0,
    sum: null,
  },
  {
    id: 4,
    name: "Phone",
    brand: "Iphone",
    price: "350",
    discription: "It's a good as phone",
    picture: "https://picsum.photos/700/300?random=4",
    availibility: 1,
    count: 0,
    sum: null,
  },
  {
    id: 5,
    name: "Phone",
    brand: "samsung",
    price: "350",
    discription: "It's a phone",
    picture: "https://picsum.photos/700/300?random=5",
    availibility: 5,
    count: 0,
    sum: null,
  },
  {
    id: 6,
    name: "Phone",
    brand: "LG",
    price: "900",
    discription: "It's a really good as Phone",
    picture: "https://picsum.photos/700/300?random=6",
    availibility: 5,
    count: 0,
    sum: null,
  },
  {
    id: 7,
    name: "Keybord",
    brand: "Apple",
    price: "350",
    discription: "It's a good as Keyboard",
    picture: "https://picsum.photos/700/300?random=7",
    availibility: 9,
    count: 0,
    sum: null,
  },
  {
    id: 8,
    name: "Keyboard",
    brand: "samsung",
    price: "350",
    discription: "It's Keyboard",
    picture: "https://picsum.photos/700/300?random=8",
    availibility: 3,
    count: 0,
    sum: null,
  },
];

let productsDiv = document.getElementById("productsDiv");
let cartSideDiv = document.getElementById("cartSide");
let cartDiv = document.getElementById("cart");
let totalPriceDiv = document.createElement("div");
let productDiv = null;
let seceltedProduct = [];
let TotalLastPrice = 0;
let slidIndex = 1;

// to load the product on main page
loadProducts();

// loadin gfunction
function loadProducts() {
  var i;
  for (i = 0; i < products.length; i++) {
    productDiv = document.createElement("div");
    productsDiv.appendChild(productDiv);
    productDiv.insertAdjacentHTML(
      "afterbegin",
      `<h3 class="name">${products[i].name}</h3>  
      <img src=${products[i].picture} alt=${products[i].name}/>
      <h4>${products[i].brand}</h4> 
      <h3>${products[i].price}</h3>
      <p>${products[i].discription}</p>
      <p id=${products[i].id}> Unit Availble : ${products[i].availibility}</p>
      <button class="addBtn" onclick="addToCart(this.id)" id=${products[i].id} >Add to Cart</button>`
    );
    productDiv.className = "productDiv";
  }
}
// checks if localStorage is empty
function checkLocalStorage() {
  if (localStorage.getItem("seceltedProduct") !== null) {
    fromLocalStorageTo();
    cartPage();
    totalPrice();
  }
}

// loading cart page
function cartPage() {
  var i;
  for (i = 0; i < seceltedProduct.length; i++) {
    let cartProducts = document.createElement("div");
    cartDiv.appendChild(cartProducts);
    cartProducts.id = seceltedProduct[i].id;
    cartProducts.className = "cartProducts";
    cartProducts.insertAdjacentHTML(
      "afterbegin",
      `<h3 class="name">${seceltedProduct[i].brand} ${seceltedProduct[i].name}  for  ${seceltedProduct[i].price} $</h3>
          <img src=${seceltedProduct[i].picture} class="cartPicture" alt=${seceltedProduct[i].name}/>
          <span id=${seceltedProduct[i].id} class="amountSpan"> amount :  ${seceltedProduct[i].count}</span>
          `
    );
  }
}

// add to cart button
function addToCart(itemId) {
  availibilityCheck(itemId);
  let i;

  for (i = 0; i < products.length; i++) {
    if (products[i].id == itemId) {
      let isInCart = seceltedProduct.includes(products[i]);
      if (isInCart === true) {
        products[i].count++;
        products[i].availibility--;
        setSeceltedProductToLocalStorage(seceltedProduct);
        document.getElementById(
          products[i].id
        ).innerText = `Unit Availble : ${products[i].availibility}`;
      } else {
        products[i].count++;
        products[i].availibility--;
        document.getElementById(
          products[i].id
        ).innerText = `Unit Availble : ${products[i].availibility}`;
        seceltedProduct.push(products[i]);
        setSeceltedProductToLocalStorage(seceltedProduct);
      }
    }
  }
}

//setting localStorage
function setSeceltedProductToLocalStorage(cartProduct) {
  localStorage.setItem("seceltedProduct", JSON.stringify(cartProduct));
}

//getting data from localStorage
function fromLocalStorageTo() {
  seceltedProduct = JSON.parse(localStorage.getItem("seceltedProduct"));
  return seceltedProduct;
}

// removing btn and function
function removeInCart(itemId) {
  seceltedProduct = JSON.parse(localStorage.getItem("seceltedProduct"));
  let sumi = document.getElementsByTagName("h5");
  let i;
  let j;
  let k;
  for (i = 0; i < seceltedProduct.length; i++) {
    if (seceltedProduct[i].id == itemId) {
      if (seceltedProduct[i].count <= 1) {
        seceltedProduct[i].count--;
        seceltedProduct[i].availibility++;
        cleaning(i, j);
        let removeIndex = seceltedProduct.indexOf(seceltedProduct[i]);
        seceltedProduct.splice(removeIndex, 1);
        setSeceltedProductToLocalStorage(seceltedProduct);
      } else {
        seceltedProduct[i].count--;
        seceltedProduct[i].availibility++;
        seceltedProduct[i].sum =
          seceltedProduct[i].count * seceltedProduct[i].price;
        changeAmount(seceltedProduct[i].id);
        setSeceltedProductToLocalStorage(seceltedProduct);
      }
      for (k = 0; k < sumi.length; k++) {
        if (sumi[k].id == seceltedProduct[i].id) {
          sumi[k].innerText = `for  => ${seceltedProduct[i].sum} $`;
        }
      }
    }
  }
  calculatinTotalLastPrice();
}

// calculating the total last price
function calculatinTotalLastPrice() {
  TotalLastPrice = 0;
  let i;
  for (i = 0; i < seceltedProduct.length; i++) {
    TotalLastPrice += seceltedProduct[i].sum;
    console.log(TotalLastPrice);
  }
  let lastproce = document.getElementById("lastPriceH5");
  lastproce.innerHTML = `<h3>In Total : ${TotalLastPrice} $</h3>`;
  if (TotalLastPrice === 0) {
    lastproce.innerHTML = `<h3>In Total :  0 $</h3>`;
  }
}

// updating amount after remove function
function changeAmount(id) {
  let amountSpanTag = document.getElementsByClassName("amountSpan");
  let i;
  for (i = 0; i < amountSpanTag.length; i++) {
    if (amountSpanTag[i].id == id) {
      amountSpanTag[i].innerText = `amount :  ${seceltedProduct[i].count} `;
    }
  }
}

// total pice of each product
function totalPrice() {
  seceltedProduct = JSON.parse(localStorage.getItem("seceltedProduct"));
  cartSideDiv.appendChild(totalPriceDiv);
  totalPriceDiv.className = "totalPriceDiv";

  let i;
  for (i = 0; i < seceltedProduct.length; i++) {
    let totalList = document.createElement("li");
    totalPriceDiv.appendChild(totalList);
    totalList.className = "listItem";
    totalList.id = seceltedProduct[i].id;
    seceltedProduct[i].sum =
      seceltedProduct[i].count * seceltedProduct[i].price;
    setSeceltedProductToLocalStorage(seceltedProduct);
    TotalLastPrice += seceltedProduct[i].sum;
    totalList.insertAdjacentHTML(
      "afterbegin",
      `<h3> <span id=${seceltedProduct[i].count}>${seceltedProduct[i].count}</span> s${seceltedProduct[i].name} X ${seceltedProduct[i].price} $ </h3> 
          <h5 id=${seceltedProduct[i].id}> for  => ${seceltedProduct[i].sum} $</h5>      
          <button class="removeInCart" onclick="removeInCart(this.id)" id=${seceltedProduct[i].id}> Remove</button>
          `
    );
  }
  let lastPriceDiv = document.createElement("div");
  totalPriceDiv.appendChild(lastPriceDiv);
  lastPriceDiv.className = "lastPriceDiv";
  lastPriceDiv.insertAdjacentHTML(
    "afterbegin",
    `<h5 id="lastPriceH5">In Total : ${TotalLastPrice} $</h5>`
  );
}

// ic case we need to clear localStorage
function clearLocalStorage() {
  seceltedProduct = JSON.parse(localStorage.getItem("seceltedProduct"));
  if (seceltedProduct.length <= 1) {
    localStorage.clear();
    console.log("clear");
  }
}

// updating the DOM after removing function
function cleaning(i, j) {
  let cleanDiv = document.getElementById(seceltedProduct[i].id);

  cleanDiv.innerHTML = "";
  cleanDiv.className = "";
  let cleanList = document.getElementsByTagName("li");
  for (j = 0; j < cleanList.length; j++) {
    if (cleanList[j].id == seceltedProduct[i].id) {
      cleanList[j].innerHTML = "";
      cleanList[j].innerText = "";
    }
  }
}

// disableing btn if product is not availble
function findBtn(id) {
  let allbtn = document.getElementsByTagName("button");
  let i;
  for (i = 0; i < allbtn.length; i++) {
    if (allbtn[i].id == id) {
      allbtn[i].disabled = true;
    }
  }
}

// availibility of a product
function availibilityCheck(id) {
  let i;
  for (i = 0; i < products.length; i++) {
    if (products[i].id == id) {
      if (products[i].availibility <= 1) {
        findBtn(id);
      }
    }
  }
}

// product slideshow

let slidingDiv = document.getElementsByClassName("productDiv");
function showSlide(n) {
  var i;
  if (n > slidingDiv.length) {
    slidIndex = 1;
  }
  if (n < 1) {
    slidIndex = slidingDiv.length;
  }
  for (i = 0; i < slidingDiv.length; i++) {
    slidingDiv[i].style.display = "none";
  }
  slidingDiv[slidIndex - 1].style.display = "block";
}

showSlide(slidIndex);

function plusSlide(n) {
  showSlide((slidIndex += n));
}
