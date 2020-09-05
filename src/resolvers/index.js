const query = require("./query");
const mutation = require("./mutation");
const user = require("./user");
const note = require("./note");
const { GraphQLDateTime} = require("graphql-iso-date");

module.exports = {
    Query: query, 
    Mutation: mutation,
    DateTime: GraphQLDateTime,
    Note:note,
    User:user
}