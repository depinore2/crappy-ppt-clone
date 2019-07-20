export const standardMargin = 15;
export const slideStyles = `
    .slide {
        display: flex;
        height: calc(100vh - ${standardMargin*2}px);
        background-color: white;
    }
    .slide .slideContent {
        padding: ${standardMargin}px;
        flex: 1;
    }

    /* Title Slide Variant */
    .slide.slide--title {
        align-items: bottom;
    }
    .slide.slide--title .slideContent {
        font-size: 60pt;
        text-align: center;
        white-space: nowrap;
    }
    /* End Title Slide Variant */

    /* Text Slide Variant */
    .slide.slide--text .slideContent{
        font-size: 6pt;
    }
    /* End Text Slide Variant */
`