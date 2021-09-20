"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const studentType = new graphql_1.GraphQLObjectType({
    name: 'Student',
    description: 'A student in our school',
    fields: () => ({
        id: {
            type: graphql_1.GraphQLID,
            description: 'The identifier for the student',
        },
        name: {
            type: graphql_1.GraphQLString,
            description: 'The name of the student',
            resolve: (source) => source.fullname,
        },
        gender: {
            type: graphql_1.GraphQLString,
            description: 'The gender of the student',
        },
        age: {
            type: graphql_1.GraphQLInt,
            description: 'The age of the student',
        },
        class: {
            type: graphql_1.GraphQLString,
            description: 'The class the student belongs to',
        },
    }),
});
const students = [
    {
        id: 1,
        fullname: 'Jane Doe',
        gender: 'female',
        age: 10,
        class: 'JSS1',
        house: 'Yellow',
    },
    {
        id: 2,
        fullname: 'Loius Doe',
        gender: 'female',
        age: 18,
        class: 'SS3',
        house: 'Red',
    },
    {
        id: 3,
        fullname: 'Mane Doe',
        gender: 'male',
        age: 9,
        class: 'JSS2',
        house: 'Green',
    },
    {
        id: 4,
        fullname: 'Example Doe',
        gender: 'female',
        age: 11,
        class: 'JSS3',
        house: 'Blue',
    },
    {
        id: 5,
        fullname: 'John Doe',
        gender: 'male',
        age: 15,
        class: 'SS1',
        house: 'Red',
    },
];
function getStudents() {
    return students;
}
const query = new graphql_1.GraphQLObjectType({
    name: 'RootQuery',
    description: 'The root query',
    fields: () => ({
        students: {
            type: new graphql_1.GraphQLList(studentType),
            description: 'The students in our school',
            resolve: () => getStudents(),
        },
    }),
});
const schema = new graphql_1.GraphQLSchema({
    query,
});
exports.default = schema;
//# sourceMappingURL=schema.js.map