let form = document.getElementById('form')
let name = document.getElementById('name')
let CATAGORY = document.getElementById('CATAGORY')
let PRICE = document.getElementById('PRICE')
let SALE = document.getElementById('SALE')
let AMOUNT = document.getElementById('AMOUNT')
let btn = document.getElementById('btn')
let container = document.getElementById('container')
let all = document.getElementById('all')
let search = document.getElementById('search')
let searchbtn = document.getElementById('searchbtn')
let searchnam = document.getElementById('searchnam')
let searncat = document.getElementById('searncat')
let searnprice = document.getElementById('searnprice')
let label = document.getElementById('label')
let index 
let mode = 'add'
let data 
if(localStorage.getItem('pro') == null){
    data = []
}else{
    data = JSON.parse(localStorage.getItem('pro'))
}
displayprod()
form.onsubmit = function (e){
    e.preventDefault()


    let pro = {
        name : name.value ,
        CATAGORY : CATAGORY.value , 
        SALE : SALE.value , 
        PRICE : PRICE.value ,
        AMOUNT : AMOUNT.value ,


    }


if (name.value != '' && CATAGORY.value != '' && PRICE.value != '' && SALE.value != '' && AMOUNT.value < 50){

    if (mode === 'add' && AMOUNT.value != ''){
    
        if(AMOUNT.value > 1){
             for(let i = 0 ; i < AMOUNT.value ; i++){
                 data.push(pro)
                 
              }
          }else{
    
              data.push(pro)
          }
    }else{
    
        data[index] = pro
        
    label.style.display = 'block'
    AMOUNT.style.display = 'block'
    
    btn.innerText = 'Update'
    btn.style.backgroundColor = 'rgb(0, 216, 0)'
    
    mode = 'add'
    }
    localStorage.setItem('pro', JSON.stringify(data) )
    
    
    
    
    
    displayprod()
    clear()
}

}



function displayprod (){
    let prod = ''
    let id = 0

 for(let i = 0 ; i< data.length ; i++ ){

    prod += `
        <tr>
                <td>${++id}</td>
                <td>${data[i].name}</td>
                <td>${data[i].CATAGORY}</td>
                <td>$${data[i].PRICE}</td>
                <td>$${data[i].SALE}</td>
                <td>$${data[i].PRICE - data[i].SALE}</td>
                <td> <button id='delete' onclick='deleteprod(${i})'>delete</button></td>
                <td> <button id='update' onclick='update(${i})'>update</button></td>
            </tr>
    `
 }
 container.innerHTML = prod

 deleteallpro()
}




function deleteprod(number){
     data.splice(number , 1)
     localStorage.setItem('pro' , JSON.stringify(data))
     displayprod()
}


function deleteallpro(){

    if(data.length > 1){
        all.style.display = 'block'
    }else{
        
        all.style.display = 'none'
    }

    all.onclick = function(){
     data.splice(0)
     localStorage.setItem('pro' , JSON.stringify(data))
     displayprod()
    }

}


deleteallpro()

function clear(){
    name.value = ''
    CATAGORY.value = ''
    PRICE.value = ''
    SALE.value = ''
    AMOUNT.value = ''
}



search.onfocus = function (){
    searchbtn.style.display = 'flex'

   searchnam.onclick = function (){
      search.placeholder = 'Search With Name....'
       search.disabled = false
   }
   searncat.onclick = function (){
      search.placeholder = 'Search With Category....'
       search.disabled = false
   }
   searnprice.onclick = function (){
      search.placeholder = 'Search With Price....'
       search.disabled = false
   }

   if( search.placeholder == 'Search With Name....' || search.placeholder == 'Search With Category....' || search.placeholder == 'Search With Price....' ){
       
       search.disabled = false
}else{
       search.disabled = true
   }

   if(search.placeholder == 'Search With Name....'){
    search.onkeyup = function(){
        let id = 0
        let prod = ''
        for(let i = 0 ; i < data.length ; i++){
            if( data[i].name.trim().toLowerCase().includes(search.value.trim().toLowerCase()) ){
                prod += `
                <tr>
                        <td>${++id}</td>
                        <td>${data[i].name}</td>
                        <td>${data[i].CATAGORY}</td>
                        <td>$${data[i].PRICE}</td>
                        <td>$${data[i].SALE}</td>
                        <td>$${data[i].PRICE - data[i].SALE}</td>
                        <td> <button id='delete' onclick='deleteprod(${i})'>delete</button></td>
                        <td> <button id='update'>update</button></td>
                    </tr>
            `
                 
            }
        }
        container.innerHTML = prod
    }
   }else if(search.placeholder == 'Search With Category....'){
    search.onkeyup = function(){
        let id = 0
        let prod = ''
        for(let i = 0 ; i < data.length ; i++){
            if( data[i].CATAGORY.trim().toLowerCase().includes(search.value.trim().toLowerCase()) ){
                prod += `
                <tr>
                        <td>${++id}</td>
                        <td>${data[i].name}</td>
                        <td>${data[i].CATAGORY}</td>
                        <td>$${data[i].PRICE}</td>
                        <td>$${data[i].SALE}</td>
                        <td>$${data[i].PRICE - data[i].SALE}</td>
                        <td> <button id='delete' onclick='deleteprod(${i})'>delete</button></td>
                        <td> <button id='update'>update</button></td>
                    </tr>
            `
                 
            }
        }
        container.innerHTML = prod
    }
   }else if(search.placeholder == 'Search With Price....'){
    search.onkeyup = function(){
        let id = 0
        let prod = ''
        for(let i = 0 ; i < data.length ; i++){
            if( data[i].PRICE.trim().toLowerCase().includes(search.value.trim().toLowerCase()) ){
                prod += `
                <tr>
                        <td>${++id}</td>
                        <td>${data[i].name}</td>
                        <td>${data[i].CATAGORY}</td>
                        <td>$${data[i].PRICE}</td>
                        <td>$${data[i].SALE}</td>
                        <td>$${data[i].PRICE - data[i].SALE}</td>
                        <td> <button id='delete' onclick='deleteprod(${i})'>delete</button></td>
                        <td> <button id='update'>update</button></td>
                    </tr>
            `
                 
            }
        }
        container.innerHTML = prod
    }
   }
}








function update(number){
 name.value = data[number].name
 CATAGORY.value = data[number].CATAGORY
 PRICE.value = data[number].PRICE
 SALE.value = data[number].SALE

label.style.display = 'none'
AMOUNT.style.display = 'none'

btn.innerText = 'Update'
btn.style.backgroundColor = 'orange'

mode = 'update'
index = number
}