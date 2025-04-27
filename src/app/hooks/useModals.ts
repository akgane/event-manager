import { useState } from "react";
import { Event } from "@/app/types/event";
import {getEvents} from "@/app/lib/storageHandler";

export function useModals() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [selectedEvent, setSelectedEvent] = useState<Event | undefined>(undefined);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteEvents, setDeleteEvents] = useState<Event[]>([]);

    const openModalHandler = (mode: string, event?: Event) => {
        if (event) setSelectedEvent(event);
        setModalMode(mode);
        setIsModalOpen(true);
    };

    const closeModalHandler = () => {
        setSelectedEvent(undefined);
        setIsModalOpen(false);
    };

    const openDeleteModalHandler = (eventIds: string | string[]) => {
        const eventsToDelete = Array.isArray(eventIds)
            ? eventIds.map(id => getEvents().find(e => e.id === id)).filter(Boolean) as Event[]
            : [getEvents().find(e => e.id === eventIds)].filter(Boolean) as Event[];

        setDeleteEvents(eventsToDelete);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModalHandler = () => {
        setDeleteEvents([]);
        setIsDeleteModalOpen(false);
    };

    return {
        isModalOpen,
        modalMode,
        selectedEvent,
        isDeleteModalOpen,
        deleteEvents,
        openModalHandler,
        closeModalHandler,
        openDeleteModalHandler,
        closeDeleteModalHandler,
    };
}