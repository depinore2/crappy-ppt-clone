import { message, environmentName } from './constants.js';
import * as styles from './styles.js';
import { BaseWebComponent } from '../ts_modules/@depinore/wclibrary/BaseWebComponent.js'
import * as models from './models.js';
import * as events from './events.js';

// component imports go here
import './ppt-sidebar.js';
import './ppt-stage.js'
// end component imports

console.log(`Message from the world: ${message}  You are running the ${environmentName} build.`);

customElements.define('ppt-app', class extends BaseWebComponent
{
    private slides: models.Slide[];
    private currentSlide: models.Slide | null = null;
    private nextUniqueId = 0;

    constructor() {
        super(`
        #wrapper {
            height: 100vh;
            margin: 0;
            overflow: hidden;
            display: flex;
        }
        .padded {
            margin: ${styles.standardMargin}px;
            display: block;
        }
        #sidebarContainer {
            background-color: #ccc;
            width: 300px;
            overflow: auto;
            direction: rtl;
        }
        #sidebar {
            direction: ltr;
        }
        #stageContainer {
            background-color: #eee;
            width: calc(100vw - 300px);
        }
        `, `
        <div id='wrapper'>
            <div id='sidebarContainer'>
                <ppt-sidebar id='sidebar' class='padded'></ppt-sidebar>
            </div>
            <div id='stageContainer'>
                <ppt-stage id='stage' class='padded'></ppt-stage>
            </div>
        </div>`);

        this.slides = [];
    }
    connectedCallback() {
        this.updateSidebarSlides();
        this.updateStage();
        addEventListener(events.stateChangeName, this.onStateChange as any);
    }
    disconnectedCallback() {
        removeEventListener(events.stateChangeName, this.onStateChange as any);
    }
    private onStateChange = (eventData: events.AnyEvent) => {
        if(eventData.type === 'slide_delete') {
            let foundById = this.slides.find(s => s.id === eventData.id);

            if(foundById) {
                let index = this.slides.indexOf(foundById);

                if(index > -1)
                    this.slides.splice(index, 1);
            }
        }
        else if(eventData.type === 'slide_new') {
            this.nextUniqueId++;
            let newSlide: models.Slide = {
                content: '',
                id: this.nextUniqueId.toString(),
                type: eventData.slideType
            };
            this.slides.push(newSlide);

            let event: events.SelectSlideEvent = { type: 'slide_select', id: newSlide.id };
            dispatchEvent(events.newStateEvent(event));
        }
        else if(eventData.type === 'slide_select') {
            let slide = this.slides.find(s => s.id === eventData.id);

            if(slide) {
                this.currentSlide = slide;
                this.updateSidebarSelected();
            }
        }
        else if(eventData.type === 'slide_update') {
            let slide = this.slides.find(s => s.id === eventData.id);
            if(slide)
                slide.content = eventData.newContent;
        }
    }
    private updateSidebarSlides() {
        this.interactWithSidebar(sidebar => 
            sidebar.setAttribute('data-slides', this.sanitize(JSON.stringify(this.slides))));
    }
    private updateSidebarSelected() {
        this.interactWithSidebar(sidebar => 
            sidebar.setAttribute('data-selected', this.currentSlide ? this.currentSlide.id : '')
        );
    }
    private interactWithElement(selector: string, fn: (e: Element) => void) {
        if(this.shadowRoot) {
            const sidebar = this.shadowRoot.querySelector(selector);
            if(sidebar) {
                fn(sidebar);
            }
        }
    }
    private interactWithSidebar(fn: (e: Element) => void) {
        this.interactWithElement('#sidebar', fn);
    }
    private interactWithStage(fn: (e: Element) => void) {
        this.interactWithElement('#stage', fn);
    }
    private updateStage() {
        this.interactWithStage(stage => 
            stage.setAttribute('data-slide', this.sanitize(JSON.stringify(this.currentSlide)))
        );
    }
});