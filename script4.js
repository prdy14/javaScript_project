const favList = JSON.parse(localStorage.getItem("favList")) || [];
const favProducts = document.getElementById("favProducts");
const cartList = JSON.parse(localStorage.getItem("cartList")) || [];
const count = document.getElementById("count");
count.innerText = cartList.length;

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
          </div>s
          <div class="w-3/5 flex flex-col text-sm">
            <p>${ele.name} </p>
            <p class="text-sm text-slate-600">${Math.floor(
              ele.price.value
            )} x 1</p>
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
