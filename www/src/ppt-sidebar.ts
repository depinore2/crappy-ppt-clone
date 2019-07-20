import { BaseWebComponent } from '../ts_modules/@depinore/wclibrary/BaseWebComponent.js'
import * as styles from './styles.js';

customElements.define('ppt-sidebar', class extends BaseWebComponent {
    constructor() {
        super(`
        #container {

        }
        ${styles.slideStyles}
        .slide {
            margin: ${styles.standardMargin}px 0;
            border-width: 5px;
            border-style: solid;
            border-color: transparent;
            height: 200px;
        }
        .slide.slide--current {
            border-color: red;
        }
        .slide.slide--title .slideContent {
            font-size: 15pt;
        }
        .slide.slide--text .slideContent {
            font-size: 2pt;
        }
        `, `
        <div class='slide slide--title'>
            <div class='slideContent'>
                How to make a good PowerPoint<br />
                by Edgar Martinez<br />
                via a Crappy Powerpoint Clone<br />
            </div>
        </div>
        <div class='slide slide--title slide--current'>
            <div class='slideContent'>
                How to make a good PowerPoint<br />
                by Edgar Martinez<br />
                via a Crappy Powerpoint Clone<br />
            </div>
        </div>
        <div class='slide slide--title'>
            <div class='slideContent'>
                How to make a good PowerPoint<br />
                by Edgar Martinez<br />
                via a Crappy Powerpoint Clone<br />
            </div>
        </div>
        <div class='slide slide--title'>
            <div class='slideContent'>
                How to make a good PowerPoint<br />
                by Edgar Martinez<br />
                via a Crappy Powerpoint Clone<br />
            </div>
        </div>
        <div class='slide slide--title'>
            <div class='slideContent'>
                How to make a good PowerPoint<br />
                by Edgar Martinez<br />
                via a Crappy Powerpoint Clone<br />
            </div>
        </div>
        <div class='slide slide--title'>
            <div class='slideContent'>
                How to make a good PowerPoint<br />
                by Edgar Martinez<br />
                via a Crappy Powerpoint Clone<br />
            </div>
        </div>
        `);
    }
})