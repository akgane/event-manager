"use client";

import {Event} from "@/app/types/event";
import {useEffect, useState} from "react";
import {getEvents, initializeStorage} from "@/app/lib/storageHandler";
import EventsTable from "@/app/components/EventsTable";
import {useModals} from "@/app/hooks/useModals";
import EventModal from "@/app/components/EventModal";
import DeleteEventModal from "@/app/components/DeleteEventModal";

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedEvents, setSelectedEvents] = useState<Set<string>>(new Set());

    const {
        isModalOpen,
        modalMode,
        selectedEvent,
        isDeleteModalOpen,
        deleteEvents,
        openModalHandler,
        closeModalHandler,
        openDeleteModalHandler,
        closeDeleteModalHandler,
    } = useModals();

    const handleSelectEvent = (eventId: string, isChecked: boolean) => {
        setSelectedEvents(prev => {
            const updated = new Set(prev);
            if (isChecked) updated.add(eventId);
            else updated.delete(eventId);
            return updated;
        });
    };


    const refreshEvents = () => {
        const fetchedEvents = getEvents();
        setEvents(fetchedEvents);
    }

    useEffect(() => {
        function loadEvents() {
            console.log("load events");
            try {
                setLoading(true);
                initializeStorage();
                const fetchedEvents = getEvents();
                setEvents(fetchedEvents);
            } catch (e) {
                console.error("Failed to load events: ", e);
                if (e instanceof Error) setError(`Failed to load events: ${e.message}`);
            } finally {
                setLoading(false);
            }
        }

        loadEvents();
    }, []);

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <div>
            <div className="mb-4 flex gap-4 items-center">
                <h2 className="text-black font-bold text-2xl">Events</h2>
                <button
                    className="action-button"
                    onClick={() => openModalHandler("create")}
                    type="button">
                    Add Event
                </button>
                <button
                    className={`${selectedEvents.size === 0 ? "disabled-action-button" : "action-button"}`}
                    onClick={() => openDeleteModalHandler(Array.from(selectedEvents))}
                    type="button">
                    Delete Events
                </button>
            </div>
            <div>
                <EventsTable
                    events={events}
                    onEdit={openModalHandler}
                    onCheckboxChange={handleSelectEvent}
                    selectedEvents={selectedEvents}
                    onDelete={openDeleteModalHandler}/>
                {isModalOpen && <EventModal mode={modalMode} event={selectedEvent} onClose={() => {
                    closeModalHandler();
                    refreshEvents();
                }}/>}
                {isDeleteModalOpen && <DeleteEventModal events={Array.from(deleteEvents)} onClose={() => {
                    closeDeleteModalHandler();
                    refreshEvents();
                }}/>}
            </div>
        </div>
    )
}