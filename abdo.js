let title = document.getElementById('title');
let price = document.getElementById('price');
let abdo = document.getElementById('abdo');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let Total = document.getElementById('Total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'اضافة';
let tmp ;


//get total
function getTotal()
{


    
    if(price.value != ''&&abdo.value !='')
    {
        let result = (+price.value  * +abdo.value +  +ads.value )- +discount.value  ;
        Total.innerHTML = result;
        Total.style.background = '#149e0a';

    }
    else 
    {
        Total.innerHTML  = '';
        Total.style.background = '#a00d02';

    }
}











//create product
let datapro;
if(localStorage.product !=null){

datapro = JSON.parse(localStorage.product)
}
else{
    datapro = [];
}

submit.onclick = function(){
    let newpro = {
        title:title.value.toLowerCase(),
        price:price.value,
        abdo:abdo.value,
        ads:ads.value,
        discount:discount.value,
        Total:Total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
if(title.value !=''&& price.value !='' &&category.value !='' && newpro.count <= 100)
{



  if(mood ==='اضافة')
  {

  
    if(newpro.count>1){
        for(let i=0;i<newpro.count;i++)
        {
            datapro.push(newpro)
        }
    }
    else{
        datapro.push(newpro)
    }
    
  }

  else{
    datapro[  tmp     ] =newpro
    mood= 'اضافة';
    submit.innerHTML='اضافة';
    count.style.display ='block';
    
  }
  clearData()
}

    //save localstorge
    localStorage.setItem('product',     JSON.stringify(datapro))
   
    showData()
}













//clear inputs
function clearData(){
    title.value = '';
    price.value = '';
    abdo.value = '';
    ads.value = '';
    discount.value = '';
    Total.innerHTML = '';
    count.value = '';
    category.value = '';

}







//read

function showData()
{
    getTotal()
  let table = '';
  for(let i=0;i< datapro.length;i++){
    table +=`
    <tr>
    <td>${i+1}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].abdo}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].Total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick="updateData(${i})" id="update">update</button></td>
    <td><button onclick="deletData( ${i}  )" id="delete">delete</button></td>
    </tr>` ;
   
  }
  document.getElementById('tbody').innerHTML = table ;
  let btnDelete = document.getElementById('deleteAll');
  if(datapro.length>0)
  {
  btnDelete.innerHTML = `
  <button class="delet" onclick="deleteAll()">حذف الكل!(${datapro.length} )</button>
  `
  }
  else{
    btnDelete.innerHTML = '';
  }
}
showData()







//delet

function deletData(i)
{
datapro.splice(i,1);
localStorage.product = JSON.stringify(datapro);
showData()
}











//delet all
// function deleteAll()
// {
//     localStorage.clear()
//     datapro.splice(0)
//     showData()
// }


















//update

function updateData(i)
{
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    abdo.value = datapro[i].abdo;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    category.value = datapro[i].category;
    getTotal()
    count.style.display = 'none' ;
    category.value = datapro[i].category ;
    submit.innerHTML = 'تحديث';
    mood = 'تحديث';
    tmp=i ;
    scroll(
        {
            top:0,
            behavior:'smooth',
        }
    )
}









//search









let searchMood = 'title';
function getSearchMood(id)
{
    let search = document.getElementById('search');

   if(id == 'searchTitle')
   {
    searchMood = 'title';
    search.placeholder = 'بحث بأسم المنتج';
   }
   else{
    searchMood = 'category';
    search.placeholder = 'بحث بمواصفات المنتج';
   }
   search.focus()
   search.value='';
   showData()
}
function sarchData(value)
{
    let table = '';
    if(searchMood == 'title')
    {

      for(let i=0;i<datapro.length;i++){
      if(datapro[i].title.toLowerCase().includes(value.toLowerCase()))
      {
        table +=`
        <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].abdo}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].Total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deletData( ${i}  )" id="delete">delete</button></td>
        </tr>` ;
      }
    }

    }
    else
    {
        for(let i=0;i<datapro.length;i++){
            if(datapro[i].category.includes(value.toLowerCase()))
            {
              table +=`
              <tr>
              <td>${i}</td>
              <td>${datapro[i].title}</td>
              <td>${datapro[i].price}</td>
              <td>${datapro[i].abdo}</td>
              <td>${datapro[i].ads}</td>
              <td>${datapro[i].discount}</td>
              <td>${datapro[i].Total}</td>
              <td>${datapro[i].category}</td>
              <td><button onclick="updateData(${i})" id="update">update</button></td>
              <td><button onclick="deletData( ${i}  )" id="delete">delete</button></td>
              </tr>` ;
            }
          }
    }
    document.getElementById('tbody').innerHTML = table ;
}

