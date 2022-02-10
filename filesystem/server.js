const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const path = require('path')
const fs = require('fs')

const {
  GraphQLUpload,
  graphqlUploadExpress,
} = require('graphql-upload');
const { finished } = require('stream/promises');

const typeDefs = gql`

  scalar Upload

  type File {
     filename: String!
     mimetype: String!
     encoding: String!
      url: String!
      
  }

  type Query {
   
    hello: String!
  }

  type Mutation {
    # Multiple uploads are supported. See graphql-upload docs for details.
    uploadFile(file: Upload!): File!
  }
`;

const resolvers = {

  Query: {
    hello: () => "Hello World"
  },


  Mutation: {
    uploadFile: async (parent, { file }) => {
      const { createReadStream, filename, mimetype, encoding } = await file
      console.log(file);
      const pathName = path.join(__dirname, `/public/images/${filename}`)
      fs.createWriteStream(pathName)



      //stream.pipe(out);

      //filename, mimetype, encoding,
      return {
        filename: filename,
        mimetype: mimetype,
        encoding: encoding,
        url: `http://localhost:4000/graphql/images/${filename}`,
      }
    },
  },
}

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  const app = express();

  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });

  await new Promise(r => app.listen({ port: 4000 }, r));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer();
