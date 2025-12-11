// Ilya Zeldner
// In JS, we just created objects.
// In TS, we define the "Shape" of the object first.

// Here we define a "Student" type.
// Then we can use this type throughout our codebase.
// This helps catch errors at compile time, rather than runtime.
export type Student = {
  // type : defines a custom type.
  id: number;
  name: string;
  // Union Types.
  // This variable can ONLY be these two strings. anything else is an error.
  status: "Present" | "Absent";
}; // class vs type: class is used to create objects, type is used to define the shape of an object.

// We can also define other types.
export type Lesson = {
  id: number;
  topic: string;
  date: string; // In a real app, we might use Date type.
};
