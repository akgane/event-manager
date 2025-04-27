import {Event} from "@/app/types/event";
import {deleteEvents} from "@/app/lib/storageHandler";

type DeleteModalProps = {
    events: Event[];
    onClose: () => void;
}

export default function DeleteEventModal({events, onClose}: DeleteModalProps){
    const handleAnswer= (accept: boolean)=> {
        if(!accept) {
            onClose();
            return
        }
        if(events.length > 0) deleteEvents(events);
        onClose();
    }

    const titles = events.map((e) => `"${e.title}"`).join(", ");

    return (
        <div className="fixed inset-0 bg-gray-500/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-md w-1/4 p-6">
                <div className="p-4 md:p-5 text-center">
                    <h3 className="mb-5 text-lg font-normal text-gray-600">
                        {events.length === 1 ? (
                            <> Are you sure you want to delete<br/> <b>{events[0].title}</b>?</>
                        ) : (
                            <>Are you sure you want to delete these events:<br/><b>{titles}</b>?</>
                        )}
                    </h3>
                    <div className="flex items-center justify-between">
                        <button onClick={() => handleAnswer(false)} className="popup-button text-gray-900 bg-white border-gray-300">
                            Save
                        </button>
                        <button onClick={() => handleAnswer(true)} className="popup-button text-white bg-red-500">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}