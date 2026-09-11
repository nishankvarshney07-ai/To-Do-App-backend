import { useEffect, useState } from 'react';

function Dashboard() {
  const [todos, setTodos] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [difficulty, setDifficulty] = useState('medium');

  // GET TODOS
  useEffect(() => {
    const getTodos = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch(
          'http://localhost:3000/api/v1/todos',
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (data.status === 'success') {
          setTodos(data.data.todos);
        }

      } catch (error) {
        console.log('Request failed:', error);
      }
    };

    getTodos();
  }, []);


  const handleCreateTodo = async (e) => {
    e.preventDefault();

    console.log("Create button clicked");
    console.log("Title:", title);
    console.log("Description:", description);

    try {
      const token = localStorage.getItem('token');

      console.log("Token exists:", !!token);

      const response = await fetch(
        'http://localhost:3000/api/v1/todos',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            title: title,
            description: description,
            date: date,
            difficulty: difficulty
          })
        }
      );

      console.log("Response status:", response.status);

      const data = await response.json();

      console.log("Create Todo response:", data);

      if (data.status === 'success') {
        setTodos((previousTodos) => [
          ...previousTodos,
          data.data.todo
        ]);

        setTitle('');
        setDescription('');
        setDate('');
        setDifficulty('medium');
      }

    } catch (error) {
      console.log("Create Todo failed:", error);
    }
  };
  const handleDeleteTodo = async (todo) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(
        `http://localhost:3000/api/v1/todos/${todo._id}`, // ye specific _.id uesr ke liye h
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      console.log('Delete Todo status:', response.status);

      if (response.status === 204) {
        setTodos((previousTodos) =>
          previousTodos.filter(
            (currentTodo) => currentTodo._id !== todo._id
          )
        );
      }

    } catch (error) {
      console.log('Delete Todo failed:', error);
    }
  };
  const handleToggleTodo = async (todo) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(
        `http://localhost:3000/api/v1/todos/${todo._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            completed: !todo.completed
          })
        }
      );

      const data = await response.json();

      console.log('Update Todo response:', data);

      if (data.status === 'success') {
        setTodos((previousTodos) =>
          previousTodos.map((currentTodo) =>
            currentTodo._id === todo._id
              ? data.data.todo
              : currentTodo
          )
        );
      }

    } catch (error) {
      console.log('Update Todo failed:', error);
    }
  };


  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-3xl font-bold mb-6">
        My Todos
      </h1>


      {/* CREATE TODO FORM */}

      <form
        onSubmit={handleCreateTodo}
        className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-8"
      >

        <h2 className="text-xl font-semibold mb-4">
          Create Todo
        </h2>

        <input
          type="text"
          placeholder="Todo title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 mb-4"
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 mb-4"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 mb-4"
        />
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 mb-4"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="difficult">Difficult</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg"
        >
          Create Todo
        </button>

      </form>


      {/* TODOS */}

      <div className="space-y-3">

        {todos.map((todo) => (
          <div
            key={todo._id}
            className="bg-slate-900 border border-slate-800 rounded-lg p-4"
          >

            <h2 className="text-xl font-semibold">
              {todo.title}
            </h2>

            <p className="text-slate-400">
              {todo.description}
            </p>

            <p className="text-sm mt-2">
              Status: {todo.completed ? 'Completed' : 'Pending'}
            </p>
            <button
              onClick={() => handleToggleTodo(todo)}
              className="mt-3 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
            >
              {todo.completed ? 'Mark Pending' : 'Mark Complete'}
            </button>
            <button
              onClick={() => handleDeleteTodo(todo)}
              className="mt-3 ml-3 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
            >
              Delete
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Dashboard;