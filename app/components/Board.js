'use client'

import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd"
import { useEffect } from "react"
import { useBoardStore } from "@/store/BoardStore"
import Column from "./column"
import NewPopover from "./NewPopover"

export default function Board({ projectId }) {

  const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore((state) => [
    state.board,
    state.getBoard,
    state.setBoardState,
    state.updateTodoInDB,
  ]);

  useEffect(() => {
    getBoard(projectId);
  }, [getBoard, projectId]);

  const handleOnDragEnd = (result) => {
    const { destination, source, type } = result;

    // check if dragged card is outside of board
    if (!destination) return;

    // column drag
    if (type === 'column') {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangedColumns = new Map(entries);
      setBoardState({
        ...board, columns: rearrangedColumns,
      });
      return;
    }

    // convert indexes from numbers to ids
    const columns = Array.from(board.columns);
    const startColIndex = columns[Number(source.droppableId)];
    const finishColIndex = columns[Number(destination.droppableId)];

    const startCol = {
      id: startColIndex[0],
      todos: startColIndex[1].todos,
    };

    const finishCol = {
      id: finishColIndex[0],
      todos: finishColIndex[1].todos,
    }

    if (!startCol || !finishCol) return;

    // handle if dropped in same location
    if (source.index === destination.index && startCol === finishCol) return;

    const newTodos = startCol.todos;
    const [todoMoved] = newTodos.splice(source.index, 1);

    if (startCol.id === finishCol.id) {
      // same column task drag
      newTodos.splice(destination.index, 0, todoMoved);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };
      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id, newCol);

      setBoardState({ ...board, columns: newColumns })
    } else {
      // dragging to different column
      const finishTodos = Array.from(finishCol.todos);
      finishTodos.splice(destination.index, 0, todoMoved);

      const newColumns = new Map(board.columns);
      const newCol = {
        id: startCol.id,
        todos: newTodos,
      };

      newColumns.set(startCol.id, newCol);
      newColumns.set(finishCol.id, {
        id: finishCol.id,
        todos: finishTodos,
      });

      // update db
      updateTodoInDB(todoMoved, finishCol.id);


      setBoardState({ ...board, columns: newColumns })
    }

  };

  return (
    <div className="mt-3">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="column">
          {(provided) => (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
          {...provided.droppableProps} ref={provided.innerRef}>
            {
            Array.from(board.columns.entries()).map(([id, column], index) => (
            <Column
            key={id}
            id={id}
            todos={column.todos}
            index={index}
            />
            ))}
            <NewPopover />
          </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
