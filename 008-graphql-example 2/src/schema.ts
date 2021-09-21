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
  GraphQLInputObjectType,
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

async function getStudentByID(id: string) {
  return students.find((student) => student.id === Number(id));
}

async function updateStudentAge(id: string, newAge: number) {
  const student = await getStudentByID(id);

  if (!student) {
    return null;
  }

  student.age = newAge;

  return student;
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
    student: {
      type: studentType,
      description: 'Request for a single student information by their ID',
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'The ID of the student to query for',
        },
      },
      resolve: (_, args) => {
        return getStudentByID(args.id);
      },
    },
  }),
});

const mutation = new GraphQLObjectType({
  name: 'mutation',
  description: 'Changes you can make to this schema',
  fields: () => ({
    updateAge: {
      type: studentType,
      description: 'Updates the age of a student given thier id',
      args: {
        studentId: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'The Id of the student to update their age',
        },
        age: {
          type: new GraphQLNonNull(GraphQLInt),
          description: 'What the new age of the student should be',
        },
      },
      resolve: (_, args) => {
        const { studentId, age } = args;

        return updateStudentAge(studentId, age);
      },
    },
    createStudent: {
      type: studentType,
      description: 'Create a new student',
      args: {
        userFields: {
          type: newUserType,
        },
      },
      resolve: () => {},
    },
  }),
});

const schema = new GraphQLSchema({
  query,
  mutation,
});

export default schema;
