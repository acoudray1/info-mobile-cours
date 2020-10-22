const DEV_FEST_IMAGES_URL = "https://devfest2018.gdgnantes.com/";
const DEV_FEST_GET_URL = "https://devfest-nantes-2018-api.cleverapps.io/blog";

fetch(DEV_FEST_GET_URL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        appendData(data);
        getLocalStorage();
    })
    .catch(function(err) {
        console.log(err);
    })

/**
 * appendData adds to the screen the different articles we need
 * 
 * @param {string} json
 */
function appendData(json) {
    for (let i = 0; i < json.length; i++) {
        createElementCard(json[i].title, json[i].brief, DEV_FEST_IMAGES_URL + json[i].image)
    }
}

/**
 * createElementCard creates a new card for an article
 * 
 * @param {*} title 
 * @param {*} brief 
 * @param {*} image 
 */
function createElementCard(title, brief, image) {
    let mainContainer = document.getElementById("data");
    let card = document.createElement("ion-card");
    card.id = title;
    let img = document.createElement("img");
    img.src = image;
    let cardHeader = document.createElement("ion-card-header");
    let cardTitle = document.createElement("ion-card-title");
    let cardContent = document.createElement("ion-card-content");
    cardTitle.innerHTML = title;
    cardContent.innerHTML = brief;
    cardHeader.appendChild(cardTitle);
    card.appendChild(img);
    card.appendChild(cardHeader);
    card.appendChild(cardContent);
    mainContainer.appendChild(card);
}

/**
 * takePicture opens the camera, takes a picture and then opens the new article modal
 * 
 */
async function takePicture() {
    const image = await capacitorExports.Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: capacitorExports.CameraResultType.base64String
    });

    presentModal(image.base64String);
}

customElements.define('modal-page', class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <ion-header>
            <ion-toolbar>
            <ion-title>Création d'un article</ion-title>
            <ion-buttons slot="primary">
                <ion-button onClick="dismissModal()">
                <ion-icon slot="icon-only" name="close"></ion-icon>
                </ion-button>
            </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-item>
                <ion-label position="stacked">Titre</ion-label>
                <ion-input id="modaltitle"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="stacked">Description</ion-label>
                <ion-input id="modaldescription"></ion-input>
            </ion-item>
            <ion-button expand="block" onClick="newArticle()">Enregistrer</ion-button>
        </ion-content>`;
    }
});

/**
 * presentModal displays the modal
 * 
 * @param {string} image
 */
function presentModal(image) {
    // create the modal with the `modal-page` component
    const modalElement = document.createElement('ion-modal');
    modalElement.component = 'modal-page';
    modalElement.cssClass = 'my-custom-class';
    modalElement.componentProps = {
        'image': image
    };

    // present the modal
    document.body.appendChild(modalElement);
    return modalElement.present();
}

/**
 * dismissModal closes the modal
 * 
 */
async function dismissModal() {
    let modal = document.querySelector('ion-modal');
    await modal.dismiss({
      'dismissed': true
    });
}

/**
 * newArticle creates a new article on the app
 * 
 */
async function newArticle() {
    let title = await document.getElementById('modaltitle').getInputElement();
    let description = await document.getElementById('modaldescription').getInputElement();
    
    // store data
    setLocalStorage(title.value, description.value, document.querySelector('ion-modal').componentProps.image).then(function() {
        // get data
        getLocalStorage();
        // closes modal
        dismissModal();
    });
}

/**
 * save to the local storage
 * 
 * @param {*} title 
 * @param {*} description 
 * @param {*} image 
 */
async function setLocalStorage(title, description, image) {
    await capacitorExports.Storage.set({
        key: title,
        value: JSON.stringify({
            'title': title,
            'brief': description,
            'image': image
        })
    });
}

/**
 * getLocalStorage gets data n the local storage and add them to the articles list
 */
async function getLocalStorage() {
    let { keys } = await capacitorExports.Storage.keys();
    for (let i = 0; i < keys.length ; i++) {
        let response = await capacitorExports.Storage.get({key: keys[i]});
        let json = JSON.parse(response.value);
        if (!document.getElementById(json.title)) {
            createElementCard(json.title, json.brief, "data:image/png;base64," + json.image);
        }
    }
}