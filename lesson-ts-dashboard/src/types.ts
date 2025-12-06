// Ilya Zeldner
// In JS, we just created objects. 
// In TS, we define the "Shape" of the object first.

// Here we define a "Student" type.
// Then we can use this type throughout our codebase.
// This helps catch errors at compile time, rather than runtime.
export type Student = {
    id: number;
    name: string;
    // TEACHING POINT: Union Types. 
    // This variable can ONLY be these two strings. anything else is an error.
    status: "Present" | "Absent"; 
};