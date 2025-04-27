import {eventCategories, eventStatuses} from "@/app/lib/constants";
import {parseISO, isBefore} from "date-fns";

export function validateEventData(data: {
    title: string;
    category: string;
    status: string;
    date: string;
    description: string;
}){
    const errors: { [key: string ]: string } = {};

    if(!data.title.trim()) errors.title = "Title is required!";
    if(data.title.trim().length > 20) errors.title = "Title is too long. Max length is 20 characters!";

    if(!eventCategories.includes(data.category)) errors.category = "Wrong category!";

    if(!eventStatuses.includes(data.status)) errors.status = "Wrong status!";

    if(!data.date) errors.date = "Date is required!";
    if(isBefore(parseISO(data.date), new Date())) errors.date = "Date can't be in the past!"

    if(data.description.trim().length > 300) errors.description = "Description is too long. Max length is 300 characters!";

    return errors;
}