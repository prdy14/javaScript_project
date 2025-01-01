const favList = JSON.parse(localStorage.getItem("favList")) || [];
const favProducts = document.getElementById("favProducts");
const cartList = JSON.parse(localStorage.getItem("cartList")) || [];
const count = document.getElementById("count");
count.innerText = cartList.length;
favList.map((ele, i) => {
  const card = document.createElement("div");
  card.className = "m-3";
  card.innerHTML = `
    <div class="bg-white flex flex-col text-slate-700 rounded-xl sm:rounded-2xl shadow-md group">
          <div class="grid">
            <div class="bg-primary text-xs py-1 pl-2  rounded-lg font-semibold text-white z-10 layer h-6 w-16 m-4">${Math.floor(
              (110 / ele.price.value) * 100
            )}%
              off
            </div>
            <div class="layer mr-4 ml-auto mt-4 sm:group-hover:opacity-100 sm:opacity-0 z-10 duration-500 ">
              <a class="h-9 w-9 hover:bg-slate-100 flex justify-center rounded-md"><img src="./images/eye-solid.svg"
                  alt="" class="w-5" id = "details${i}"></a>
              <div class="h-9 w-9  hover:bg-slate-100 flex justify-center rounded-md " id="fav${i}">
                <img src="${
                  isThere(favList, ele) == -1
                    ? "./images/heart-regular.svg"
                    : "./images/heart-solid.svg"
                }" alt="" class="w-5">
              </div>
            </div>
            <div class="layer flex justify-center">
              <img
                src="${ele.images[0].url}"
                alt="" class="md:max-w-44 max-w-36  m-6 mx-9 group-hover:scale-90 duration-500">
            </div>
          </div>
          <hr>
          <div class="m-4  ">
            <p class="mb-2 text-ellipsis overflow-hidden whitespace-nowrap">${
              ele.name
            }</p>
            <div class="flex justify-between">
              <div class="flex  ">
                <p class="text-primary font-semibold pr-2">$${
                  ele.price.value
                }</p>
                <del>$${ele.price.value + 100}</del>
              </div>
              <button class="border-2 rounded-md grid ${
                isThere(cartList, ele) !== -1
                  ? ` border-slate-600`
                  : `border-primary`
              }" id="cart${i}">
                ${
                  isThere(cartList, ele) == -1
                    ? `<svg class="w-6" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AddIcon">
                  <path fill="#d23f57" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"></path>
                </svg>`
                    : `<svg class="w-6" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="RemoveIcon">
                  <path d="M19 13H5v-2h14z"></path>
                </svg>`
                }
              </button>
            </div>
          </div>
        </div>
  `;
  favProducts.appendChild(card);
  const fav = document.getElementById(`fav${i}`);
  fav.addEventListener("click", () => {
    const there = isThere(favList, ele);
    console.log(there);
    if (there != -1) {
      favList.splice(there, 1);
      fav.lastChild.remove();
      fav.innerHTML = `<img src="./images/heart-regular.svg" alt="" class="w-5" />`;
    } else {
      favList.push(ele);
      fav.lastChild.remove();

      fav.innerHTML = `<img src="./images/heart-solid.svg" alt="" class="w-5">`;
    }
    localStorage.setItem("favList", JSON.stringify(favList));
  });

  const cart = document.getElementById(`cart${i}`);

  cart.addEventListener("click", () => {
    const there = isThere(cartList, ele);
    console.log(there);
    if (there == -1) {
      cartList.push(ele);
      cart.classList.remove("border-primary");
      cart.classList.add("border-slate-600");
      cart.innerHTML = `<svg class="w-6" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="RemoveIcon">
                  <path d="M19 13H5v-2h14z"></path>
                </svg>`;
    } else {
      cartList.splice(there, 1);
      cart.classList.remove("border-slate-600");
      cart.classList.add("border-primary");
      cart.innerHTML = `<svg class="w-6" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AddIcon">
                  <path fill="#d23f57" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"></path>
                </svg>`;
    }
    count.innerText = cartList.length;
    localStorage.setItem("cartList", JSON.stringify(cartList));
  });
});
const show = document.getElementById("cart");
const itemsCount = document.getElementById("items");
function openCart() {
  cartProducts.innerHTML = "";
  itemsCount.innerText = `${cartList.length} items`;
  show.style.display = "flex";
  let sum = 0;
  cartList.forEach((ele, i) => {
    sum = sum + ele.price.value;
    const product = document.createElement("div");
    product.className = "flex mt-6 w-full justify-between";
    product.innerHTML = `
 <div class="flex mt-6 w-full justify-between">
          <div class="w-24 h-24  bg-slate-50 rounded-2xl ">
            <img
              src="${ele.images[0].url}"
              alt="" class="object-contain w-24 h-24">
          </div>
          <div class="w-3/5 flex flex-col text-sm">
            <p>${ele.name} </p>
            <p class="text-sm text-slate-600">${ele.price.value} x 1</p>
            <div class="flex mt-4">
              <button class="border w-5 h-5 rounded-md  flex justify-center items-center border-primary">
                <svg class="w-4" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="AddIcon">
                  <path fill="#d23f57" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"></path>
                </svg>
              </button>
              <p class="text-center mx-2">1</p>

              <button class="border w-5 h-5 rounded-md border-slate-600 flex justify-center items-center">
                <svg class="w-4" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="RemoveIcon">
                  <path d="M19 13H5v-2h14z"></path>
                </svg>
              </button>
            </div>
          </div>
          <button id=${ele.code}>
            <svg class="w-5" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ClearIcon">
              <path fill="#94a3b8"
                d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
              </path>
            </svg>
          </button>
        </div>
  `;
    cartProducts.appendChild(product);

    const item = document.getElementById(`${ele.code}`);
    item.addEventListener("click", () => {
      cartList.splice(isThere(cartList, ele), 1);
      localStorage.setItem("cartList", JSON.stringify(cartList));
      openCart();
    });
  });
  const totalBill = document.getElementById("checkout");
  totalBill.innerText = `Total Bill: ${sum}`;
}

function closeCart() {
  show.style.display = "none";
}

function isThere(arr, ele) {
  let flag = -1;
  arr.forEach((item, i) => {
    if (item.code == ele.code) {
      flag = i;
    }
  });
  return flag;
}
