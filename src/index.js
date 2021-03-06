const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const Query = require('./resolvers/Query')


const resolvers = {
  Query,
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: "__PRISMA_ENDPOINT__",
      secret: 'mysecret123',
    }),
  }),
})

server.start(() => console.log('Server is running on http://localhost:4000'))
