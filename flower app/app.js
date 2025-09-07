// PRODUCTS
const products = [
  { id:1, name:"Rose Garland", price:150, img:"https://share.google/images/m1hpJoMC1gAbb8ArV" },
  { id:2, name:"Jasmine Basket", price:120, img:"https://source.unsplash.com/400x300/?jasmine,flowers" },
  { id:3, name:"Marigold Strings", price:100, img:"https://source.unsplash.com/400x300/?marigold,flowers" },
  { id:4, name:"Lotus Pack", price:180, img:"https://source.unsplash.com/400x300/?lotus,flowers" },
  { id:5, name:"Tulip Bunch", price:160, img:"https://source.unsplash.com/400x300/?tulip,flowers" },
  { id:6, name:"Mix Bouquet", price:250, img:"https://source.unsplash.com/400x300/?bouquet,flowers" },
  { id:7, name:"Mi Bouquet", price:350, img:"https://source.unsplash.com/400x300/?bouquet,flowers" }
];

let cart = [];

// RENDER PRODUCTS
function renderProducts(list=products){
  const container = document.getElementById("productList");
  container.innerHTML = "";
  list.forEach(p=>{
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    container.appendChild(div);
  });
}
renderProducts();

// ADD TO CART
function addToCart(id){
  const p = products.find(prod=>prod.id===id);
  cart.push(p);
  document.getElementById("cartCount").textContent = cart.length;
}

// CART MODAL
function toggleCart(){
  const modal = document.getElementById("cartModal");
  modal.style.display = modal.style.display==="flex"?"none":"flex";
  renderCart();
}

function renderCart(){
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML="";
  let total=0;
  cart.forEach((item,index)=>{
    total+=item.price;
    cartItems.innerHTML+=`<li>${item.name} - ₹${item.price} <button onclick="removeItem(${index})">❌</button></li>`;
  });
  document.getElementById("cartTotal").textContent=total;
}

function removeItem(i){ cart.splice(i,1); document.getElementById("cartCount").textContent=cart.length; renderCart(); }

function checkout(){ 
  const method = document.getElementById("paymentMethod").value;
  if(cart.length===0){ alert("Cart is empty"); return; }
  alert("Order placed with "+method.toUpperCase()+" payment!");
  cart=[]; document.getElementById("cartCount").textContent=0; toggleCart();
}

// SUBSCRIBE
function subscribe(){
  const email = document.getElementById("subEmail").value;
  if(email) alert("Subscribed with "+email);
}

// POPUPS
function openModal(id){ document.getElementById(id).style.display="flex"; }
function closeModal(id){ document.getElementById(id).style.display="none"; }
function switchModal(hide,show){ closeModal(hide); openModal(show); }

// REGISTER
document.getElementById("registerForm").addEventListener("submit",e=>{
  e.preventDefault();
  const user={name:document.getElementById("regName").value, phone:document.getElementById("regPhone").value, pass:document.getElementById("regPassword").value};
  localStorage.setItem("user",JSON.stringify(user));
  alert("Registered successfully!");
  closeModal("registerModal");
});

// LOGIN
document.getElementById("loginForm").addEventListener("submit",e=>{
  e.preventDefault();
  const phone=document.getElementById("loginPhone").value;
  const pass=document.getElementById("loginPassword").value;
  const user=JSON.parse(localStorage.getItem("user"));
  if(user && user.phone===phone && user.pass===pass){
    alert("Welcome "+user.name);
    closeModal("loginModal");
  }else{ alert("Invalid credentials"); }
});

// SEARCH
document.getElementById("searchBox").addEventListener("input",e=>{
  const q=e.target.value.toLowerCase();
  const filtered=products.filter(p=>p.name.toLowerCase().includes(q));
  renderProducts(filtered);
});

// LANGUAGE SUPPORT
const translations={
  ta:{welcome:"புதிய மலர்களுக்கு வரவேற்கிறோம்", tagline:"பூஜை, அலங்காரம் மற்றும் மேலும் மலிவான மலர்கள்", subscribe:"தினசரி மலர்களுக்கு சந்தாதாரராகுங்கள்", footerText:"🌸 எங்கு வேண்டுமானாலும், எப்போது வேண்டுமானாலும் அன்புடன் மலர்களை வழங்குகிறோம் 🌸"},
  te:{welcome:"తాజా పుష్పాలకు స్వాగతం", tagline:"పూజ, అలంకరణ మరియు మరిన్ని కోసం చవకైన పువ్వులు", subscribe:"దైనందిన పూల కోసం సభ్యత్వాన్ని పొందండి", footerText:"🌸 ఎక్కడైనా, ఎప్పుడైనా ప్రేమతో పువ్వులు పంపిణీ 🌸"},
  kn:{welcome:"ತಾಜಾ ಹೂಗಳಿಗೆ ಸ್ವಾಗತ", tagline:"ಪೂಜಾ, ಅಲಂಕಾರ ಮತ್ತು ಇನ್ನಷ್ಟುಕ್ಕೆ ಅಗ್ಗದ ಹೂಗಳು", subscribe:"ದೈನಂದಿನ ಹೂಗಳಿಗೆ ಚಂದಾದಾರರಾಗಿ", footerText:"🌸 ಎಲ್ಲೆಡೆ, ಯಾವಾಗ ಬೇಕಾದರೂ ಪ್ರೀತಿಯಿಂದ ಹೂಗಳನ್ನು ತಲುಪಿಸುತ್ತೇವೆ 🌸"},
  en:{welcome:"Welcome to Fresh Petals", tagline:"Affordable flowers for Pooja, Decoration & More", subscribe:"Subscribe for Daily Flowers", footerText:"🌸 Fresh Petals - Delivering flowers anywhere, anytime with love 🌸"}
};

function changeLanguage(){
  const lang=document.getElementById("languageSelect").value;
  document.querySelectorAll("[data-lang]").forEach(el=>{
    const key=el.getAttribute("data-lang");
    el.textContent=translations[lang][key];
  });
}
