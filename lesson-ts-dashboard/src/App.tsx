// Ilya Zeldner
// This is the main App component for a Classroom Manager application.
// It demonstrates the use of TypeScript with React, focusing on state management, event handling, and type safety.
// The app allows adding, toggling status, and deleting students from a list.
import { useState } from "react";
import type { Student } from "./types";
import StudentItem from "./components/StudentItem";

// No props needed here, so no generics in the function signature.
function App() {
  // STATE & GENERICS
  // useState<Student[]>
  // We tell React: "This is an Array, and it can ONLY contain Student objects."
  const [students, setStudents] = useState<Student[]>([]);

  // We tell React: "This is a string"
  const [inputValue, setInputValue] = useState<string>("");

  // FUNCTIONS & RETURN TYPES

  // id: number
  // We must specify the type of arguments.
  const toggleStatus = (id: number) => {
    setStudents((currentList) =>
      currentList.map((student) =>
        student.id === id
          ? {
              ...student,
              status: student.status === "Present" ? "Absent" : "Present",
            }
          : student
      )
    );
  };

  const deleteStudent = (id: number) => {
    setStudents((currentList) => currentList.filter((s) => s.id !== id));
  };

  // EVENTS

  // React.FormEvent
  // We must define what kind of event "e" is.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // TS knows preventDefault exists because we typed it as FormEvent

    if (!inputValue.trim()) return;

    const newStudent: Student = {
      id: Date.now(),
      name: inputValue,
      status: "Present", // if we  changing this to "Late" -> TS will crash!
    };
    setStudents([...students, newStudent]);
    setInputValue("");
  };

  // React.ChangeEvent
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // THE RENDER
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Classroom Manager
      </h1>

      {/* THE FORM */}
      <form onSubmit={handleSubmit} className="w-full max-w-md flex gap-2 mb-8">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter student name..."
          className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>

      {/* THE LIST */}
      <div className="w-full max-w-md">
        {students.length === 0 && (
          <p className="text-center text-gray-400 italic">
            No students in class yet.
          </p>
        )}

        {students.map((student) => (
          <StudentItem
            key={student.id}
            student={student}
            onToggle={toggleStatus}
            onDelete={deleteStudent}
          />
        ))}
      </div>

      {/* FOOTER STATS (Shows array math safely) */}
      <div className="mt-8 text-gray-500 text-sm">
        Total: {students.length} | Present:{" "}
        {students.filter((s) => s.status === "Present").length}
      </div>
    </div>
  );
}

export default App;
