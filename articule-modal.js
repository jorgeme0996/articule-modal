import { html, LitElement, css } from 'lit-element';

import '@polymer/paper-dialog'
import '@polymer/paper-button'
import '@polymer/iron-icons'
import '@polymer/iron-icon'
import '@polymer/paper-icon-button/paper-icon-button-light'

class ArticuleModal extends LitElement {
  static get properties() {
    return {
        id: {type: String},
        open: {type: Boolean},
        description: {type: String},
        shippingTime: {type: String},
        name: {type: String},
        price: {type: String},
        img: {type: String}
    };
  }

  static get styles() {
    return css`
    :host {
      display: block;
    }
    .container {
        padding-left: 30px;
        padding-right: 30px;
    }
    paper-dialog {
        border-radius: 10px;
        width: 800px;
    }
    #cont-img {
        display: flex;
        justify-content: center;
    }
    .modal-img {
        width: 100%;
        max-width: 400px;
        height: auto;
    }
    #cont-name-price {
        display: flex;
        justify-content: space-between;
    }
    #cont-btn-close {
        display: flex;
        justify-content: flex-end;
    }
    `
  }

  render() {
    return html`
        <paper-dialog id="modal" modal>
            <div id="cont-btn-close">
                <paper-icon-button-light dialog-confirm autofocus>
                    <button title="close">
                        <iron-icon icon="icons:close"></iron-icon>
                    </button>
                </paper-icon-button-light>
            </div>
            <div class="container">
                <div id="cont-img">
                    <img class="modal-img" src="${this.img}">
                </div>
                <div id="cont-info">
                    <h2>${this.name}</h2>
                    <p>${this.price}</p>
                    <p>${this.description}</p>
                </div>
            </div>
            <div class="buttons">
                <paper-button @click="${this.addToCar}">Agregar al carrito</paper-button>
                <paper-button @click="${this.ShopNow}">Comprar Ahora</paper-button>
            </div>
        </paper-dialog>
    `;
  }

    updated(changedProps){
        if(changedProps.has('open')){
            const modal = this.shadowRoot.getElementById('modal');
            console.log(modal);
            if(this.open === true){
                modal.open();
            }
        }
    }

    addToCar(){
        const articuleData = {
            name: this.name,
            id: this.id,
            price: this.price,
            img: this.img,
            shippingTime: this.shippingTime
        }
        let event = new CustomEvent('add-to-car', {
            detail: articuleData,
            bubbles: true,
            composed: true 
        });
        this.dispatchEvent(event);
    }

    ShopNow(){
        const articuleData = {
            name: this.name,
            id: this.id,
            price: this.price,
            img: this.img,
            shippingTime: this.shippingTime
        }
        let event = new CustomEvent('shop-now', {
            detail: articuleData,
            bubbles: true,
            composed: true 
        });
        this.dispatchEvent(event);
    }
}

window.customElements.define("articule-modal", ArticuleModal);