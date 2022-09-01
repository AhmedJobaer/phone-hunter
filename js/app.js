const loadPhone = async (search, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit)
}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.innerHTML = ``;
    //Display 10 phonea only
    const showBtn = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showBtn.classList.remove('d-none')
    }
    else {
        showBtn.classList.add('d-none')
    }
    //display no phone
    const noPhon = document.getElementById('no-found-mgs');
    if (phones.length === 0) {
        noPhon.classList.remove('d-none')
    }
    else {
        noPhon.classList.add('d-none')
    }

    //display all phone 
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural
                lead-in
                to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetail('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    })

    //stop loadder
    toggleSpinner(false)

}

const processSearch = (dataLimit) => {
    toggleSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, dataLimit);
    //searchField.value = '';
    // console.log('showall');
}


document.getElementById('btn-search').addEventListener('click', function () {
    // start loader
    processSearch(10);

})


/// search input field enter key handeller

document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
})

const toggleSpinner = isLoading => {
    const loaderSec = document.getElementById('loader');
    if (isLoading) {
        loaderSec.classList.remove('d-none');
    }
    else {
        loaderSec.classList.add('d-none');
    }
}


document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})



const loadPhoneDetail = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetail(data.data);
}

const displayPhoneDetail = phone => {
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetail = document.getElementById('phone-details');
    phoneDetail.innerHTML = `
        <p>Realase Date: ${phone.releaseDate ? phone.releaseDate : 'None'}</p>
        <p>Others: ${phone.others ? phone.others.Bluetooth : 'None'}</p>
    `;
}
