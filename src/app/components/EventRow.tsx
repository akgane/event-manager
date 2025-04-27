import {useState} from "react";
import {Event} from "@/app/types/event";

type EventRowProps = {
    event: Event;
    onEdit: (mode: string, event?: Event) => void;
    onDelete: (eventIds: string | string[]) => void;
    onCheckboxChange: (eventId: string, isChecked: boolean) => void;
    isChecked: boolean;
}

export default function EventRow(
    {event, onEdit, onDelete, onCheckboxChange, isChecked} : EventRowProps
){
    const [showDescription, setShowDescription] = useState(false);

    function toggleDescription(){
        setShowDescription(!showDescription);
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onCheckboxChange(event.id, e.target.checked);
    }

    return (
        <>
            <tr className="bg-white border-b border-gray-200 hover:bg-gray-100">
                <td className="w-4 p-4">
                    <div className="flex items-center">
                        <input id={`checkbox-${event.id}`}
                               type="checkbox"
                               checked={isChecked}
                               onChange={handleCheckboxChange}
                               className="w-4 h-4 text-blue-600 bg-gray-100 border border-gray rounded-sm"/>
                    </div>
                </td>
                <th scope="row" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap cursor-pointer" onClick={toggleDescription}>
                    {event.title}
                    <p className="text-gray-400 text-sm">Click to {showDescription ? "hide" : "show"} description</p>
                </th>
                <th scope="row" className="event-th">
                    {event.date}
                </th>
                <th scope="row" className="event-th">
                    {event.category}
                </th>
                <th scope="row" className="event-th">
                    {event.status}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-blue-600 whitespace-nowrap">
                    <a onClick={() => onEdit("edit", event)} className="cursor-pointer">Edit</a>
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-red-600 whitespace-nowrap">
                    <a onClick={() => onDelete(event.id)} className="cursor-pointer">Delete</a>
                </th>
            </tr>
            {showDescription && (
                <tr className="bg-gray-50 border-b border-gray-200">
                    <td colSpan={6} className="px-6 py-4 text-gray-700 text-sm">
                        {event.description ? event.description : "No description"}
                    </td>
                </tr>
            )}
        </>
    )
}