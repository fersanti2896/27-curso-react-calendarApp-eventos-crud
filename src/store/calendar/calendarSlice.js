import { createSlice } from '@reduxjs/toolkit';

export const caldendarSlice = createSlice({
    name: 'caldendar',
    initialState: {
        isLoadingEvents: true,
        events: [  ],
        activeEvent: null
    },
    reducers: {
        onLoadingEvents: ( state, { payload = [] } ) => {
            state.isLoadingEvents = false;
            // state.events = payload;
            payload.forEach( event => {
                const exists = state.events.some( dbEvent => dbEvent.id === event.id );
               
                if( !exists ) {
                    state.events.push( event );
                }
            });
        },
        onSetActiveEvent: ( state, { payload } ) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: ( state, { payload } ) => {
            state.events.push( payload );
            state.activeEvent = null;
        },
        onUpdateEvent: ( state, { payload } ) => {
            state.events = state.events.map( event => {
                if( event._id === payload._id ) {
                    return payload;
                }

                return event;
            } );
        },
        onDeleteEvent: ( state ) => {
            if( state.activeEvent ) {
                state.events = state.events.filter( event => event._id !== state.activeEvent._id );
                state.activeEvent = null
            }
        }
    }
});


// Action creators are generated for each case reducer function
export const { onLoadingEvents, onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = caldendarSlice.actions;