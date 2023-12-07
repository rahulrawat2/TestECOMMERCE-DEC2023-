(function () {

        cartinfo={
                cartinfo:JSON.parse(localStorage.getItem('Addedtocart') || []),
                productCartContainer:document.getElementById("productCartContainer"),

                displayCartProducts:function(cartProducts){
                        this.productCartContainer.innerHTML = "";
                        cartProducts.forEach((addedProduct)=>{
                                let productCard = document.createElement("li")
                                let titleContainer = document.createElement("div")
                                let title = document.createElement("span")
                                let quantityContainer = document.createElement("div")
                                let quantity = document.createElement("span")
                                let containerCheckout = document.createElement("div")
                                let minusBtn = document.createElement("button")
                                let plusBtn = document.createElement("button")
                                let quantityCount = document.createElement("span")
                                let productImg = document.createElement("img")
                                let heading = document.createElement("h2")
                                


                                productCard.setAttribute("class","flex items-center justify-between mb-4")

                                titleContainer.setAttribute("class","flex items-center")
                                
                                title.setAttribute("class","font-semibold")
                           
                                quantityContainer.setAttribute("class","text-gray-500")

                                titleContainer.setAttribute("class","flex items-center space-x-2")
                                quantity.setAttribute("class","flex items-center space-x-2")
                                containerCheckout.setAttribute("class","flex items-center space-x-2")                       
                                minusBtn.setAttribute("class","text-gray-600 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500")
                                plusBtn.setAttribute("class","text-gray-600 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500")
                                quantityCount.setAttribute("class","font-semibold")
                                productImg.setAttribute("class","w-14 h-14 object-cover mb-4" )
                                

                                productCard.append(titleContainer,quantityContainer,productImg)
                                titleContainer.appendChild(title)
                                quantityContainer.append(quantity,containerCheckout)
                                containerCheckout.append(minusBtn,plusBtn,quantityCount)
                                this.productCartContainer.appendChild(productCard) 

                                title.innerText = addedProduct.title.slice(0,12)
                                minusBtn.innerText="-"
                                plusBtn.innerText="+"
                                productImg.setAttribute("src",`${addedProduct.images[0]}`)
                        
                                
                                
                                

                        })


                },
                bind:function(){
                        this.displayCartProducts(this.cartinfo)
         
                      
                },
        }
        cartinfo.bind()
      })();