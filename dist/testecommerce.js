(function () {

        

        productInfo={
               
                productInfo:JSON.parse(localStorage.getItem('products') || [] ),
                errorMessage:document.getElementById("js-fetchErrorStatus"),
                listingContainer:document.getElementById("js-listingContainer"),
                selectCategory:document.getElementById("category"),
                cartIcon:document.getElementById("cartIcon"),
                searchproduct: async function (input) {
                        if (input === "") {
                          console.log(input);
                          this.displaylist(this.Productlist);
                        } else {
                          let response = await fetch(
                            `https://dummyjson.com/products/search?q=${input}`
                          );
                  
                          if (response.ok) {
                            let apiJsonData = await response.json();
                            console.log(apiJsonData);
                            this.displayProducts(apiJsonData.products);
                          }
                        }
                      },
                      debounce: function (callBack, delay) {
                        console.log(delay);
                        let debounce = null;
                        return (...args) => {
                          clearTimeout(debounce);
                          debounce = setTimeout(() => {
                            callBack.apply(this, args);
                          }, delay);
                        };
                      },

                categories:async function(){
                        try{
                                const response = await fetch('https://dummyjson.com/products/categories')
                                if (response.ok){
                                        let categoriesOptions = await response.json()
                                      
                                        categoriesOptions.forEach(catergory => {
                                                let options = document.createElement('option')
                                                options.innerText = catergory
                                                this.selectCategory.appendChild(options)
                                                
                                        });
                                }

                        else { 
                                throw new Error(`something Went Wrong : ${response.status} `)
                                }}

                        catch(error){
                                this.errorMessage.innerText = error.message;
                        } 
                        
                },

                fetchAndStoreInfo:async function(){
                        try{
                                const response = await fetch("https://dummyjson.com/products") 
                                if(response.ok){
                                        const fetchProductsData = await response.json()
                                  
                                        productsData = console.log(fetchProductsData.products)
                            
                                        // localStorage.setItem("products", JSON.stringify(productsData))
                                        this.displayProducts(this.productInfo)

                                }
                                else{
                                        throw new Error(`Something Went Wrong : ${response.status}`)
                                }
                                
                        
                        }
                        catch(error){
                               this.errorMessage.innerText = error.message;

                        }
                },
                // Function to Display the Api Data 
                displayProducts:function(items){
                      

                        this.listingContainer.innerHTML = "";
          

                        items.forEach((productData)=>{
                                //creating elements and setting attributes
                                let productCard = document.createElement("li")
                                productCard.setAttribute("class","bg-white p-4 rounded-md shadow-md")
                                let productImage = document.createElement("img")
                                productImage.setAttribute("class","w-full h-48 object-cover mb-4")
                                productImage.setAttribute("src",`${productData.images[0]}`)
                                let productId = document.createElement("span")
                                productId.setAttribute("class","text-sm font-bold")

                                let title = document.createElement("h2")
                                title.setAttribute("class","text-lg font-semibold mb-2")
                                let description = document.createElement("p")
                                description.setAttribute("class","text-gray-600 mb-4")
                                //add button Container
                                let addButtondDiv = document.createElement("div")
                                addButtondDiv.setAttribute("class","flex items-center justify-between")
                                let Productprice = document.createElement("span")
                                Productprice.setAttribute("class","text-xl font-bold text-gray-700")
                                let addCartBtn = document.createElement("button")
                                addCartBtn.setAttribute("class","bg-blue-500 text-white py-2 px-4 rounded-md addcart")



                        
                                // addCartBtn.setAttribute("class", "")


                                //values for the elements
                                title.innerText = ` ${productData.title.slice(0,15)}`
                                description.innerText=` ${productData.description.slice(0,60)} ...`
                                Productprice.innerText = ` $ ${productData.price}`
                                addCartBtn.innerText ="Buy Now"
                                // productId.innerText= `Prod.Id:${productData.id}`
                                
                

                                //append
                                addButtondDiv.append(Productprice,addCartBtn,productId)
                                productCard.append(productImage,title,description,addButtondDiv)
                                this.listingContainer.appendChild(productCard)
                                productCard.addEventListener("click",(e)=>{
                                        let clickedPosition = e.target
                                        
                                        if(clickedPosition.classList.contains("addcart")){
                                                clickedPosition = productData.id
                                                console.log(clickedPosition)
                                                this.addtocart(clickedPosition)
                                        
                                        }
             
                                     })

                        })

                },

                filterProducts: async function(selectedFilterProduct){
                        
                        if(selectedFilterProduct === "all"){
                                this.displayProducts(this.productInfo)
                        
                        }
                        else{
                                try{
                                        let response = await fetch(`https://dummyjson.com/products/category/${selectedFilterProduct}`);
                                        if(response.ok){
                                              
                                        let selectedCategory = await response.json()
                                       
                                        this.displayProducts (selectedCategory.products)
        
                                  
                                      
                                        }
                                        else { 
                                        throw new Error(`something Went Wrong : ${response.status} `)
                                        }}

                                catch(error){
                                        this.errorMessage.innerText = error.message;
                                }    
                }},
                addtocart: async function (ProdId) {
                        let selectedProd =this.productInfo.find(product => product.id === ProdId);
                        console.log(selectedProd)
                        //  array in localStorage
                        this.cartinfo = JSON.parse(localStorage.getItem("addedtocart")) || [];
                    
                
                        const existingProductIndex = this.cartinfo.findIndex(item => item.id === selectedProd.id);
                    
                        if (existingProductIndex === -1) {
                            // If not present, push it to the cartinfo 
                           selectedProd.count=1;
                    
                            this.cartinfo.push(selectedProd);
                    
                            // Save the  localStorage
                            localStorage.setItem("addedtocart", JSON.stringify(this.cartinfo));

                        } else {
                            // , increment the count if already in cart
                            this.cartinfo[existingProductIndex].count++;

                    
                            // Save the updated cart array into localStorage
                            localStorage.setItem("addedtocart", JSON.stringify(this.cartinfo));

                        }
                    },

                    
                bind:function(){
                        this.fetchAndStoreInfo()
                        this.categories()
                        this.selectCategory.addEventListener('change' ,(e)=>{
                               let selectedCategories = e.target.value;
                               this.filterProducts(selectedCategories)
                        })
                        this.cartIcon.addEventListener("click",(e)=>{
                                e.parentElement.target = window.location.href = `cartpage.html`
                               
                        })
                        let debouncedData = this.debounce(this.searchproduct, 1000);
                        let search = document.getElementById("searchInput");
                        search.addEventListener("input", (ev) => {
                          let value = ev.target.value.trim();
                          console.log(value);
                          debouncedData(value)});
                },
                

        },
        productInfo.bind()

})();