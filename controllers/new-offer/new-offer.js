const {ipcRenderer} = require('electron');

const newItemForm = document.querySelector('#new-item-form');

//BTN
const newOfferSubmitBtn = newItemForm.querySelector('#new-offer-submit');
const newBonusBtn = newItemForm.querySelector("#item-bonus-btn");
const newCarouselBtn = document.querySelector("#item-carousel-btn");
newCarouselBtn.hidden=false;

//FIELDS INPUT
const newOfferTitleInput = newItemForm.querySelector('#item-title');
const newOfferDestinationInput = newItemForm.querySelector('#item-destination');
const newOfferShortDescriptionInput = newItemForm.querySelector('#item-short-description');
const newOfferLongDescriptionInput = newItemForm.querySelector('#item-long-description');
const newOfferBonusInput = newItemForm.querySelector('#item-bonus');
const newOfferPriceInput = newItemForm.querySelector('#item-price');
const newOfferPictureUrl = newItemForm.querySelector('#item-pictureUrl');
const newItemCarouselPictureUrllInput= newItemForm.querySelector('#item-carouselPicturesUrl');
let newBonus = [];
let newPicturesCarousel = [];

//////////CHECK INPUTS PARTS///////////
function onInputCheckValue(){

        /*newOfferSubmitBtn.hidden = !(newOfferTitleInput.value !== '' && !isNaN(newOfferTitleInput.value) && newOfferDestinationInput.value !== '' && !isNaN(newOfferDestinationInput.value) && newOfferShortDescriptionInput.value !== '' && !isNaN(newOfferShortDescriptionInput.value) &&
                newOfferBonusInput.value !== '' && !isNaN(newOfferBonusInput.value) && newOfferPriceInput.value > 0 &&
                newOfferPictureUrl.value !== '' && !isNaN(newOfferPictureUrl.value));*/
}
/*newOfferTitleInput.addEventListener('input', onInputCheckValue);
newOfferDestinationInput.addEventListener('input', onInputCheckValue);
newOfferShortDescriptionInput.addEventListener('input', onInputCheckValue);
newOfferBonusInput.addEventListener('input', onInputCheckValue);
newOfferPriceInput.addEventListener('input', onInputCheckValue);
newOfferPictureUrl.addEventListener('input', onInputCheckValue);*/



////////////////////////////////////////////////////////////SUBMIT FORM PART////////////////////////////////////////////////////////////

function onSubmitItemBonus(){
        const newBonusInput = newOfferBonusInput.value;
        newBonus.push(newBonusInput);
        console.log(newBonus);
}


function onSubmitItemCarousel(){

        const newCarouselInput = newItemCarouselPictureUrllInput.value;
        newPicturesCarousel.push(newCarouselInput);
        console.log(newPicturesCarousel);
}


function onSubmitItemForm(e){

        //stop the default behaviour (reloading page)
        e.preventDefault();


                const  newOffer = {
                pictureUrl: newOfferPictureUrl.value,
                carouselPicturesUrl: newPicturesCarousel,
                title: newOfferTitleInput.value,
                destination: newOfferDestinationInput.value,
                shortDescription: newOfferShortDescriptionInput.value,
                longDescription: newOfferLongDescriptionInput.value,
                bonus: newBonus,
                price: newOfferPriceInput.value
        };
        console.log(newOffer);
        ipcRenderer.invoke('new-offer', newOffer)
                .then(response=>{
                        const msgDiv = document.querySelector('#response-message');
                        msgDiv.innerText = response;
                        msgDiv.hidden = false;
                        setTimeout(() => {
                                msgDiv.innerText = '';
                                msgDiv.hidden = true;
                        }, 1500);

                        //Reset forms fields
                        e.target.reset();
                        //newOfferSubmitBtn.hidden = true;
                });
}

newBonusBtn.addEventListener('click', onSubmitItemBonus);
newCarouselBtn.addEventListener('click', (      )=> {
        if (newPicturesCarousel.length < 3){
                onSubmitItemCarousel();
        } else{
                newCarouselBtn.setAttribute('hidden', '');
        }
});
newItemForm.addEventListener('submit', onSubmitItemForm);


