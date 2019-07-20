import * as models from './models.js';

// BEGIN TYPES
export type EventType = 'slide_new' | 'slide_update' | 'slide_delete' | 'slide_select'
export type AppEvent = { type: EventType }

export type NewSlideEvent = AppEvent & { type: 'slide_new'; slideType: models.SlideType }
export type UpdateSlideEvent = AppEvent & { type: 'slide_update'; id: string; newContent: string; }
export type DeleteSlideEvent = AppEvent & { type: 'slide_delete'; id: string; }
export type SelectSlideEvent = AppEvent & { type: 'slide_select'; id: string; }

export type AnyEvent = NewSlideEvent | UpdateSlideEvent | DeleteSlideEvent | SelectSlideEvent;
// END TYPES

//BEGIN CONSTANTS
export const stateChangeName = 'ppt-StateChange'
//END CONSTANTS

// BEGIN FUNCTIONS
export function newStateEvent(info: AnyEvent) {
    return new CustomEvent(stateChangeName, info as any);
}

// END FUNCTIONS