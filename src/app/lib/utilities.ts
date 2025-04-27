import {Event} from "@/app/types/event";

let counter = 0;

export function initializeCounter(events: Event[]){
    if(events.length === 0){
        counter = 0;
        return;
    }

    const lastIdNumber = events
        .map((event) => {
            if(!event.id) return NaN;
            return parseInt(event.id.substring(3), 10)
        })
        .filter(num => !isNaN(num))
        .sort((a, b) => a - b)
        .at(-1);
    counter = (lastIdNumber ?? -1) + 1;
}

export function generateID(){
    return `id-${counter++}`;
}