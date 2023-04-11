import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onLoadingEvents, onSetActiveEvent, onUpdateEvent } from '../store/calendar';
import { calendarApi } from '../api';
import { convertEventsToDateEvents } from '../helpers';

export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { activeEvent, events } = useSelector( state => state.calendar );
    const { isDateModalOpen } = useSelector( state => state.ui );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent(calendarEvent) )
    }

    const startSavingEvent = async( calendarEvent ) => {
        //TODO: UpdateEvent

        if( calendarEvent._id ) {
            dispatch( onUpdateEvent({ ...calendarEvent }) );
        } else {
            const { data } = await calendarApi.post('/events', calendarEvent );

            dispatch( onAddNewEvent({ ...calendarEvent, id: data.eventSave.id, user }) )
        }
    }

    const startLoadingEvents = async() => {
        try {
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents( data.events );

            dispatch( onLoadingEvents( events ) );
        } catch (error) {
            console.log(error);
        }
    }

    const startDeleteEvent = () => {
        // TODO: Llegar al backend
        dispatch( onDeleteEvent() );
    }

    return {
        //* Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,
        isModalClose: isDateModalOpen,

        //* Métodos
        setActiveEvent,
        startDeleteEvent,
        startLoadingEvents,
        startSavingEvent,
    }    
}
