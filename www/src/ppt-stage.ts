import { BaseWebComponent } from '../ts_modules/@depinore/wclibrary/BaseWebComponent.js'
import { Slide } from './models.js';
import * as events from './events.js';

import './ppt-slide.js';

customElements.define('ppt-stage', class extends BaseWebComponent {
    private currentSlide: Slide | null = null;
    constructor() {
        super(`
        `, `
        `);
    }

    connectedCallback() {
        this.updateSlide();
        addEventListener(events.stateChangeName, this.stateChanged as any);
    }
    disconnectedCallback() {
        removeEventListener(events.stateChangeName, this.stateChanged as any);
    }
    private updateSlide() {
        if(this.currentSlide) {
            this.render(`
                <ppt-slide data-slide='${this.sanitize(JSON.stringify(this.currentSlide))}'></ppt-slide>
            `)
        }
        else {
            this.render(`<div class='slidePlaceholder'>Click the NEW SLIDE button to get started on a presentational journey.</div>`);
        }
    }
    
    private stateChanged = (e: { detail: events.AnyEvent }) => {
        if(e.detail.type === 'slide_select') {
            this.currentSlide = e.detail.slide;
            this.updateSlide();
        }
    }
})