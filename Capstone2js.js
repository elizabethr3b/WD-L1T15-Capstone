  const currencyformatter = new Intl.NumberFormat('en-US', {style: 'currency',currency: 'GBP',});
  
  //this outside the functions so that they can be accessed by various functions//
  //constructor function to create an object with properties of picutre, title, size and price for each catalogue item//
  function catalogueItem (picture, title, size, price, pounds, itemInfo, prodPage) {
    this.picture = picture;
    this.title = title;
    this.size = size;
    this.price = price;
    this.pounds = pounds;
    this.itemInfo = itemInfo;
    this.prodPage = prodPage
  } 
  //create an array of items with their individual property values//
  let item1 = new catalogueItem (src="images/item1.jpg", "Item1", "Size 14", "£10", 10, "A lovely item suitable for work or occasions", "prodItem1.html")
  let item2 = new catalogueItem (src="images/item2.jpg", "Item2", "Size 12", "£12", 12, "A great dress hardly worn", "prodItem2.html")
  let item3 = new catalogueItem (src="images/item3.jpg", "Item3", "Size 16", "£8", 8, "Really flattering and classic shape", "prodItem3.html")
  let item4 = new catalogueItem (src="images/item4.jpg", "Item4", "Size 10", "£11",11, "Cocktail style dress with some nice detail", "prodItem4.html")
  let item5 = new catalogueItem (src="images/item5.jpg", "Item5", "Size 12", "£10", 10, "A lovely item suitable for work or occasions", "prodItem5.html")
  let item6 = new catalogueItem (src="images/item6.jpg", "Item6", "Size 14", "£16", 16, "A great dress hardly worn", "prodItem6.html")
  let item7 = new catalogueItem (src="images/item7.jpg", "Item7", "Size 10", "£10", 10, "Really flattering and classic shape", "prodItem7.html")
  let item8 = new catalogueItem (src="images/item8.jpg", "Item8", "Size 12", "£14", 14, "Cocktail style dress with some nice detail", "prodItem8.html")
  let cartEmpty = new catalogueItem(src="","Cart is Empty", "", "", "", "",)

  let itemsArray = [item1, item2, item3, item4, item5, item6, item7, item8]//array for the catalogue page using all objects//
  let cart = JSON.parse(sessionStorage.getItem('cart')) || [];


  //CREATE THE CATALOGUE PAGE//
  function onLoad(){   
      
itemsArray.forEach((item) => {
  let catalogueSec = document.getElementById("CatalogueSection")//this is where the following will be appended to in the HTML page//
  
  let itemDeets = document.createElement("figure")
  catalogueSec.appendChild(itemDeets);
 
    let itemPic = document.createElement("img");
  itemPic.src = item.picture;
  itemPic.style.height = "200px";
  itemPic.style.width = "200px"; 
  itemDeets.appendChild(itemPic);
  
  let itemDes = document.createElement("figcaption");
  itemDes.innerHTML = item.title + "     " + item.size + "     " + item.price
  itemDeets.appendChild(itemDes);

  //create a Quick Buy button for each object in an array which has a function set_RunningTotal to add it to the session storge and update the alert// 
  let quickBuy = document.createElement("button");
  itemDeets.appendChild(quickBuy);
  quickBuy.innerHTML = "Buy Now";
  quickBuy.classList.add("btn")
  quickBuy.addEventListener("click", set_RunningTotal)
  quickBuy.addEventListener("click", addToCart)

  //create the more info button with function that opens a new window for a product page//
  let moreInfo = document.createElement("p");
  moreInfo.innerHTML = "click for more information";
  moreInfo.style.fontWeight = "bold";
  itemDeets.appendChild(moreInfo);
  moreInfo.addEventListener("click", function () { //open a new window using the same stylesheet and header//
  let prodPage = window.open("")
  prodPage.document.write("<link rel='stylesheet' href='CapstoneIIcss.css'>")
  let header = "<header><nav id='Top'><ul><li><a href='LandingPage.html'>Home</a></li><li><a href='OnlineStore.html'>Catalogue</a></li><li><a href='ShippingInfo.html'>Shipping and Returns</a></li><li><a href='MailingList.html'>Join Mailing List</a></li><li id='cartLink'><a href='Cart.html'>Cart</a></li><li><a href='LandingPage.html'><img id='headerimg' src='images/image8.jpg' alt='logo></a></li></ul></nav><br><br><br></br></header>"
  prodPage.document.write(header);

  let itemInfo = prodPage.document.createElement("p");
  prodPage.document.body.appendChild(itemInfo);
   itemInfo.classList.add("prodPara");
    let itemText = prodPage.document.createTextNode(item.itemInfo);
    itemInfo.appendChild(itemText);
 
  let itemPic = document.createElement("img")
  prodPage.document.body.appendChild(itemPic);
   itemPic.classList.add("itemPic");
   itemPic.src = item.picture

   let itemPara = prodPage.document.createElement("p");
  prodPage.document.body.appendChild(itemPara);
   itemPara.classList.add("prodPara");
    let paraText = prodPage.document.createTextNode(item.size + ", " + item.price);
    itemPara.appendChild(paraText);

//create a Buy Now button also with the function set_RunningTotal to add it to the session storge and update the alert// 
  let buyNow = document.createElement("button");
  prodPage.document.body.appendChild(buyNow);
   buyNow.innerHTML = "Buy Now";
   buyNow.classList.add("btn")
   buyNow.addEventListener("click", set_RunningTotal)
   buyNow.addEventListener("click", addToCart)})
  
//create the addToCart and set-RunningTotal functions used for the buttons//

function addToCart() {
  cart.push(item);
  sessionStorage.setItem('cart', JSON.stringify(cart));}
  
  function set_RunningTotal () { 
 
  let runningTotal = (sessionStorage.getItem("itemsAdded"));
  let newTotal = Number(runningTotal) + Number(item.pounds);
      sessionStorage.setItem("itemsAdded", newTotal);      
      sessionStorage.setItem("updateCart", sessionStorage.getItem("updateCart") + JSON.stringify(item))
      alert("Item Added!  Your total is £" + newTotal)
    }
}) //close the forEach loop function//close forEach loop
}//close the onLoad function

//create a table which will display the items that have been added to cart on the cart page//

function cartShow() {let cartList = document.getElementById("cartList"); //will run any time the page is loaded as per the HTML code//
    let table = document.createElement("table");
    let tableHeader = table.createTHead();
    let tableRow = tableHeader.insertRow(0);
    headItem = tableRow.insertCell(0);
    headItem.innerHTML = "Item Bought"
    headItem.style.padding = "1cm"
    headPrice = tableRow.insertCell(1);
    headPrice.innerHTML = "Price";
    headPrice.style.padding = "1cm";
    cartList.appendChild(table);
                   
    cart.forEach(cartItem => {
        
    cartRow = tableHeader.insertRow()
    cartName = cartRow.insertCell(0);
    cartPrice = cartRow.insertCell(1);
    cartName.innerHTML = cartItem.title;    
    cartPrice.innerHTML = cartItem.price;
    tableHeader.appendChild(cartRow);});
    }  //close the cartShow function//

    //CALCULATE THE TOTAL PLUS VAT AND SHIPPING//
  
  
  let checkOutTotal = document.getElementById("total");
  let totalafterVAT = document.getElementById("incVAT");
  let totalAmt = sessionStorage.getItem("itemsAdded");
  let amtforVAT = totalAmt*1.2;  
  let shipCost = document.getElementById("shippingCost");
  let toPay = document.getElementById("toPay");  
  let toPayamt = (amtforVAT) + (Number(sessionStorage.getItem("selectedShipping")));
  let submitButton = document.getElementById("submitButton");
               
  function calcCart() {
      checkOutTotal.innerHTML = currencyformatter.format(totalAmt);
      totalafterVAT.innerHTML = currencyformatter.format(amtforVAT);
      shipCost.innerHTML = sessionStorage.getItem("shippingText");
      toPay.innerHTML = currencyformatter.format(toPayamt);

      if (sessionStorage.getItem("shippingText")!= null)
      {submitButton.style.visibility = "visible"};

//DISCOUNT CODE FUNCTION/ 
let discButton = document.getElementById("discButton");
discButton.addEventListener("click", function() {
  let disCode = document.getElementById("disCode");
  let disCodesupplied = disCode.innerHTML
   
//if various discount codes were available I could use a switch function here//
if (disCodesupplied = "20%OFF")
{let discamt = amtforVAT*0.2;
  alert("20% Discount Applied!" + " " + "You Saved " + currencyformatter.format(discamt));
    let disctoPay = (toPayamt - discamt);
    toPay.innerHTML = currencyformatter.format(disctoPay);
}
})
}
 
// //SHIPPING COSTS - includes show and hide function and will allow the submit button to appear//
function shipOptions() {

  let shipDropdown = document.getElementById("shipDropdown");
  let selectedShipping = shipDropdown.options[shipDropdown.selectedIndex].value
  let shippingmoreInfo = document.getElementById("shippingmoreInfo");

  shipDropdown.addEventListener("change", function showSubmit(){
    let submitButton = document.getElementById("submitButton");
    submitButton.style.visibility = "visible";
  })
  
    switch (selectedShipping) {
    case "freeCollect":      
      sessionStorage.setItem("selectedShipping", 0);      
      sessionStorage.setItem("shippingText", "Free");
      shippingmoreInfo.innerHTML = "<h2>Where am I?</h2><p>I live in the beautiful Highlands of Scotland, and this is the view from my window!  f you want to collect in person, please <a href='mailto:elizabeth@r3b.org'>email</a> to arrange.<img id='clachan' src='images/ClachanBridge.jpg' alt='Clachan Bridge, Oban'></p><br>"
      break
    case "royalMail":
      sessionStorage.setItem("selectedShipping", 3);       
      sessionStorage.setItem("shippingText", "£3.00");
      shippingmoreInfo.innerHTML = "<p id='ShipDiscount' class='rounded'>Flat Fee up to 10kg, Royal Mail standard delivery.  Please contact me if you wish to look at other Royal Mail options</p><br>"
      $("#addressForm").css("visibility", "visible");
      break
    case "other":
      sessionStorage.setItem("selectedShipping", 0); 
      sessionStorage.setItem("shippingText", "To be arranged separately, please contact");
      shippingmoreInfo.innerHTML = "<h2>Please <a href='mailto:info@r3b.org'>email me</a> to discuss other options and to arrange payment separately"
      break
    default: console.log("Error"); submitButton.style.visibility = "hidden"
  }
  };//CLOSE SHIPPING OPTIONS FUNCTION//

  //GENERATE RANDOWM ORDER NUMBER//

  function generateOrderNumber() {
    let orderNumber = Math.floor(Math.random() * 1000000000);
    console.log(orderNumber);
    alert("Thank you for your order - your order number is " + orderNumber);
    let submitted = document.getElementById("shoppingCart");
    submitted.style.visibility = "hidden" 
    sessionStorage.clear()  
  }
  
  
//FUNCTION WITH CHAINED EVENTS//
$(document).ready(function () {

  
  const colours = ["beige", "bisque", "burlywood"];
  //create an array of colours and a function which displays each colour//

    $.each(colours, function (i, value) { //jQuery function//
    setInterval(function () {
      change(value);
    }, 600 * (i + 1));
  });
  //use the function in the chained jQuery function//
  function change(colour) {
   
    $("body")
      .css("background-color", colour) };
})
   
//ANIMATION//
 $("#thanksMessage").mouseenter(function () {$("#thanksMessage").css("font-weight", "bold").css("font-size", "60px")});
 $("#thanksMessage").mouseleave(function () {$("#thanksMessage").css("font-weight", "normal").css("font-size", "10px")});


 function test() {alert("hello")}