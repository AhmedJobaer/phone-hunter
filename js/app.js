const loadPhone = (search) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data))
}

const displayPhones = phones => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.innerHTML = ``;
    //Display 20 phonea only
    phones = phones.slice(0, 20);
    //display no phone
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
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    })


}

document.getElementById('btn-search').addEventListener('click', function () {
    const searchField = document.getElementById('search-field');
    loadPhone(searchField.value);
    searchField.value = '';
})

