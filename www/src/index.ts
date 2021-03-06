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
    }
});