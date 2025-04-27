import {useEffect, useState} from "react";
import {Event} from "@/app/types/event";
import {eventCategories, eventStatuses} from "@/app/lib/constants";
import {generateID} from "@/app/lib/utilities";
import {validateEventData} from "@/app/lib/validateEventData";
import {addEvent, updateEvent} from "@/app/lib/storageHandler";

type EventModalProps = {
    mode: string;
    event?: Event;
    onClose: () => void;
}

export default function EventModal(
    {mode, event, onClose} : EventModalProps
){
    const [errors, setErrors] = useState<{[key: string] : string}>({});

    const isEdit = mode === "edit";

    const [titleValue, setTitleValue] = useState(isEdit ? event?.title : "");
    const [categoryValue, setCategoryValue] = useState(isEdit ? event?.category : eventCategories[0]);
    const [statusValue, setStatusValue] = useState(isEdit ? event?.status : eventStatuses[0]);
    const [dateValue, setDateValue] = useState(isEdit ? event?.date : "2025-12-31");
    const [descriptionValue, setDescriptionValue] = useState(isEdit ? event?.description : "");

    useEffect(() =>{
        if(mode === "edit" && event){
            setTitleValue(event.title);
            setCategoryValue(event.category);
            setStatusValue(event.status);
            setDateValue(event.date);
            setDescriptionValue(event.description);
        }
    }, [mode, event]);

    function handleSubmit(formData: FormData){
        const newEvent = {
            id: (event ? event.id : generateID()),
            title: (formData.get("title") as string) || "",
            category: (formData.get("category") as string) || eventCategories[0],
            status: (formData.get("status") as string) || eventStatuses[0],
            date: (formData.get("date") as string) || "2025-12-31",
            description: (formData.get("description") as string) || "",
        };

        const validationErrors = validateEventData(newEvent);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (isEdit) updateEvent(newEvent);
        else addEvent(newEvent);
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-gray-500/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-md w-1/4 p-6">
                <div className="flex items-center justify-between p-4 border-b border-gray-900">
                    <h2 className="text-black font-bold text-xl">
                        {mode === "edit" ? `Edit ${event?.title}` : "Add New Event"}
                    </h2>
                    <button type="button" onClick={onClose} className="text-xl text-gray-700 cursor-pointer">X</button>
                </div>
                <div>
                    <form className="p-4" action={handleSubmit}>
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" name="title" id="title"
                                       className="w-full border border-gray-700 rounded-lg bg-gray-50 text-gray-900 p-2.5"
                                       placeholder="Event Title" value={titleValue} onChange={(e) => setTitleValue(e.target.value)}/>
                                {errors.title && <p className="error-message">{errors.title}</p>}
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="category"
                                       className="form-label">Category</label>
                                <select
                                    id="category"
                                    name="category"
                                    value={categoryValue}
                                    onChange={(e) => setCategoryValue(e.target.value)}
                                    className="form-select">
                                    {eventCategories.map(category => (
                                        <option
                                            key={category}
                                            value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && <p className="error-message">{errors.category}</p>}
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="status" className="form-label">Status</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={statusValue}
                                    onChange={(e) => setStatusValue(e.target.value)}
                                    className="form-select">
                                    {eventStatuses.map(status => (
                                        <option
                                            key={status}
                                            value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                                {errors.status && <p className="error-message">{errors.status}</p>}
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="date" className="form-label">Date</label>
                                <input type="date" name="date" id="date"
                                       value={dateValue}
                                       onChange={(e) => setDateValue(e.target.value)}
                                       className="w-full border border-gray-700 rounded-lg bg-gray-50 text-gray-900 p-2.5"/>
                                {errors.date && <p className="error-message">{errors.date}</p>}
                            </div>
                        </div>
                        <div className="col-span-1 mb-4">
                            <label htmlFor="description"
                                   className="form-label">Description</label>
                            <textarea name="description" id="description"
                                      className="w-full h-36 border border-gray-700 rounded-lg bg-gray-50 text-gray-900 p-2.5 resize-none"
                                      value={descriptionValue} onChange={(e) => setDescriptionValue(e.target.value)}
                            />
                            {errors.description && <p className="error-message">{errors.description}</p>}
                        </div>
                        <div className="flex justify-center">
                            <button type="submit"
                                    className="text-white inline-flex items-center bg-blue-700 rounded-lg text-lg px-5 py-2.5 text-center cursor-pointer">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}