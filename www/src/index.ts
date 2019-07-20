import { message, environmentName } from './constants.js';
import { BaseWebComponent } from '../ts_modules/@depinore/wclibrary/BaseWebComponent.js'
import { default as routie } from '../node_modules/@prepair/routie/lib/index.js';

console.log(`Message from the world: ${message}  You are running the ${environmentName} build.`);

type Slide = { id: string, type: 'title' | 'text' | 'image', content: string }

customElements.define('ppt-app', class extends BaseWebComponent
{
    private slides: Slide[];
    private currentSlide: Slide | null = null;
    private nextUniqueId = 0;

    constructor() {
        super(`
        #wrapper {
            display: flex;
            height: 100vh;
            margin: 0;
            overflow: hidden;
        }
        .padded {
            margin: 15px;
            display: inline-block;
        }
        #sidebarContainer {
            background-color: #ccc;
            flex: .333;
            overflow: auto;
            direction: rtl;
        }
        #sidebar {
            direction: ltr;
        }
        #stageContainer {
            background-color: #eee;
            flex: 1;
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
        this.updateSidebar();
        this.updateStage();
    }   
    disconnectedCallback() {
        
    }
    private updateSidebar() {
        if(this.shadowRoot) {
            const sidebar = this.shadowRoot.querySelector('#sidebar')
            if(sidebar) {
                sidebar.setAttribute('data-slides', this.sanitize(JSON.stringify(this.slides)));
            }
        }
    }
    private updateStage() {
        if(this.shadowRoot) {
            const stage = this.shadowRoot.querySelector('#stage');
            if(stage) {
                stage.setAttribute('data-slide', this.sanitize(JSON.stringify(this.currentSlide)));
            }
        }
    }
});

customElements.define('ppt-sidebar', class extends BaseWebComponent {
    constructor() {
        super(`
        #container {

        }
        .slide {

        }
        .slide.slide--current {

        }
        `, `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam at lectus urna duis. Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget. Ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia. Montes nascetur ridiculus mus mauris vitae ultricies leo. Ultricies tristique nulla aliquet enim. Interdum velit euismod in pellentesque massa. Pharetra magna ac placerat vestibulum lectus mauris. Sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique. Urna molestie at elementum eu facilisis sed odio morbi. Enim lobortis scelerisque fermentum dui faucibus in ornare quam. Non tellus orci ac auctor augue mauris. Nunc non blandit massa enim nec dui nunc. Augue eget arcu dictum varius duis at. Lorem ipsum dolor sit amet. Ut placerat orci nulla pellentesque dignissim. Suspendisse ultrices gravida dictum fusce ut placerat orci nulla. Tempor nec feugiat nisl pretium. Volutpat est velit egestas dui id.

        Semper risus in hendrerit gravida rutrum quisque non. Lobortis elementum nibh tellus molestie nunc non blandit. Justo eget magna fermentum iaculis eu non diam phasellus vestibulum. Aliquam purus sit amet luctus venenatis lectus magna fringilla urna. Ultrices in iaculis nunc sed augue. Faucibus ornare suspendisse sed nisi lacus sed viverra. Accumsan sit amet nulla facilisi morbi. Urna neque viverra justo nec ultrices. Mi in nulla posuere sollicitudin. Phasellus egestas tellus rutrum tellus pellentesque. Nisl rhoncus mattis rhoncus urna. Ipsum consequat nisl vel pretium lectus quam id. Id diam vel quam elementum pulvinar etiam.
        
        Praesent semper feugiat nibh sed. Amet facilisis magna etiam tempor orci eu lobortis. Eu ultrices vitae auctor eu augue ut lectus arcu bibendum. Commodo viverra maecenas accumsan lacus vel facilisis volutpat. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Semper auctor neque vitae tempus quam pellentesque nec nam. Elementum curabitur vitae nunc sed velit dignissim sodales. Sagittis vitae et leo duis ut. Dolor sit amet consectetur adipiscing elit pellentesque. Velit scelerisque in dictum non consectetur a erat. Consectetur adipiscing elit pellentesque habitant morbi tristique.
        
        A arcu cursus vitae congue mauris. Tellus rutrum tellus pellentesque eu tincidunt tortor. Non enim praesent elementum facilisis leo vel fringilla est. Enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra. Eget velit aliquet sagittis id. Mattis molestie a iaculis at erat. Adipiscing diam donec adipiscing tristique risus. Aliquet risus feugiat in ante metus. Quam adipiscing vitae proin sagittis nisl rhoncus. Dictum varius duis at consectetur lorem donec. Nec dui nunc mattis enim ut tellus elementum sagittis. Pellentesque dignissim enim sit amet venenatis urna cursus eget.
        
        Urna id volutpat lacus laoreet non curabitur gravida arcu. Amet facilisis magna etiam tempor orci eu. Risus nec feugiat in fermentum posuere urna nec tincidunt. In nibh mauris cursus mattis molestie a iaculis at. Sed libero enim sed faucibus. Vitae tempus quam pellentesque nec nam aliquam sem et tortor. Ac turpis egestas integer eget aliquet nibh praesent tristique magna. Ultrices mi tempus imperdiet nulla. Integer enim neque volutpat ac tincidunt vitae semper quis. Velit aliquet sagittis id consectetur purus ut faucibus pulvinar. Sed libero enim sed faucibus. Volutpat maecenas volutpat blandit aliquam etiam erat velit. Proin fermentum leo vel orci porta non pulvinar.
        
        Feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam. Et odio pellentesque diam volutpat commodo sed. Imperdiet nulla malesuada pellentesque elit eget. Consectetur lorem donec massa sapien faucibus et. Dui vivamus arcu felis bibendum ut tristique et egestas. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Vitae congue eu consequat ac felis donec. Non diam phasellus vestibulum lorem sed. Ut placerat orci nulla pellentesque dignissim enim. Consequat mauris nunc congue nisi vitae suscipit. Commodo nulla facilisi nullam vehicula ipsum a arcu. Senectus et netus et malesuada fames ac turpis egestas sed. Nulla porttitor massa id neque aliquam vestibulum morbi blandit. Amet tellus cras adipiscing enim eu. Facilisis mauris sit amet massa vitae tortor condimentum lacinia. Cursus in hac habitasse platea dictumst quisque sagittis. Diam quam nulla porttitor massa id neque aliquam. Ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet.
        
        Sit amet consectetur adipiscing elit duis. Adipiscing elit pellentesque habitant morbi tristique senectus. Ac tortor vitae purus faucibus ornare suspendisse. Ornare quam viverra orci sagittis eu volutpat odio facilisis. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Nibh ipsum consequat nisl vel pretium lectus quam. Est ullamcorper eget nulla facilisi etiam dignissim diam. Enim ut sem viverra aliquet eget. Sit amet luctus venenatis lectus. Purus sit amet volutpat consequat mauris. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam. Elit scelerisque mauris pellentesque pulvinar pellentesque. Facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum. Velit laoreet id donec ultrices tincidunt arcu non sodales neque. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar. Condimentum lacinia quis vel eros donec ac. Gravida cum sociis natoque penatibus et magnis dis parturient montes. Et leo duis ut diam.
        
        Sed arcu non odio euismod lacinia at quis risus sed. Tincidunt id aliquet risus feugiat in ante metus dictum. Convallis a cras semper auctor neque vitae tempus. Senectus et netus et malesuada fames ac turpis. Posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Netus et malesuada fames ac turpis egestas. Nam aliquam sem et tortor consequat. Integer malesuada nunc vel risus commodo viverra. Sed arcu non odio euismod lacinia. Ut eu sem integer vitae. Varius quam quisque id diam vel quam elementum pulvinar. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras.
        `);
    }
})
customElements.define('ppt-stage', class extends BaseWebComponent {
    constructor() {
        super(``, `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam at lectus urna duis. Suspendisse interdum consectetur libero id faucibus nisl tincidunt eget. Ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia. Montes nascetur ridiculus mus mauris vitae ultricies leo. Ultricies tristique nulla aliquet enim. Interdum velit euismod in pellentesque massa. Pharetra magna ac placerat vestibulum lectus mauris. Sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique. Urna molestie at elementum eu facilisis sed odio morbi. Enim lobortis scelerisque fermentum dui faucibus in ornare quam. Non tellus orci ac auctor augue mauris. Nunc non blandit massa enim nec dui nunc. Augue eget arcu dictum varius duis at. Lorem ipsum dolor sit amet. Ut placerat orci nulla pellentesque dignissim. Suspendisse ultrices gravida dictum fusce ut placerat orci nulla. Tempor nec feugiat nisl pretium. Volutpat est velit egestas dui id.

        Semper risus in hendrerit gravida rutrum quisque non. Lobortis elementum nibh tellus molestie nunc non blandit. Justo eget magna fermentum iaculis eu non diam phasellus vestibulum. Aliquam purus sit amet luctus venenatis lectus magna fringilla urna. Ultrices in iaculis nunc sed augue. Faucibus ornare suspendisse sed nisi lacus sed viverra. Accumsan sit amet nulla facilisi morbi. Urna neque viverra justo nec ultrices. Mi in nulla posuere sollicitudin. Phasellus egestas tellus rutrum tellus pellentesque. Nisl rhoncus mattis rhoncus urna. Ipsum consequat nisl vel pretium lectus quam id. Id diam vel quam elementum pulvinar etiam.
        
        Praesent semper feugiat nibh sed. Amet facilisis magna etiam tempor orci eu lobortis. Eu ultrices vitae auctor eu augue ut lectus arcu bibendum. Commodo viverra maecenas accumsan lacus vel facilisis volutpat. Tempor orci dapibus ultrices in iaculis nunc sed augue lacus. Semper auctor neque vitae tempus quam pellentesque nec nam. Elementum curabitur vitae nunc sed velit dignissim sodales. Sagittis vitae et leo duis ut. Dolor sit amet consectetur adipiscing elit pellentesque. Velit scelerisque in dictum non consectetur a erat. Consectetur adipiscing elit pellentesque habitant morbi tristique.
        
        A arcu cursus vitae congue mauris. Tellus rutrum tellus pellentesque eu tincidunt tortor. Non enim praesent elementum facilisis leo vel fringilla est. Enim lobortis scelerisque fermentum dui faucibus in ornare quam viverra. Eget velit aliquet sagittis id. Mattis molestie a iaculis at erat. Adipiscing diam donec adipiscing tristique risus. Aliquet risus feugiat in ante metus. Quam adipiscing vitae proin sagittis nisl rhoncus. Dictum varius duis at consectetur lorem donec. Nec dui nunc mattis enim ut tellus elementum sagittis. Pellentesque dignissim enim sit amet venenatis urna cursus eget.
        
        Urna id volutpat lacus laoreet non curabitur gravida arcu. Amet facilisis magna etiam tempor orci eu. Risus nec feugiat in fermentum posuere urna nec tincidunt. In nibh mauris cursus mattis molestie a iaculis at. Sed libero enim sed faucibus. Vitae tempus quam pellentesque nec nam aliquam sem et tortor. Ac turpis egestas integer eget aliquet nibh praesent tristique magna. Ultrices mi tempus imperdiet nulla. Integer enim neque volutpat ac tincidunt vitae semper quis. Velit aliquet sagittis id consectetur purus ut faucibus pulvinar. Sed libero enim sed faucibus. Volutpat maecenas volutpat blandit aliquam etiam erat velit. Proin fermentum leo vel orci porta non pulvinar.
        
        Feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam. Et odio pellentesque diam volutpat commodo sed. Imperdiet nulla malesuada pellentesque elit eget. Consectetur lorem donec massa sapien faucibus et. Dui vivamus arcu felis bibendum ut tristique et egestas. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan. Vitae congue eu consequat ac felis donec. Non diam phasellus vestibulum lorem sed. Ut placerat orci nulla pellentesque dignissim enim. Consequat mauris nunc congue nisi vitae suscipit. Commodo nulla facilisi nullam vehicula ipsum a arcu. Senectus et netus et malesuada fames ac turpis egestas sed. Nulla porttitor massa id neque aliquam vestibulum morbi blandit. Amet tellus cras adipiscing enim eu. Facilisis mauris sit amet massa vitae tortor condimentum lacinia. Cursus in hac habitasse platea dictumst quisque sagittis. Diam quam nulla porttitor massa id neque aliquam. Ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet.
        
        Sit amet consectetur adipiscing elit duis. Adipiscing elit pellentesque habitant morbi tristique senectus. Ac tortor vitae purus faucibus ornare suspendisse. Ornare quam viverra orci sagittis eu volutpat odio facilisis. Auctor neque vitae tempus quam pellentesque nec nam aliquam sem. Nibh ipsum consequat nisl vel pretium lectus quam. Est ullamcorper eget nulla facilisi etiam dignissim diam. Enim ut sem viverra aliquet eget. Sit amet luctus venenatis lectus. Purus sit amet volutpat consequat mauris. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam. Elit scelerisque mauris pellentesque pulvinar pellentesque. Facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum. Velit laoreet id donec ultrices tincidunt arcu non sodales neque. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar. Condimentum lacinia quis vel eros donec ac. Gravida cum sociis natoque penatibus et magnis dis parturient montes. Et leo duis ut diam.
        
        Sed arcu non odio euismod lacinia at quis risus sed. Tincidunt id aliquet risus feugiat in ante metus dictum. Convallis a cras semper auctor neque vitae tempus. Senectus et netus et malesuada fames ac turpis. Posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Netus et malesuada fames ac turpis egestas. Nam aliquam sem et tortor consequat. Integer malesuada nunc vel risus commodo viverra. Sed arcu non odio euismod lacinia. Ut eu sem integer vitae. Varius quam quisque id diam vel quam elementum pulvinar. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras.`);
    }
})


const defaultUserInput = 'nothing so far...';

customElements.define('depinore-it-works', class extends BaseWebComponent {
    userInput: string = '';

    constructor() {
        super(``,`
            <h1>If you see this, it works!</h1>
            <form>
                Try out this form:
                <input type='text' id='userInputText' placeholder='Type something here.'/>

                <p>You typed in: <span id='userInput'>${defaultUserInput}</span></p>

                <input type='submit' id='submit' value='Submit' />
            </form>
        `)
    }
    connectedCallback() {
        if(this.shadowRoot) {
            this.configureUserInput(this.shadowRoot);
            this.configureSubmission(this.shadowRoot);
        }
    }
    private configureUserInput(shadowRoot: ShadowRoot) {
        const userInputText = shadowRoot.querySelector('#userInputText') as HTMLInputElement | null;
            
        if(userInputText) {
            userInputText.addEventListener('input', (event: any) => {
                this.userInput = event.target.value || defaultUserInput;
                this.render(this.sanitize(this.userInput), '#userInput');
            })
        }
        else
            throw new Error('User input control or span are missing.');
    }
    private configureSubmission(shadowRoot: ShadowRoot) {
        const form = shadowRoot.querySelector('form');

        if(form) {
            form.addEventListener('submit', e => {
                e.preventDefault();
                location.hash = `/view2/${this.sanitize(this.userInput)}`;
            });
        }
    }
})
customElements.define('depinore-step-2', class extends BaseWebComponent {
    constructor() {
        super('', `
            You submitted <span id='submittedValue'></span>.
            <a href='#'>&larr; Go back</a>
        `);
    }
    connectedCallback() {
        this.render(this.sanitize(this.getAttribute('data-value') || ''), '#submittedValue');
    }
})