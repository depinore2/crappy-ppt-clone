import { BaseWebComponent } from '../ts_modules/@depinore/wclibrary/BaseWebComponent.js'
import * as styles from './styles.js';
import * as models from './models.js';
import * as events from './events.js';

customElements.define('ppt-sidebar', class extends BaseWebComponent {
    slides: models.Slide[] = [];
    currentSlide: models.Slide | null = null;
    private nextUniqueId = 0;

    constructor() {
        super(`
        ${styles.slideStyles}
        .slide {
            margin: ${styles.standardMargin}px 0;
            border-width: 5px;
            border-style: solid;
            border-color: transparent;
            height: 200px;
            cursor: pointer;
        }
        .slide:hover {
            border-color: gray;
        }
        .slide.slide--current {
            border-color: red;
            cursor: default;
        }
        .slide.slide--title .slideContent {
            font-size: 15pt;
        }
        .slide.slide--text .slideContent {
            font-size: 2pt;
        }
        .button {
            padding: 5px;
            margin: 5px;
        }
        #buttonContainer {
            text-align: center;
        }
        `, `
        <div id='slides'>

        </div>
        <div id='buttonContainer'>
            <button id='newTitleButton' class='button'>NEW TITLE SLIDE</button>
            <button id='newTextButton' class='button'>NEW TEXT SLIDE</button>
            <button id='newImageButton' class='button'>NEW IMAGE SLIDE</button>
        </div>
        `);
    }

    connectedCallback() {
        if(this.shadowRoot) {
            var newImageButton = this.shadowRoot.querySelector('#newImageButton');
            var newTextButton = this.shadowRoot.querySelector('#newTextButton');
            var newTitleButton = this.shadowRoot.querySelector('#newTitleButton');

            if(newImageButton && newTextButton && newTitleButton) {
                newImageButton.addEventListener('click', () => this.newSlideHandler('image'));
                newTextButton.addEventListener('click', () => this.newSlideHandler('text'));
                newTitleButton.addEventListener('click', () => this.newSlideHandler('title'));
            }
        }
    }
    private newSlideHandler = (type: models.SlideType) => {
        this.nextUniqueId++;

        var slideContent = (function() {
            switch(type) {
                case 'image': return '';
                case 'text': return 'New text slide.';
                case 'title': return 'New title slide..';
            }
        })();

        let newSlide: models.Slide = {
            content: slideContent,
            id: this.nextUniqueId.toString(),
            type
        };
        this.slides.push(newSlide);

        this.updateUI();
        this.updateCurrentSlide(newSlide);
    }
    private updateUI() {
        this.render(
            this.slides
                .map(s => this.renderMiniSlide(s))
                .join(''),
            '#slides'
        );

        if(this.shadowRoot) {
            var slideElements = this.shadowRoot.querySelectorAll('.slide') as NodeListOf<HTMLElement>;

            for(var i = 0; i < slideElements.length; i++) {
                var slide = this.slides.find(s => s.id === slideElements[i].getAttribute('data-id'));
                
                if(slide) {
                    slideElements[i].onclick = ((slide: models.Slide) => {
                        return () => {
                            this.updateCurrentSlide(slide || null);
                        };
                    })(slide);
                }
            }
                
        }
    }
    private updateCurrentSlide(s: models.Slide | null) {
        this.currentSlide = s;

        window.dispatchEvent(events.newStateEvent({
            type: 'slide_select',
            slide: this.currentSlide
        }));

        if(this.shadowRoot) {
            var previousCurrentSlideElement = this.shadowRoot.querySelector('.slide--current');
            if(previousCurrentSlideElement)
                previousCurrentSlideElement.classList.remove('slide--current');
            
            if(this.currentSlide) {
                var newCurrentSlideElement = this.shadowRoot.querySelector(`.slide[data-id='${this.currentSlide.id}']`);

                if(newCurrentSlideElement)
                    newCurrentSlideElement.classList.add(`slide--current`);
            }
        }
    }
    private renderMiniSlide(slide: models.Slide) {
        var currentSlideId = this.currentSlide && this.currentSlide.id;
        return `
        <div class='slide slide--${this.sanitize(slide.type)}' data-id='${this.sanitize(slide.id)}'>
            <div class='slideContent'>
                ${this.sanitize(slide.content)}
            </div>
        </div>
        `;
    }
})