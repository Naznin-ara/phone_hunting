const loadPhone = async (searchText, show) => {
    let res = await fetch (`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    let phonedata = await res.json();
    let phones = phonedata.data;

    phoneDataLoad(phones,show);
   
}



const phoneDataLoad = (data, show) =>{

    const container = document.getElementById('phone-container');
    const showbtn = document.getElementById('showbtn');
    container.textContent = "";
    
    if(data.length>12 && !show){
        showbtn.classList.remove('hidden');

    }else{
        showbtn.classList.add('hidden');
    }
   
    if(!show){
        data = data.slice(0,12);
    }


   
    for(let items of data){
        const div = document.createElement('div');
        div.classList = `card w-80 bg-base-100 shadow-xl`;
        div.innerHTML = ` <figure class="px-10 pt-10">
        <img src="${items.image}" alt="Shoes" class="rounded-xl" />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${items.phone_name}</h2>
        <p>${items.slug}</p>
        <div class="card-actions">
          <button class="btn btn-primary" onclick="detailsHandler('${items.slug}')">Show Details</button>
        </div>
      </div>`;
      
      container.appendChild(div);
      showLoading(false);
        // console.log(items)
    }
}

const searchHandle = (show) =>{
    showLoading(true);
    const search = document.getElementById('search');
    const searchText = search.value;
   
    loadPhone(searchText,show);
    // search.value = "";
    
    // console.log(searchText)
}

const showLoading = (loading) =>{
    const spinner = document.getElementById('loadingSpinner');
    if(loading){
        spinner.classList.remove('hidden');
    }else{
        spinner.classList.add('hidden');
    }

}

const showAll = () =>{
    searchHandle(true);
}

const detailsHandler = async (id) =>{
      let res =await fetch (`https://openapi.programming-hero.com/api/phone/${id}`);
      let detail = await res.json();
      let idDetail= detail.data;
      console.log(idDetail);
     showmodal(idDetail);
    //   modal.classList.toggle('hidden')
 
}

const showmodal = (data) =>{
    let modal = document.getElementById('modal');
    modal.textContent = " ";
    modal.classList.remove('hidden');
    const modaldiv = document.createElement('div');
   
    modaldiv.classList = `flex flex-col gap-4 justify-center pt-6 items-center`;
    modaldiv.innerHTML = `<img class=""src="${data.image}"/>
    <div class="flex flex-col items-start ml-4">
    <p class="text-lg font-bold text-left">Name: <span class="text-base font-normal">${data.name}</span></p>
    <p class="text-lg font-bold">Storage: <span class="text-base font-normal">${data?.mainFeatures?.storage}</span></p>
    <p class="text-lg font-bold">Display size: <span class="text-base font-normal">${data.mainFeatures?.displaySize}</span></p>
    <button class="btn btn-warning mt-4 px-4" onclick="closemodal()">Close</button>
    </div>
   
    `
  
    modal.appendChild(modaldiv);
   
}

const closemodal = () =>{
    let modal = document.getElementById('modal');
    modal.classList.add('hidden');
    console.log("click")
}