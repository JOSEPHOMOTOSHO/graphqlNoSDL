import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';

const studentType = new GraphQLObjectType({
  name: 'Student',
  description: 'A student in our school',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'The identifier for the student',
    },
    name: {
      type: GraphQLString,
      description: 'The name of the student',
      resolve: (source) => source.fullname,
    },
    gender: {
      type: GraphQLString,
      description: 'The gender of the student',
    },
    age: {
      type: GraphQLInt,
      description: 'The age of the student',
    },
    class: {
      type: GraphQLString,
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

const query = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'The root query',
  fields: () => ({
    students: {
      type: new GraphQLList(studentType),
      description: 'The students in our school',
      resolve: () => getStudents(),
    },
  }),
});

const schema = new GraphQLSchema({
  query,
});

export default schema;
