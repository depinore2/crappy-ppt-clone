import { BaseWebComponent } from '../ts_modules/@depinore/wclibrary/BaseWebComponent.js'
import * as styles from './styles.js';
import { Slide } from './models.js';

customElements.define('ppt-stage', class extends BaseWebComponent {
    private currentSlide: Slide | null = null;
    constructor() {
        super(`
            ${styles.slideStyles}
        `, `
        <div class='slide' id='slide'>
            <div class='slideContent' contenteditable='false' id='slideContent'>
                Click the 'NEW SLIDE' in the left sidebar to embark on a presentational journey.
            </div>
        </div>
        `);
    }

    connectedCallback() {
        this.getSlideFromAttribute();
        this.updateStage();
    }
    private getSlideFromAttribute() {
        var slideAttr = this.getAttribute('data-slide');
        if(slideAttr) {
            this.currentSlide = JSON.parse(slideAttr);
        }
    }
    private updateStage() {
        if(this.shadowRoot) {
            const slide = this.shadowRoot.querySelector('#slide');
            const slideContent = this.shadowRoot.querySelector('#slideContent');

            if(slide && slideContent) {
                slide.classList.remove('slide--disabled');

                if(this.currentSlide) {
                    slideContent.setAttribute('contenteditable', 'true');
                }
                else {
                    slide.classList.add('slide--disabled');
                    slideContent.setAttribute('contenteditable', 'false');
                }
            }
        }
    }
})