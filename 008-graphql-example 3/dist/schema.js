"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const studentType = new graphql_1.GraphQLObjectType({
    name: "Student",
    description: "A student in our school",
    fields: () => ({
        id: {
            type: graphql_1.GraphQLID,
            description: "The identifier for the student",
        },
        name: {
            type: graphql_1.GraphQLString,
            description: "The name of the student",
            resolve: (source) => source.fullname,
        },
        gender: {
            type: graphql_1.GraphQLString,
            description: "The gender of the student",
        },
        age: {
            type: graphql_1.GraphQLInt,
            description: "The age of the student",
        },
        class: {
            type: graphql_1.GraphQLString,
            description: "The class the student belongs to",
        },
    }),
});
const inputStudentType = new graphql_1.GraphQLInputObjectType({
    name: "StudentCreateType",
    description: "format for creating new students",
    fields: () => ({
        fullname: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
            description: "The name of the student",
        },
        gender: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
            description: "The gender of the student",
        },
        age: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt),
            description: "The age of the student",
        },
        class: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString),
            description: "The class the student belongs to",
        },
    }),
});
const students = [
    {
        id: 1,
        fullname: "Jane Doe",
        gender: "female",
        age: 10,
        class: "JSS1",
        house: "Yellow",
    },
    {
        id: 2,
        fullname: "Loius Doe",
        gender: "female",
        age: 18,
        class: "SS3",
        house: "Red",
    },
    {
        id: 3,
        fullname: "Mane Doe",
        gender: "male",
        age: 9,
        class: "JSS2",
        house: "Green",
    },
    {
        id: 4,
        fullname: "Example Doe",
        gender: "female",
        age: 11,
        class: "JSS3",
        house: "Blue",
    },
    {
        id: 5,
        fullname: "John Doe",
        gender: "male",
        age: 15,
        class: "SS1",
        house: "Red",
    },
];
function getStudents() {
    return students;
}
async function getStudentByID(id) {
    return students.find((student) => student.id === Number(id));
}
async function updateStudentAge(id, newAge) {
    const student = await getStudentByID(id);
    if (!student) {
        return null;
    }
    student.age = newAge;
    return student;
}
async function createStudent(newStudent) {
    const newStudentId = students.length + 1;
    const savedStudent = { ...newStudent, id: newStudentId };
    students.push(savedStudent);
    return savedStudent;
}
async function deleteStudent(id) {
    const indexOfElement = students.findIndex((student) => student.id == +id);
    if (indexOfElement == undefined) {
        throw new Error(`Invalid Id : ${id}`);
    }
    students.slice(indexOfElement, 1);
    return `Student with id: ${id} deleted successfully.`;
}
const query = new graphql_1.GraphQLObjectType({
    name: "RootQuery",
    description: "The root query",
    fields: () => ({
        students: {
            type: new graphql_1.GraphQLList(studentType),
            description: "The students in our school",
            resolve: () => getStudents(),
        },
        student: {
            type: studentType,
            description: "Request for a single student information by their ID",
            args: {
                id: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
                    description: "The ID of the student to query for",
                },
            },
            resolve: (_, args) => {
                return getStudentByID(args.id);
            },
        },
    }),
});
const mutation = new graphql_1.GraphQLObjectType({
    name: "mutation",
    description: "Changes you can make to this schema",
    fields: () => ({
        updateAge: {
            type: studentType,
            description: "Updates the age of a student given thier id",
            args: {
                studentId: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
                    description: "The Id of the student to update their age",
                },
                age: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt),
                    description: "What the new age of the student should be",
                },
            },
            resolve: (_, args) => {
                const { studentId, age } = args;
                return updateStudentAge(studentId, age);
            },
        },
        createStudent: {
            type: studentType,
            description: "Create a new student",
            args: {
                userFields: {
                    type: inputStudentType,
                },
            },
            resolve: (parent, args) => createStudent(args.userFields),
        },
        deleteStudent: {
            type: graphql_1.GraphQLString,
            description: "delete student with the given id",
            args: {
                id: {
                    type: graphql_1.GraphQLID,
                },
            },
            resolve: (parent, args) => deleteStudent(args.id),
        },
    }),
});
const schema = new graphql_1.GraphQLSchema({
    query,
    mutation,
});
exports.default = schema;
//# sourceMappingURL=schema.js.map