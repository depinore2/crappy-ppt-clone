import { BaseWebComponent } from '../ts_modules/@depinore/wclibrary/BaseWebComponent.js'
import * as styles from './styles.js';
import { Slide } from './models.js';
import * as events from './events.js';

customElements.define(`ppt-slide`, class extends BaseWebComponent {
    private defaultSlide: Slide = { id: '0', content: '', type: 'text' }
    private currentSlide: Slide = this.defaultSlide;
    constructor() {
        super(`
        ${styles.slideStyles}
        `, `
        <div class='slide' id='slide'>
            <div class='slideContent' contenteditable='true' id='slideContent'>
                
            </div>
        </div>
        `);
    }

    connectedCallback() {
        var attributeValue = this.getAttribute('data-slide');
        if(attributeValue) {
            this.currentSlide = JSON.parse(attributeValue);
        }
        else
            this.currentSlide = this.defaultSlide;

        if(this.shadowRoot) {
            var contentArea = this.shadowRoot.querySelector('#slideContent');

            if(contentArea){
                contentArea.addEventListener('input', (e: any) => {
                    dispatchEvent(events.newStateEvent({
                        type: 'slide_update',
                        id: this.currentSlide.id,
                        newContent: e.srcElement.innerHTML // don't do this in a production app
                    }));
                });
            }
        }

        this.updateUI();
    }
    private updateUI() {
        if(this.shadowRoot) {
            var slide = this.shadowRoot.querySelector('#slide');
            var slideContent = this.shadowRoot.querySelector('#slideContent');

            if(slide && slideContent) {
                slide.classList.remove('slide--text', 'slide--title', 'slide-image');
                slide.classList.add(`slide--${this.currentSlide.type}`);

                switch(this.currentSlide.type) {
                    case 'text':
                    case 'title':
                        slideContent.innerHTML = this.sanitize(this.currentSlide.content);
                        break;
                    case 'image':
                        slideContent.innerHTML = `<img class='bigImage' src='${this.sanitize(this.currentSlide.content)}' />`
                        break;
                }
            }
        }
    }
})