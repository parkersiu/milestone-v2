import { Draggable, Droppable } from "react-beautiful-dnd"
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import TodoCard from "./todocard";
import { useBoardStore } from "@/store/BoardStore";
import { useModalStore } from "@/store/ModalStore";

function convertString(str) {
  const conversions = {
    'todo': 'To Do',
    'inprogress': 'In Progress',
    'done': 'Done'
  };

  const lowercaseStr = str.toLowerCase();
  if (lowercaseStr in conversions) {
    return conversions[lowercaseStr];
  }

  return str;
}

export default function Column({ id, todos, index }) {

  const [searchString, setNewTaskType] = useBoardStore((state) => [
    state.searchString,
    state.setNewTaskType,
  ]);
  const openModal = useModalStore((state) => state.openModal);

  const handleAddTodo = () => {
    setNewTaskType(id);
    openModal();
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`pb-2 p-2 rounded-2xl shadow-sm ${
                snapshot.isDraggingOver ? "bg-green-200" :
                "bg-white/50"
              }`}
              >
                <h2 className="flex justify-between font-bold text-xl p-2">{convertString(id)}
                <span className="text-gray-500 bg-gray-200 rounded-full px-2 py-1 text-sm font-normal">
                  { !searchString ? todos.length :
                  todos.filter(todo => todo.title.toLowerCase().includes(searchString.toLowerCase())).length}
                </span>
                </h2>
                <div className="space-y-2">
                  {todos.map((todo, index) => {

                    // check if searched string is in the list, if not render nothing
                    if(searchString && !todo.title.toLowerCase().includes(searchString.toLowerCase())) return null;

                    return (
                    <Draggable
                    key={todo.$id}
                    draggableId={todo.$id}
                    index={index}
                    >
                      {(provided) => (
                        <TodoCard
                        todo={todo}
                        index={index}
                        id={id}
                        innerRef={provided.innerRef}
                        draggableProps={provided.draggableProps}
                        dragHandleProps={provided.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  )})}

                  {provided.placeholder}

                  <div className="flex items-end justify-end p-2">
                    <button onClick={handleAddTodo} className="text-green-500 hover:text-green-600">
                      <PlusCircleIcon className="h-10 w-10" />
                    </button>
                  </div>
                </div>

              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}
