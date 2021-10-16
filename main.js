const {app, BrowserWindow, ipcMain, dialog, Menu} = require('electron');
const path = require('path');
const Store = require('electron-store');

//using store for data persistence
const store = new Store();

//Variables declarations
let homeWindow;
let offerViewWindow;
let newOfferWindow;
let editOfferWindow;

//Default data offers
const offers = [
                {
                        id: 1,
                        pictureUrl: 'https://back-promocam.orchestra-platform.com/admin/TS/fckUserFiles/Image/RAK-Riad_de_charme_moullaoud/9.jpg',
                        carouselPicturesUrl: [
                                'https://back-promocam.orchestra-platform.com/admin/TS/fckUserFiles/Image/RAK-Riad_de_charme_moullaoud/9.jpg',
                                'https://back-promocam.orchestra-platform.com/admin/TS/fckUserFiles/Image/RAK-Riad_de_charme_moullaoud/4.jpg',
                                'https://back-promocam.orchestra-platform.com/admin/TS/fckUserFiles/Image/RAK-Riad_de_charme_moullaoud/6.jpg'
                        ],
                        title: 'Riad de charme Moullaoud',
                        destination: 'Marrakech, Maroc',
                        shortDescription: ' Avec l\'Atlas en toile de fond, le Riad de charme Moullaoud vous emmène au cœur historique de Marrakech.',
                        longDescription: 'Ville millénaire au soleil éternel et à l’hospitalité légendaire, Marrakech est un lieu de fête et un voyage intérieur qui vous fera grandir l’âme. Avec l’Atlas en toile de fond, le Riad de charme Moullaoud vous emmène au cœur historique de Marrakech.\n' +
                                'A pied, vous serez à 15 mn de la place Jamaâ El Fna et à 10 mn du musée d’art et de culture de Mouassine. En voiture vous pourrez vous promener dans le splendide jardin Majorelle (15 mn), admirer les tombeaux Saadiens (14 mn) et l’ancien palais Badii du XVIe (13 mn). Depuis l’aéroport international de Marrakech-Menara, vous rejoindrez l’hôtel en 25 mn.\n'+'L’hôtel est un Riad dans la plus pure tradition du Maroc mais aménagé avec tout le confort moderne que vous êtes en droit d’attendre et des terrasses aménagées avec une esthétique qui devient magique en soirée. Les chambres ont chacune du caractère et sont personnalisées jusqu’au moindre détail au point de vous sentir dans votre résidence secondaire. Tapis, tableaux, tons clairs et chaleureux suivant votre choix, l’ensemble crée une harmonie orientale séduisante. Le mobilier est de qualité et fonctionnel.\n' +
                                'Les chambres sont équipées de : Wi-Fi (gratuit), air conditionné, penderie, salle de bain complète (douche ou baignoire, WC), sèche-cheveux, TV écran plat, articles de toilettes gratuits, coffre-fort (€), peignoir.',

                        bonus: [ ' Massage-hammam complet', ' Réception 24h/24', ' Wi-Fi', 'Excursions', 'Navette aéroport', 'Blanchisserie'],
                        price: 194
                },
                {
                        id: 2,
                        pictureUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/07/ed/13/f2/breezes-resort-spa-bahamas.jpg',
                        carouselPicturesUrl: [
                                'https://media-cdn.tripadvisor.com/media/photo-s/07/ed/13/f2/breezes-resort-spa-bahamas.jpg',
                                'https://media-cdn.tripadvisor.com/media/photo-s/12/c9/df/c7/love-beach.jpg',
                                'https://images.trvl-media.com/hotels/1000000/470000/460500/460427/18fc736d_y.jpg'
                        ],
                        title: 'The Coral at Atlantis ',
                        destination: 'Nassau, Bahamas',
                        shortDescription: ' Hôtel en bord de plage à Nassau avec une piscine extérieure et un restaurant ',
                        longDescription: 'Prenez un bain de soleil sur la plage de sable blanc privée de The Coral at Atlantis, ou bien profitez des services du centre de bien-être. Ensuite, rendez-vous dans l\'un des 20 restaurants de ce complexe. L\'ensemble des 609 chambres proposent des équipements pratiques tels que des réfrigérateurs et des cafetières, ainsi que des télévisions à écran plat avec chaînes par câble et l\'accès Wi-Fi à Internet gratuit. Les autres équipements et prestations disponibles comprennent des stations d\'accueil iPod, des appels locaux gratuits et un sèche-cheveux. The Coral at Atlantis se dresse près d\'un centre commercial de Paradise Island. Tombez sous le charme de la beauté naturelle des environs au détour des emblématiques Plage nord de Paradise Lagoon et Jardins de Versailles, ou accordez-vous un après-midi de détente aux célèbres Stingray City et Jardins et zoo Ardastra. Envie de vivre un moment unique lors de votre séjour ? Consultez l\'affiche des fantastiques Stade de cricket Haynes Ova et Queen Elizabeth Sports Center, et préparez-vous à vibrer ! Les environs de cet établissement abritent une multitude d\'activités à pratiquer dans ou au bord de l\'eau, comme la plongée sous-marine ou encore la voile. ',
                        bonus: [
                                ' Wi-Fi gratuit',
                                ' Logement authentique',
                                ' Parking gratuit',
                                ' Excursions',
                                 'Piscine',
                                 'Blanchisserie',
                                 'Restaurant'
                        ],
                        price: 675
                },
                {
                        id: 3,
                        pictureUrl: 'https://images.trvl-media.com/hotels/55000000/54530000/54523400/54523338/4f3a4592.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium',
                        carouselPicturesUrl: [
                                'https://images.trvl-media.com/hotels/55000000/54530000/54523400/54523338/4f3a4592.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium',
                                'https://images.trvl-media.com/hotels/55000000/54530000/54523400/54523338/38631337.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium',
                                'https://images.trvl-media.com/hotels/55000000/54530000/54523400/54523338/c1b1019e.jpg?impolicy=fcrop&w=1200&h=800&p=1&q=medium'
                        ],
                        title: 'Hotel Farah Khouribga ',
                        destination: 'Khouribga, Maroc',
                        shortDescription: ' Hotel Farah Khouribga vous donne rendez-vous à Khouribga pour un séjour exceptionnel. ',
                        longDescription: 'Hotel Farah Khouribga vous donne rendez-vous à Khouribga pour un séjour exceptionnel. Les incontournables Siège de la province de Khouribga, Place Khouribga et Complexe OCP figurent parmi les points d\'intérêt locaux. \n'+'Cet hôtel contient un spa proposant des soins complets, un restaurant et une piscine extérieure. Le petit-déjeuner buffet gratuit est offert, ainsi que le Wi-Fi gratuit dans les parties communes, le parking sans voiturier gratuit et une réception gratuite de la direction. Des prestations supplémentaires vous sont proposées, comme 2 bars/salons, un centre de remise en forme ouvert 24 heures sur 24 et un centre d\'affaires ouvert 24 heures sur 24. L\'ensemble des 75 chambres offrent l\'accès Wi-Fi à Internet gratuit, des minibars ainsi que des télévisions à écran plat avec chaînes par satellite. Le service d\'étage, des pommeaux de douche à « effet pluie » et des coffres-forts ne sont que quelques exemples des prestations dont vous pourrez bénéficier. ',
                        bonus: [
                                ' Piscine',
                                ' Jardin',
                                ' Wi-Fi gratuit',
                                ' Excursions fil 7ayt',
                                 'Spa',
                                 'Blanchisserie',
                                'Coffre-fort'
                        ],
                        price: 245
                },
        ];

//Updating store with default data
store.set('offers', offers);


//Create view windows
function createWindow(viewName, dataToSend, width=1700, height=900){
        const win = new BrowserWindow({
                width,
                height,
                webPreferences:{
                        nodeIntegration: false,
                        contextIsolation: true,
                        enableRemoteModule: false,
                        preload: path.join(__dirname, 'preload.js')
                }
        });

        //url views concatenation
        win.loadFile(path.join(__dirname, 'views', viewName, viewName+'.html'))
                .then(()=>{
                        if(dataToSend){
                                //send data to the view
                                win.send('init-data',dataToSend);
                        }
                });

        return win;
}

//calling function create window for the home page when app is ready
app
        .whenReady()
        .then(()=>{
                const data = {offers};
                homeWindow = createWindow('home', data);
        })

//Mac stuff
app.on('window-all-closed', ()=>{
        if(process.platform !== 'darwin'){
                app.quit();
        }
});

//app opening => other OS
app.on('activate', () =>{
        //if no window is opened
        if(BrowserWindow.getAllWindows().length === 0){
                const data = {offers};
                //create home window with data (which are equals to our offer object 's array previously declared
                homeWindow = createWindow('home', data);
        }
});


////////////////////////////////////NEW ITEM WINDOW LISTENERS//////////////////////////////////////////////////

const openNewOfferWindow = (e, data) =>{

        //Not create window to add a new item if a window has already opened for it
        if(newOfferWindow){
                newOfferWindow.focus();
                return;
        }

        //Create window to add a new offer
        newOfferWindow = createWindow('new-offer', null, 1000, 7000);

        //data sented reception
        ipcMain.handle('new-offer', (e, newOffer)=>{

                //create id for each new offer
                let id = 1;
                if(offers.length > 0){
                        //get the id of last element and add 1 to it to get the id of current element
                        id = offers[offers.length -1].id+1;
                }
                //assign the id value which has just been retrieved to the id
                newOffer.id = id;
                //add the new offer to offers array
                offers.push(newOffer);

                //updating store
                store.set(newOffer, offers);

                //send the new offer in home's page's view
                homeWindow.send('new-offer-added', {
                        item: [newOffer],
                        offers
                });

                //return a response if everything's ok
                return 'Nouvelle offre de voyage ajouté avec succès';
        });

        //remove  the new offer's data's value  and  the channel's listener on closing window
        newOfferWindow.on('closed', ()=>{
                newOfferWindow = null;
                ipcMain.removeHandler('new-offer');
        });
}

//listen to new offer window's channel
ipcMain.on('open-new-offer-window', openNewOfferWindow);


//////////////////////////////////// ITEM VIEW DETAILS WINDOW LISTENERS//////////////////////////////////////////////////

//listen to view's offer's window's details channel
ipcMain.on('open-offer-details-window', (e, dataItem) => {

        //Don't create  item's  details 's view window  if a window has already opened for it
        if(offerViewWindow){
                //Focus on it
                offerViewWindow.focus();
                return;
        }

        for(let  item of offers){
                //if offer's id equals current-offer's id
                if(item.id === dataItem.id){
                        //create the view window
                        offerViewWindow = createWindow('offer-view', item, 1000, 1000);
                }
        }
});


//////////////////////////////////////////////////////DELETE ITEM WINDOWS LISTENERS//////////////////////////////////////////////

//listen to delete offer's channel
ipcMain.on('show-confirm-delete-offer', (e, data) => {

        //configure the deletion's  confirmation request
        const choice = dialog.showMessageBoxSync({
                type: 'warning',
                buttons: ['Non', 'Oui'],
                title: 'Confirmation de suppression',
                message: 'Êtes-vous sur de vouloir supprimer l\'offre sélectionné ?'
        });

        //if user confirmed his deletion
        if(choice){
                // for each offer's element => get the offer and its index
                for (let [index, item] of offers.entries()){
                        //if offer's id selected equals to offer's id
                        if(item.id === data.id){
                                //from the founded index, delete its item
                                offers.splice(index, 1);
                                //calling the refresh method on the home page
                                homeWindow.send('refresh-home', offers);
                                //close the current view
                                offerViewWindow.close();
                                //update store
                                store.set(data, offers);

                                break;
                        }
                }
        }
       //when the view window is closing
        offerViewWindow.on('closed', ()=> {
                //reinitialize the window
                offerViewWindow  = null;
        })
})


//////////////////////////////////////////////////////EDIT ITEM WINDOW LISTENERS//////////////////////////////////////////////

//If edit  item's view's window  has already opened
if(offerViewWindow){
        //Close it
        offerViewWindow.close();
        return;
}

//listen to view's edit offer's window channel
ipcMain.on('open-edit-offer-window', (e, dataItem)=> {

        // for each offer's element => get the offer and its index
        for (let [index, item] of offers.entries()){
                //if offer's id selected equals to offer's id
                if (item.id === dataItem.id){
                        //create a view window with this offer's data
                        editOfferWindow = createWindow('edit-offer', {item}, 1000, 8000);
                        //reception data from the edit-offer channel
                        ipcMain.handle('edit-offer', (e, data) => {
                                offers[index].title = data.title;
                                offers[index].destination = data.destination;
                                offers[index].shortDescription = data.shortDescription;
                                offers[index].longDescription = data.longDescription;
                                offers[index].price = data.price;
                                offers[index].bonus = data.bonus;
                                offers[index].pictureUrl = data.pictureUrl;
                                offers[index].carouselPicturesUrl = data.carouselPicturesUrl;

                                //update store
                                store.set(data, offers);

                                //send updated data's offer from edited-offer channel to the main channel
                                offerViewWindow.send('edited-offer', {
                                        item: offers[index]
                                });
                                //send message to the main channel asking to refresh data's home page
                                homeWindow.send('refresh-home', offers);
                                return 'Offre modifiée avec succès ✅ ';
                        });
                        break;
                }
        }

        //reinitialize data when the edit view is closing
        editOfferWindow.on('closed', ()=> {
                editOfferWindow = null;
                ipcMain.removeHandler('edit-offer');
        });
});


//////////////////////////////////////////////////////MENUS' CONFIGURATION//////////////////////////////////////////////

const menuConfig = [
        {
                label: 'Action',
                submenu: [
                        {
                                label: 'Nouvelle offre de voyage',
                                accelerator: 'CmdOrCtrl+N',
                                click(){
                                        openNewOfferWindow(null);
                                }
                        },
                        {
                                label: 'Inspecter',
                                accelerator: 'CmdOrCtrl+I',
                                click(){
                                        if(newOfferWindow){
                                                newOfferWindow.webContents.openDevTools();
                                        } else if(offerViewWindow){
                                                offerViewWindow.webContents.openDevTools();
                                        }else if(editOfferWindow){
                                                editOfferWindow.webContents.openDevTools();
                                        } else{
                                                homeWindow.webContents.openDevTools();
                                        }
                                }
                        },
                        {
                                label: 'Modifier',
                                accelerator: 'CmdOrCtrl+M',
                                click(){
                                        offerViewWindow.send('toggle-edition-mode');
                                }
                        }
                ]
        },
        {
                label: 'Fenêtre',
                submenu: [
                        {role: 'reload'},
                        {role: 'toggledevtools'},
                        {role: 'separator'},
                        {role: 'togglefullscreen'},
                        {role: 'minimize'},
                        {role: 'separator'},
                        {role: 'close'},
                ]
        }
];

//transform my menu's conf  in real menu
const menu = Menu.buildFromTemplate(menuConfig);
//application to the app
Menu.setApplicationMenu(menu);