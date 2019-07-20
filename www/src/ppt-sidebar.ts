import { BaseWebComponent } from '../ts_modules/@depinore/wclibrary/BaseWebComponent.js'
import * as styles from './styles.js';
import * as models from './models.js';
import * as events from './events.js';

customElements.define('ppt-sidebar', class extends BaseWebComponent {
    slides: models.Slide[] = [];
    currentSlide: models.Slide | null = null;
    private nextUniqueId = 0;
    private imageCount = 0;
    private deleteCount = 0;

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
            <input type='file' style='display: none' id='filePicker'/>
            <button id='deleteButton' class='button'>DELETE LAST SLIDE</button>
        </div>
        `);
    }

    connectedCallback() {
        if(this.shadowRoot) {
            var newImageButton = this.shadowRoot.querySelector('#newImageButton');
            var newTextButton = this.shadowRoot.querySelector('#newTextButton');
            var newTitleButton = this.shadowRoot.querySelector('#newTitleButton');
            var filePicker = this.shadowRoot.querySelector('#filePicker');
            var deleteButton = this.shadowRoot.querySelector('#deleteButton');

            if(newImageButton && newTextButton && newTitleButton && filePicker && deleteButton) {
                newImageButton.addEventListener('click', () => this.displayFilePicker());
                newTextButton.addEventListener('click', () => this.newSlideHandler('text'));
                newTitleButton.addEventListener('click', () => this.newSlideHandler('title'));
                filePicker.addEventListener('input', () => this.newSlideHandler('image'));
                deleteButton.addEventListener('click', () => this.deleteClicked());
            }

            addEventListener(events.stateChangeName, this.handleAppStateChanges as any);
        }
    }
    disconnectedCallback() {
        removeEventListener(events.stateChangeName, this.handleAppStateChanges as any);
    }
    private newSlideHandler = (type: models.SlideType) => {
        this.nextUniqueId++;
        
        var slideContent = (() => {
            switch(type) {
                case 'image': 
                    this.displayFilePicker();
                    this.imageCount++;
                    return `/img/trump${this.imageCount}.jpg`;
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
    private displayFilePicker() {
        if(this.shadowRoot) {
            var filePicker = this.shadowRoot.querySelector('#filePicker') as HTMLElement;

            if(filePicker)
                filePicker.click();
        }
    }
    private deleteClicked() {
        this.deleteCount++;

        switch(this.deleteCount) {
            case 1:
                alert('No.');
                break;
            case 2:
                alert('I said no.');
                break;
            case 3:
                alert(`You know what?  I'm disabling the button.`);
                if(this.shadowRoot) {
                    var deleteButton = this.shadowRoot.querySelector('#deleteButton') as HTMLInputElement;

                    if(deleteButton) {
                        deleteButton.disabled = true;

                        setTimeout(() => {
                            alert('...Fine! Quit your whining!');
                            confirm('So you want to delete that picture?');
                            confirm(`You're saying you didn't like it?`);
                            confirm(`Ok so you want me to delete everything?`);
                            alert(`...Ok!  If that's what you want!`);
                            window.location.reload();
                        }, 15000)
                    }
                }
                break;
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
                ${
                    slide.type === 'image'
                    ? `<img src='${slide.content}' height='100%' width='100%' />`
                    : slide.content
                }
            </div>
        </div>
        `;
    }
    private handleAppStateChanges = (e: { detail: events.AnyEvent }) => {
        if(e.detail.type === 'slide_update') {
            var detail = e.detail;
            var affectedSlide = this.slides.find(s => s.id === detail.id);

            if(affectedSlide)
                affectedSlide.content = detail.newContent;

            if(this.shadowRoot) {
                var slideContent = this.shadowRoot.querySelector(`.slide[data-id='${detail.id}'] .slideContent`);

                if(slideContent) {
                    slideContent.innerHTML = detail.newContent // always run this through sanitize in a prod app.
                }
            }
        }
    }
})