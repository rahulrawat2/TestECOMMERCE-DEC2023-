(function () {
        cartinfo = {
                cartinfo: JSON.parse(localStorage.getItem("addedtocart") || []),

                productCartContainer: document.getElementById("productCartContainer"),

                firstNameInput : document.getElementById('js-firstName'),
                lastNameInput : document.getElementById('js-lastName'),
                cityInput : document.getElementById('js-city'),
                stateInput : document.getElementById('js-state'),
                zipInput : document.getElementById('js-zip'),
                phoneInput : document.getElementById('js-phone'),
                totalAmount:document.getElementById("totalAmount"),

                firstNameRegex : /^[a-zA-Z]{2,}$/,
                lastNameRegex : /^[a-zA-Z]{2,}$/,
                cityRegex : /^[a-zA-Z\s]+$/,
                stateRegex : /^[a-zA-Z\s]+$/,
                zipRegex : /^\d{5}$/,
                phoneRegex : /^\d{10}$/,
           
                



                validateForm: function () {if (!this.firstNameRegex.test(firstNameInput.value)) {
                        document.getElementById('js-firstNameError').innerText = 'Invalid First Name';
                        return false;
                    } else {
                        document.getElementById('js-firstNameError').innerText = '';
                    }
                
                    // Validate Last Name
                    if (!this.lastNameRegex.test(this.lastNameInput.value)) {
                        document.getElementById('js-lastNameError').innerText = 'Invalid Last Name';
                        return false;
                    } else {
                        document.getElementById('js-lastNameError').innerText = '';
                    }
                
                    // Validate City
                    if (!cityRegex.test(this.cityInput.value)) {
                        document.getElementById('js-cityError').innerText = 'Invalid City';
                        return false;
                    } else {
                        document.getElementById('js-cityError').innerText = '';
                    }
                
                    // Validate State
                    if (!this.stateRegex.test(this.stateInput.value)) {
                        document.getElementById('js-stateError').innerText = 'Invalid State';
                        return false;
                    } else {
                        document.getElementById('js-stateError').innerText = '';
                    }
                
                    // Validate ZIP Code
                    if (!this.zipRegex.test(this.zipInput.value)) {
                        document.getElementById('js-zipError').innerText = 'Invalid ZIP Code';
                        return false;
                    } else {
                        document.getElementById('js-zipError').innerText = '';
                    }
                
                    // Validate Phone Number
                    if (!this.phoneRegex.test(this.phoneInput.value)) {
                        document.getElementById('js-phoneError').innerText = 'Invalid Phone Number';
                        return false;
                    } else {
                        document.getElementById('js-phoneError').innerText = '';
                    }
                
                   
                    return true;
                },
                calculateTotal: function () {
                        let total = 0;
                        this.cartinfo.forEach((addedProduct) => {
                            total += addedProduct.count * addedProduct.price;
                        });
                        return total.toFixed(2);
                    },

                displayCartProducts: function (cartProducts) {
                        let totalQuantity = 0;
                        this.productCartContainer.innerHTML = "";
                     
                        cartProducts.forEach((addedProduct) => {
                   
                
                                //Creating elment
                                let productCard = document.createElement("li");
                                let productCardContainer = document.createElement("li");
                                let titleContainer = document.createElement("div");
                                let title = document.createElement("span");
                                let quantityContainer = document.createElement("div");
                                let quantity = document.createElement("span");
                                let containerCheckout = document.createElement("div");
                                let minusBtn = document.createElement("button");
                                let plusBtn = document.createElement("button");
                                let quantityCount = document.createElement("span");
                                let productPrice = document.createElement("span");
                                let totalAmount = document.createElement("p");
                                
               

                                //setting Attributes

                                productCard.setAttribute(  "class",  "flex items-center justify-between mb-4" );
                                titleContainer.setAttribute("class", "flex items-center");
                                title.setAttribute("class", "font-semibold");
                                quantityContainer.setAttribute("class", "text-gray-500");
                                titleContainer.setAttribute("class", "flex items-center space-x-2");
                                quantity.setAttribute("class", "flex items-center space-x-2");
                                containerCheckout.setAttribute("class", "flex items-center space-x-2");
                                minusBtn.setAttribute( "class", "text-gray-600 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500" );
                                plusBtn.setAttribute("class", "text-gray-600 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500");
                                quantityCount.setAttribute("class", "font-semibold");
                                productPrice.setAttribute("class", "text-sm");



                                productCard.append(titleContainer, quantityContainer, productPrice);
                                titleContainer.appendChild(title);
                                quantityContainer.append(quantity, containerCheckout);
                                containerCheckout.append(minusBtn, plusBtn, quantityCount,);
                                this.productCartContainer.appendChild(productCard)

                                

                                totalQuantity.innerHTML += addedProduct.count ,   
                                title.innerText = addedProduct.title.slice(0, 8);
                                minusBtn.innerText = "-";
                                plusBtn.innerText = "+";
                                productPrice.innerText = `$ ${addedProduct.price}`
                                quantityCount.innerText = addedProduct.count;

                                totalAmount.innerText = `Total Amount :$ ${this.calculateTotal()}`;
                         
                                plusBtn.addEventListener("click", () => {
                                        // Increase the quantity when the plus button is clicked
                                        addedProduct.count++;

                                        // Update the localStorage with the modified cartinfo
                                        localStorage.setItem("addedtocart", JSON.stringify(cartProducts));

                                        // Refresh the displayed cart products
                                        this.displayCartProducts(cartProducts);
                                });

                                minusBtn.addEventListener("click", () => {
                                        // Decrease the quantity when the minus button is clicked
                                        if (addedProduct.count > 1) {
                                                addedProduct.count--;

                                                // Update the localStorage with the modified cartinfo
                                                localStorage.setItem("addedtocart", JSON.stringify(cartProducts));

                                                // Refresh the displayed cart products
                                                this.displayCartProducts(cartProducts);
                                        }
                                });
                        });
                },
                bind: function () {
                        this.displayCartProducts(this.cartinfo)

                        document.getElementById('js-user-details').addEventListener('submit', function (event) {
                            
                                if (!validateForm()) {
                                    event.preventDefault();
                                }})
                },
        };

        cartinfo.bind();
})();
