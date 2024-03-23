import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo, editTask } from "../features/todoSlice";

const AddTodo = () => {
    const [input, setInput] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [editList, setEditList] = useState(""); 
    const dispatch = useDispatch();
    useSelector((state) => state.todoApp);
    const addedList = useSelector((state) => state.todoApp).todos;

    const handleAddSubmit = () => {
        if (input !== "") {
            dispatch(addTodo({ id: addedList.length, data: input }));
            setInput("");
        }
    };

    const handleDelete = (todoId) => {
        dispatch(removeTodo(todoId));
    };

    const handleEditSubmit = () => {
        dispatch(editTask({
            todosId: editIndex,
            updatedTask: editList,
        }));
        setEditIndex(null);
    };

    return (
        <div>
            <h1>TodoApp</h1>
            <form>
                <input type="text" placeholder="Type Something" value={input} onChange={(e) => setInput(e.target.value)} />
                <button type="button" onClick={handleAddSubmit}>Add</button>
            </form>
            {addedList.map((item) => (
                <div key={item.id}>
                    <h1>{item.data}</h1>
                    <button onClick={() => handleDelete(item.id)}>delete</button>
                    <button onClick={() => setEditIndex(item.id)} className='edit-btn'>edit</button>
                    {editIndex === item.id && (
                        <div key={`edit-${item.id}`}>
                            <input type="text" onChange={(e) => setEditList(e.target.value)} />
                            <button onClick={handleEditSubmit} className='add-btn'>save</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AddTodo;
