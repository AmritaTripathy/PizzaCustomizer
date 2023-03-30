const pizzaDropzone = document.getElementById("pizza-dropzone");
const ingredientsList = document.querySelectorAll(".ingredient");
const baseList = document.querySelectorAll(".base");
const orderList = document.getElementById("order-list");
const submitOrderBtn = document.getElementById("order-button");
let selectedIngredients = [];

// container
const base_container = document.getElementById("base-container");
const ingredients_container = document.getElementById("ingredients-container");

// hide feature
changeVisibility("base");
function changeVisibility(showElement) {
	if (showElement === "base") {
		ingredients_container.style.display = "none";
		base_container.style.display = "block";
	} else {
		ingredients_container.style.display = "block";
		base_container.style.display = "none";
	}
}

// Add event listeners for ingredients
ingredientsList.forEach((ingredient) => {
	ingredient.addEventListener("dragstart", dragStart);
});

baseList.forEach((base) => {
	base.addEventListener("dragstart", dragStart);
});

// Add event listeners for pizza drop zone
pizzaDropzone.addEventListener("dragover", dragOver);
pizzaDropzone.addEventListener("drop", dropPizza);

// Add event listener for submit order button
submitOrderBtn.addEventListener("click", submitOrder);

// function dragStart(event) {
//   event.dataTransfer.setData("img", event.target.querySelector("img").src);
//   // console.log(event.target.querySelector("img").src);
// }
function dragStart(event) {
	console.log(event.target.nodeName);
	if (event.target.nodeName === "LI")
		event.dataTransfer.setData("img", event.target.querySelector("img").src);
	else if (event.target.nodeName === "IMG")
		event.dataTransfer.setData("img", event.target.src);
	// console.log(event.target.querySelector("img").src);
}

function dragOver(event) {
	event.preventDefault();
}

// function dropPizza(event) {
//   changeVisibility("ingredients");

//   event.preventDefault();
//   const draggedImg = event.dataTransfer.getData("img");
//   console.log(draggedImg);

//   const draggedElement = document.createElement("div");
//   const imageElement = document.createElement("img");
//   imageElement.className = "dropzone-img";
//   imageElement.src = draggedImg;
//   draggedElement.innerHTML = imageElement;
//   console.log(draggedElement);
//   // draggedElement.classList.add("pizza-ingredient");
//   pizzaDropzone.appendChild(imageElement);
//   selectedIngredients.push(imageElement);
//   // updateOrderList();
// }

function dropPizza(event) {
	changeVisibility("ingredients");
	event.preventDefault();
	const draggedImg = event.dataTransfer.getData("img");
	const newImageElement = document.createElement("img");
	// newImageElement.className = "dropzone-img";
	newImageElement.src = draggedImg;
	// if (pizzaDropzone.children.length > 0) {
	// 	pizzaDropzone.removeChild(pizzaDropzone.firstChild);
	// }
	pizzaDropzone.appendChild(newImageElement);
	selectedIngredients.push(newImageElement);
	// updateOrderList();

	if (selectedIngredients.length === 1) {
		newImageElement.className = "dropzone-base";
	} else if (selectedIngredients.length > 1) {
		newImageElement.className = "dropzone-ingredient";
		// newImageElement.style.top = selectedIngredients.length;
	}
}

function updateOrderList() {
	orderList.innerHTML = "";
	selectedIngredients.forEach((ingredient) => {
		const listItem = document.createElement("li");
		listItem.innerText = ingredient;
		orderList.appendChild(listItem);
	});
}

function submitOrder() {
	if (selectedIngredients.length > 1) window.alert("Your order is placed");
	else window.alert("Please select ingredients before proceeding");
}
