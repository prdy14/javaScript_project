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
const details = JSON.parse(localStorage.getItem("details"));
const productDetails = document.getElementById("productDetails");

productDetails.innerHTML = `
<div class="sm:w-1/2 m-3">
      <div class="rounded-3xl border mb-5 flex justify-center">

        <img
          src=${details.images[0].url}
          alt="" width="auto">
      </div>
      <div class="flex justify-center">
        <div class=" border rounded-lg bg-slate-50"><img
            src=${details.images[0].url}
            alt="" class="w-20"></div>
        <div class="border rounded-lg bg-slate-50 ml-2"><img
            src=${details.images[0].url}
            alt="" class="w-20"></div>
      </div>
    </div>
    <div class="p-5 space-y-4">
      <div class="font-sans font-semibold text-3xl uppercase ml-0">${
        details.name
      }</div>
      <div>Rated: <span>&#10032 &#10032 &#10032 &#10032 &#10032</span> (0)</div>
      <div>

        <div>option</div>
        <div class="my-2">
          <span class="border rounded p-1 mr-1 border-primary">option 1</span>
          <span class="border rounded p-1 mr-1 border-slate-600">option 2</span>
          <span class="border rounded p-1 mr-1 border-slate-600">option 3</span>
          <span class="border rounded p-1 mr-1 border-slate-600">option 4</span>
        </div>
      </div>
      <div>

        <div>
          type
        </div>
        <div class="my-2">
          <span class="border rounded p-1 mr-1 border-primary">type 1</span>
          <span class="border rounded p-1 mr-1 border-slate-600">type 2</span>
          <span class="border rounded p-1 mr-1 border-slate-600">type 3</span>
          <span class="border rounded p-1 mr-1 border-slate-600">type 4</span>
        </div>
      </div>

      <div>

        <div class="text-primary font-semibold text-3xl mt-2">Rs.${Math.floor(
          details.price.value
        )}</div>
        <div>Stock available</div>
      </div>

      <button class="h-11 rounded-md w-40 mt-3 bg-primary text-white text-lg">Add To Cart</button>

    </div>
`;
