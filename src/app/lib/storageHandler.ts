import {Event} from "@/app/types/event";
import {eventCategories, eventStatuses} from "@/app/lib/constants";
import {mockEvents} from "@/app/lib/mockEvents";

function isBrowser(){
    return typeof window !== 'undefined';
}

//initialize local storage with mock data
export function initializeStorage(){
    if(isBrowser()){
        if(!localStorage.getItem("events")){
            localStorage.setItem("events", JSON.stringify(mockEvents));
        }

        if(!localStorage.getItem("categories")){
            localStorage.setItem("categories", JSON.stringify(eventCategories));
        }

        if(!localStorage.getItem("statuses")){
            localStorage.setItem("statuses", JSON.stringify(eventStatuses));
        }
    }
}

export function getEvents() : Event[]{
    if(!isBrowser()) return [];
    const events = localStorage.getItem("events");
    return events ? JSON.parse(events) : [];
}

export function updateEvent(event : Event){
    if(!isBrowser()) return;
    const events = getEvents();
    const updated = events.map(
        (e) => (e.id === event.id) ? event : e
    );
    localStorage.setItem("events", JSON.stringify(updated));
}

export function addEvent(event: Event){
    if(!isBrowser()) return;
    const events = getEvents();
    events.push(event);
    localStorage.setItem("events", JSON.stringify(events));
}

export function deleteEvents(eventsToDelete: Event[]) {
    if (!isBrowser()) return;

    const existingEvents = getEvents();
    const idsToDelete = new Set(eventsToDelete.map(e => e.id));

    const updatedEvents = existingEvents.filter(
        (event) => !idsToDelete.has(event.id)
    );

    localStorage.setItem("events", JSON.stringify(updatedEvents));
}