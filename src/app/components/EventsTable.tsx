import {Event} from "@/app/types/event";
import EventRow from "@/app/components/EventRow";
import {useReducer} from "react";

type EventsTableProps = {
    events: Event[];
    onEdit: (mode: string, event: Event | undefined) => void;
    onDelete: (eventIds: string | string[]) => void;
    selectedEvents: Set<string>;
    onCheckboxChange: (eventId: string, isChecked: boolean) => void;
};

type SortState = {
    sortBy: keyof Event;
    order: "asc" | "desc";
};

type SortAction = {
    type: "CHANGE_SORT";
    field: keyof Event;
};

const initialSortState: SortState = {
    sortBy: "title",
    order: "asc",
};

function sortReducer(state: SortState, action: SortAction): SortState {
    if (state.sortBy === action.field) {
        return {
            ...state,
            order: state.order === "asc" ? "desc" : "asc",
        };
    }
    return {
        sortBy: action.field,
        order: "asc",
    };
}

const TableHeader = ({
                         field,
                         activeSort,
                         onSort,
                     }: {
    field: keyof Event;
    activeSort: SortState;
    onSort: (field: keyof Event) => void;
}) => (
    <th
        scope="col"
        onClick={() => onSort(field)}
        className="px-6 py-3 cursor-pointer hover:bg-gray-100"
    >
        <div className="flex items-center">
            {field}
            {activeSort.sortBy === field && (
                <span className="ml-1">{activeSort.order === "asc" ? "↑" : "↓"}</span>
            )}
        </div>
    </th>
);

const sortEvents = (events: Event[], sortState: SortState): Event[] => {
    return [...events].sort((a, b) => {
        const aValue = a[sortState.sortBy];
        const bValue = b[sortState.sortBy];

        if (typeof aValue === "string" && typeof bValue === "string") {
            return sortState.order === "asc"
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }
        return 0;
    });
};

export default function EventsTable(
    {events, onEdit, onDelete, selectedEvents, onCheckboxChange}: EventsTableProps
) {
    const [sortState, dispatchSort] = useReducer(sortReducer, initialSortState);

    const handleSort = (field: keyof Event) => {
        dispatchSort({type: "CHANGE_SORT", field});
    };


    const sortedEvents = sortEvents(events, sortState);
    const columns: (keyof Event)[] = ["title", "date", "category", "status"];

    return (
        <div className="relative overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 table-fixed">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="p-4 w-12"/>
                    {columns.map((column) => (
                        <TableHeader
                            key={column}
                            field={column}
                            activeSort={sortState}
                            onSort={handleSort}
                        />
                    ))}
                    <th scope="col" className="px-6 py-3">
                        Edit
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Delete
                    </th>
                </tr>
                </thead>
                <tbody>
                {sortedEvents.map((event) => (
                    <EventRow
                        key={event.id}
                        event={event}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        isChecked={selectedEvents.has(event.id)}
                        onCheckboxChange={onCheckboxChange}
                    />
                ))}
                </tbody>
            </table>
        </div>
    );
}