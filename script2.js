const favList = JSON.parse(localStorage.getItem("favList")) || [];
const favProducts = document.getElementById("favProducts");
favList.map((ele, i) => {
  const card = document.createElement("div");
  card.className = "m-3";
  card.innerHTML = `
    <div class="bg-white flex flex-col text-slate-700 rounded-xl sm:rounded-2xl shadow-md group">
          <div class="grid">
            <div class="bg-primary text-xs py-1 pl-2  rounded-lg font-semibold text-white z-10 layer h-6 w-16 m-4">21%
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
            <p class="mb-2 ">${ele.name}</p>
            <div class="flex justify-between">
              <div class="flex  ">
                <p class="text-primary font-semibold pr-2">$${
                  ele.price.value
                }</p>
                <del>$${ele.price.value + 100}</del>
              </div>
              <div class="border-2 rounded-md w-6 h-6 grid border-primary" id="details${i}">
                <div class="layer w-0.5 h-3 bg-primary mp"></div>
                <div class="layer w-3 h-0.5 bg-primary ml"></div>
              </div>
            </div>
          </div>
        </div>
  `;
  favProducts.appendChild(card);
  const fav = document.getElementById(`fav${i}`);
  fav.addEventListener("click", () => {
    const there = isThere(favList, ele);

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
});

function isThere(arr, ele) {
  let flag = -1;
  arr.forEach((item, i) => {
    if (item.code == ele.code) {
      flag = i;
    }
  });
  return flag;
}
