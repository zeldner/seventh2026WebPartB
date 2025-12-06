// Ilya Zeldner
// This is a React Functional Component written in TypeScript.
// We define the props type for this component to ensure type safety.
// This component displays a student's information along with buttons to toggle status and delete the student.
import type { Student } from "../types";

// We define the "Contract" for the props.
// The parent MUST pass these exact functions and data.
type StudentItemProps = {
  student: Student;
  onToggle: (id: number) => void; // A function that takes a number and returns nothing
  onDelete: (id: number) => void;
};

export default function StudentItem({
  student,
  onToggle,
  onDelete,
}: StudentItemProps) {
  return (
    <div className="flex items-center justify-between bg-white p-4 mb-2 rounded shadow-sm border border-gray-200">
      <div>
        <h3 className="font-bold text-lg text-gray-800">{student.name}</h3>
        <span
          className={`text-xs px-2 py-1 rounded-full font-semibold ${
            student.status === "Present"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {student.status}
        </span>
      </div>

      <div className="flex gap-2">
        {/* TS knows that 'onToggle' expects a number (student.id) */}
        <button
          onClick={() => onToggle(student.id)}
          className="text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded hover:bg-blue-100"
        >
          Switch Status
        </button>
        <button
          onClick={() => onDelete(student.id)}
          className="text-sm bg-gray-100 text-gray-500 px-3 py-1 rounded hover:bg-gray-200"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
