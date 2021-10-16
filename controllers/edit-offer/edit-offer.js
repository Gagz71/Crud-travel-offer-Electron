const {ipcRenderer} = require('electron');


let isEditionModeActivated = false;

const editItemForm = document.querySelector('#edit-item-form');

//BTN
const editOfferSubmitBtn = editItemForm.querySelector('#edit-offer-submit');
const editBonusBtn = editItemForm.querySelector("#item-bonus-btn");
const editCarouselBtn = document.querySelector("#item-carousel-btn");

//FIELDS INPUT
const editOfferTitleInput = editItemForm.querySelector('#item-title');
const editOfferDestinationInput = editItemForm.querySelector('#item-destination');
const editOfferShortDescriptionInput = editItemForm.querySelector('#item-short-description');
const editOfferLongDescriptionInput = editItemForm.querySelector('#item-long-description');
const editOfferBonusInput = editItemForm.querySelector('#item-bonus');
const editOfferPriceInput = editItemForm.querySelector('#item-price');
const editOfferPictureUrl = editItemForm.querySelector('#item-pictureUrl');
const editItemCarouselPictureUrllInput= editItemForm.querySelector('#item-carouselPicturesUrl');
let editBonus = [];
let editPicturesCarousel = [];

////////////////////////////////////////////////////////////INIT DATA PART////////////////////////////////////////////////////////////
ipcRenderer.on('init-data', (e, data) => {
        editOfferTitleInput.value = data.item.title;
        editOfferDestinationInput.value = data.item.destination;
        editOfferShortDescriptionInput.value = data.item.shortDescription;
        editOfferLongDescriptionInput.value = data.item.longDescription;
        editBonus = data.item.bonus;
        editOfferPriceInput.value = data.item.price;
        editOfferPictureUrl.value = data.item.pictureUrl;
        editPicturesCarousel = data.item.carouselPicturesUrl;
});
ipcRenderer.send('edit-offer', (e, data) => {
        editItemForm.data;
});

////////////////////////////////////////////////////////////SUBMIT FORM PART////////////////////////////////////////////////////////////

function onSubmitItemBonus(e){
        const editBonusInput = editOfferBonusInput.value;
        editBonus.push(editBonusInput);
        console.log(editBonus);
}


function onSubmitItemCarousel(){

        const editCarouselInput = editItemCarouselPictureUrllInput.value;
        editPicturesCarousel.push(editCarouselInput);
        console.log(editPicturesCarousel);
}


function onSubmitItemForm(e){

        //stop the default behaviour (reloading page)
        e.preventDefault();

        const  editOffer = {
                pictureUrl: editOfferPictureUrl.value,
                carouselPicturesUrl: editPicturesCarousel,
                title: editOfferTitleInput.value,
                destination: editOfferDestinationInput.value,
                shortDescription: editOfferShortDescriptionInput.value,
                longDescription: editOfferLongDescriptionInput.value,
                bonus: editBonus,
                price: editOfferPriceInput.value
        };
        console.log(editOffer);
        ipcRenderer.invoke('edit-offer', editOffer)
                .then(response =>{
                        const msgDiv = document.querySelector('#response-message');
                        msgDiv.innerText = response;
                        msgDiv.hidden = false;
                        setTimeout(() => {
                                msgDiv.innerText = '';
                                msgDiv.hidden = true;
                        }, 1500);

                        //Reset forms fields
                        e.target.reset();
                        //editOfferSubmitBtn.hidden = true;
                });
}

editBonusBtn.addEventListener('click', onSubmitItemBonus);
editCarouselBtn.addEventListener('click', ()=> {
        if (editPicturesCarousel.length >=0 && editPicturesCarousel.length < 3){
                onSubmitItemCarousel();
        }
});
editItemForm.addEventListener('submit', onSubmitItemForm);



