const { getIntrospectionQuery, buildClientSchema } = require('graphql');



module.exports = async () => {
  const introspectionQuery = getIntrospectionQuery();

  const response = await fetch(`${process.env.SERVER_ENDPOINT}/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json',},
    body: JSON.stringify({ query: introspectionQuery }),
  });

  const data = await response.json();
  return buildClientSchema(data.data);
};
