const {ipcRenderer} = require('electron');

const divCardDeck = document.querySelector('#div-card');

//Create and insert  html cards offers
function generateOffersCards(data){

        data.forEach(item=>{

                const divCol4 = document.createElement('div');
                divCol4.classList.add('col', 'mb-5', 'mt-5');

                const divCard = document.createElement('div');
                divCard.classList.add('card', 'shadow-lg','p-3', 'mb-5', 'bg-white', 'rounded');
                divCard.addEventListener('click', ()=>{
                        ipcRenderer.send('open-offer-details-window', {
                                id: item.id
                        });
                });

                const cardPicture = document.createElement('img');
                cardPicture.src=item.pictureUrl;
                cardPicture.classList.add( 'card-img-top');

                const cardDestination = document.createElement('div');
                cardDestination.classList.add('card-header');
                cardDestination.innerText = item.destination;


                const divCardBody = document.createElement('div');
                divCardBody.classList.add('card-body');

                const cardTitle = document.createElement('h5');
                cardTitle.classList.add('card-title');
                cardTitle.innerText = item.title;

                const cardDescription = document.createElement('p');
                cardDescription.classList.add('card-text' );
                cardDescription.innerText = item.shortDescription;

                const divCardFooter = document.createElement('div');
                divCardFooter.classList.add('card-footer', 'd-flex', 'justify-content-between');

                const divCardPrice = document.createElement('div');
                divCardPrice.classList.add('d-flex', 'flex-column');

                const cardLabelPrice = document.createElement('h5');
                cardLabelPrice.classList.add('card-subtitle');
                cardLabelPrice.innerText = 'Prix'

                const cardPrice = document.createElement('div');
                cardPrice.classList.add('text-muted');
                cardPrice.innerText = item.price + '€';

                const divCardBonus = document.createElement('ul');
                divCardBonus.classList.add('list-group', 'list-group-flush');

               item.bonus.forEach(elt=>{
                       const listBonus = document.createElement('li');
                       listBonus.classList.add('list-group-item');
                       listBonus.innerText = elt;
                       divCardBonus.append(listBonus);
               });

                const viewBtn = document.createElement('button');
                viewBtn.classList.add('learn-more');

                const spanViewbtn1 = document.createElement('span');
                spanViewbtn1.classList.add('circle');
                spanViewbtn1.setAttribute('aria-hidden', 'true');
                const spanViewbtn2 = document.createElement('span');
                spanViewbtn2.classList.add('icon', 'arrow');
                spanViewbtn1.append(spanViewbtn2);
                const spanViewbtn3 = document.createElement('span');
                spanViewbtn3.classList.add('button-text');
                spanViewbtn3.innerText = ' Voir plus';
                viewBtn.append(spanViewbtn1, spanViewbtn3);


                //Insert the div
                divCardFooter.append(viewBtn, divCardPrice);
                divCardPrice.append(cardLabelPrice, cardPrice);
                divCardBody.append(cardTitle, cardDescription, divCardBonus, divCardFooter);
                divCard.append(cardDestination,cardPicture, divCardBody);
                divCol4.append(divCard);
                divCardDeck.append(divCol4);

            })
}

//Listen to chanel init-data
ipcRenderer.on('init-data', (e, data) => {
        //create the cards with data
        generateOffersCards(data.offers);
});

//listen to new offer view
ipcRenderer.on('new-offer-added', (e, data)=>{
        ////create the cards with data
        generateOffersCards(data.item);
});

//listen to chanel refresh
ipcRenderer.on('refresh-home', (e, data) => {
        //clear out data
        divCardDeck.innerHTML = '';
        //regenerate cards with new data
        generateOffersCards(data);
});


function onClickAddNewOffer(){
        //send data to new offer's view
        ipcRenderer.send('open-new-offer-window', null);
}
//call function addnewoffer when user clicks on add-offer btn
document.querySelector('#add-offer').addEventListener('click', onClickAddNewOffer);

