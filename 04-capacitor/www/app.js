const DEV_FEST_IMAGES_URL = "https://devfest2018.gdgnantes.com/";
const DEV_FEST_GET_URL = "https://devfest-nantes-2018-api.cleverapps.io/blog";

fetch(DEV_FEST_GET_URL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        appendData(data);
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
    let mainContainer = document.getElementById("data");
    for (let i = 0; i < json.length; i++) {
        let card = document.createElement("ion-card");
        let img = document.createElement("img");
        img.src = DEV_FEST_IMAGES_URL + json[i].image;
        let cardHeader = document.createElement("ion-card-header");
        let cardTitle = document.createElement("ion-card-title");
        let cardContent = document.createElement("ion-card-content");
        cardTitle.innerHTML = json[i].title;
        cardContent.innerHTML = json[i].brief;
        cardHeader.appendChild(cardTitle);
        card.appendChild(img);
        card.appendChild(cardHeader);
        card.appendChild(cardContent);
        mainContainer.appendChild(card);
    }
}

/**
 * takePicture opens the camera, takes a picture and then opens the new article modal
 * 
 */
async function takePicture() {
    const image = await capacitorExports.Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: capacitorExports.CameraResultType.Uri
    });

    let imageUrl = image.webPath;
    let newImage = document.createElement("img");
    newImage.src = imageUrl;

    presentModal(imageUrl);
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
 * @param {string} imageUrl 
 */
function presentModal(imageUrl) {
    // create the modal with the `modal-page` component
    const modalElement = document.createElement('ion-modal');
    modalElement.component = 'modal-page';
    modalElement.cssClass = 'my-custom-class';
    modalElement.componentProps = {
        'image': imageUrl
    };

    // present the modal
    document.body.appendChild(modalElement);
    return modalElement.present();
}

/**
 * dismissModal closes the modal without saving anything
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

    let json = {
        'title': title.value,
        'brief': description.value,
        'image': document.querySelector('ion-modal').componentProps.image
    }
    
    console.log(json);
}