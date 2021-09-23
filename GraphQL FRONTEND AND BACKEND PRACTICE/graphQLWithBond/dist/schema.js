"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const studentType = new graphql_1.GraphQLObjectType({
    name: "student",
    description: "this descibes a student in our school",
    fields: () => ({
        id: {
            type: graphql_1.GraphQLID,
            description: "ID of student",
        },
        name: {
            description: "name of student",
            type: graphql_1.GraphQLString,
            resolve: (source) => source.fullname,
        },
        gender: {
            description: "gender of student",
            type: graphql_1.GraphQLString,
        },
        age: {
            description: "age of student",
            type: graphql_1.GraphQLInt,
        },
        class: {
            description: "class of student",
            type: graphql_1.GraphQLString,
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
const createStudentInputType = new graphql_1.GraphQLInputObjectType({
    name: "CreateStudent",
    description: "this descibes a student to be created in our school",
    fields: () => ({
        fullname: {
            description: "name of student",
            type: graphql_1.GraphQLString,
        },
        gender: {
            description: "gender of student",
            type: graphql_1.GraphQLString,
        },
        age: {
            description: "age of student",
            type: graphql_1.GraphQLInt,
        },
        class: {
            description: "class of student",
            type: graphql_1.GraphQLString,
        },
    }),
});
function getAllStudents() {
    return students;
}
function getSingleStudent(id) {
    let student = students.find((student) => student.id === Number(id));
    return student;
}
function updateAge(id, age) {
    let oneStudent = students.find((student) => student.id === Number(id));
    if (!oneStudent) {
        return "Student Not found";
    }
    oneStudent.age = age;
    return oneStudent;
}
function createStudent(studentObj) {
    let newID = students.length + 1;
    let newStudent = { ...studentObj, id: newID };
    students.push(newStudent);
    console.log(students);
    return students;
}
const query = new graphql_1.GraphQLObjectType({
    name: "RootQuery",
    description: "This represents the root query",
    fields: () => ({
        squad: {
            type: graphql_1.GraphQLString,
            description: "this returns a squad that student belongs to",
            resolve: () => "SQ008",
        },
        stack: {
            type: graphql_1.GraphQLString,
            description: "this returns the stack that the student belongs to",
            resolve: () => "Node",
        },
        noOfDevs: {
            type: graphql_1.GraphQLInt,
            description: "No of devs in a stack",
            resolve: () => 24,
        },
        noOfSas: {
            type: graphql_1.GraphQLInt,
            description: "No of Stack Associates in a stack",
            resolve: () => 5,
        },
        students: {
            type: new graphql_1.GraphQLList(studentType),
            description: "list of students",
            resolve: () => getAllStudents(),
        },
        student: {
            description: "get a single student",
            type: studentType,
            args: {
                id: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
                    description: "id of student",
                },
            },
            resolve: (_, args) => getSingleStudent(args.id),
        },
    }),
});
const mutation = new graphql_1.GraphQLObjectType({
    name: "Mutations",
    description: "changes are made to students",
    fields: () => ({
        ageUpdate: {
            type: studentType,
            description: "updates students age",
            args: {
                id: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
                    description: "Id of student whose age ",
                },
                age: {
                    type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt),
                    description: "new age we want for our student",
                },
            },
            resolve: (_, args) => updateAge(args.id, args.age),
        },
        createStudent: {
            type: new graphql_1.GraphQLList(studentType),
            description: "Student to be created",
            args: {
                newStudent: {
                    type: createStudentInputType,
                },
            },
            resolve: (_, args) => createStudent(args.newStudent),
        },
    }),
});
const schema = new graphql_1.GraphQLSchema({
    query: query,
    mutation: mutation,
});
exports.default = schema;
//# sourceMappingURL=schema.js.map