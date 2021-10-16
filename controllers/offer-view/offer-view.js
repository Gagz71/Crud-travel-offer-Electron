const {ipcRenderer} = require('electron');

let editedOffer;

//create the cards with offer's data
function generateViewOffer(data){

        const offerContainer = document.querySelector('#offer-container');
        const divCarousel = document.querySelector('.carousel-inner');

        const mainPictureUrl = data.pictureUrl;

        data.carouselPicturesUrl.forEach(elt => {

                const divCarouselItem = document.createElement('div');
                const picturesUrl = document.createElement('img');

                //if current picture is the first picture of the carousel -> add the active class
                divCarouselItem.classList.add('carousel-item', elt === data.carouselPicturesUrl[0] ? 'active' : 'carousel-item');
                //if user add just one url picture to the carousel (in the form)
                if(picturesUrl.length ===1){
                        //add theses sources for the carousel view
                        picturesUrl[0].setAttribute('src', mainPictureUrl);
                        picturesUrl[1].setAttribute('src', elt);
                        picturesUrl[2].setAttribute('src', mainPictureUrl);
                }
                //if user add just two url pictures to the carousel
                if(picturesUrl.length === 2){
                        //add theses sources for the carousel view
                        picturesUrl[0].setAttribute('src', elt);
                        picturesUrl[1].setAttribute('src', mainPictureUrl);
                        picturesUrl[2].setAttribute('src',elt );
                }else{
                        //add as source of image the links url from the user
                        picturesUrl.setAttribute('src', elt);
                }
                picturesUrl.classList.add('d-block', 'w-100');
                divCarouselItem.append(picturesUrl);
                divCarousel.append(divCarouselItem);
        });

        const title = document.createElement('h1');
        title.classList.add('display-4');
        title.innerText = '✈️ '+ data.title + '  🌎';

        const shortDescription = document.createElement('p');
        shortDescription.classList.add('lead');
        shortDescription.innerText = data.shortDescription;

        const destination = document.createElement('small');
        destination.innerText = '⚓ '+data.destination;

        const price = document.createElement('h5');
        price.innerText = data.price + ' €';

        const hr = document.createElement('hr');
        hr.classList.add('my-4');

        const longDescription = document.createElement('p');
        longDescription.classList.add('lead');
        longDescription.innerText = data.longDescription;

        const bonusul = document.createElement('ul');
        bonusul.classList.add('list-group', 'list-group-flush');
        const bonusLabel = document.createElement('h5');
        bonusLabel.classList.add('card-subtitle', 'mb-2', 'mt-1');
        bonusLabel.innerText = 'Services inclus';
        bonusul.append(bonusLabel);

        data.bonus.forEach(elt=>{
                const bonus = document.createElement('li');
                bonus.classList.add('list-group-item');
                bonus.innerText = elt;
                console.log(elt.name);
                bonusul.append(bonus);
        });

        const divBtn = document.createElement('div');
        divBtn.classList.add('d-flex', 'justify-content-between');

        //create the edit item button
        const editOfferBtn = document.createElement('button');
        editOfferBtn.innerText= 'Modifier 📝';
        editOfferBtn.classList.add('btn', 'btn-outline-warning');
        //when user click on it
        editOfferBtn.addEventListener('click', ()=> {
                //send user to edit view with the current offer
                ipcRenderer.send('open-edit-offer-window', {
                        id: data.id
                });
                if(editedOffer){
                        //remove the listener
                        ipcRenderer.removeListener('edited-offer', editedOffer );
                        //reinitialize data
                        editedOffer = null;
                }

                editedOffer = (e, data)=> {
                        title.innerText = data.item.title;
                        destination.innerText = data.item.destination;
                        shortDescription.innerText = data.item.shortDescription;
                        longDescription.innerText = data.item.longDescription;
                        price.innerText = data.item.price;
                        data.bonus.forEach(elt => {
                                elt.innerText = data.item.bonus;
                        });
                        mainPictureUrl.innerText = data.item.pictureUrl;
                        data.carouselPicturesUrl.forEach(elt => {
                                elt.innerText = data.item.carouselPicturesUrl
                        });
                };
                ipcRenderer.on('edited-offer', editedOffer);
        });

        //create the delete item btn
        const deleteOfferBtn = document.createElement('button');
        //deleteOfferBtn.innerText= 'Supprimer';
        deleteOfferBtn.classList.add('btn', 'btn-outline-danger');
        deleteOfferBtn.innerText = 'Supprimer 🗑️';
        deleteOfferBtn.addEventListener('click', ()=> {
                //send to confirmation request on click
                ipcRenderer.send('show-confirm-delete-offer', data);
        });

        //insert the element

        divBtn.append(editOfferBtn, deleteOfferBtn);
        offerContainer.append(title, shortDescription, destination,price,  hr,longDescription, bonusul, divBtn);


}


//Listening to chanel init-data
ipcRenderer.on('init-data', (e, data) => {
        generateViewOffer(data);
});

ipcRenderer.on('toogle-edition-mode', ()=> {
        ipcRenderer.on('edit-offer', (e, data)=>{
                editedOffer.value = data.item;
        })
})



