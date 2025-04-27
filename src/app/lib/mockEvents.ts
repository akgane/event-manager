import {Event} from "@/app/types/event";
import {generateID} from "@/app/lib/utilities";
import {eventCategories, eventStatuses} from "@/app/lib/constants";

export const mockEvents: Event[] = [
    {
        id: generateID(),
        title: "Some event",
        date: "2025-04-26",
        category: eventCategories[0],
        status: eventStatuses[2],
        description: "lorem ipsum dolor sit amet, consetetur",
    },
    {
        id: generateID(),
        title: "New event",
        date: "2025-04-28",
        category: eventCategories[1],
        status: eventStatuses[0],
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non nisi gravida, malesuada lorem at, commodo est. Praesent in sollicitudin diam, ac consectetur eros"
    },
    {
        id: generateID(),
        title: "Done event",
        date: "2025-04-21",
        category: eventCategories[2],
        status: eventStatuses[1]
    },
    {
        id: generateID(),
        title: "Zoom meeting",
        date: "2025-04-27",
        category: eventCategories[2],
        status: eventStatuses[0]
    },
    {
        id: generateID(),
        title: "Super webinar",
        date: "2025-04-26",
        category: eventCategories[1],
        status: eventStatuses[2]
    },
    {
        id: generateID(),
        title: "Mid-term",
        date: "2025-04-28",
        category: eventCategories[0],
        status: eventStatuses[0]
    },
]