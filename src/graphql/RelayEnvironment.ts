import * as RelayRuntime from 'relay-runtime';
import type { RequestParameters, Variables } from 'relay-runtime';
import { Environment, Network, Observable, RecordSource, Store } from 'relay-runtime';
import { environment } from '../lib/environment';


RelayRuntime.RelayFeatureFlags.ENABLE_RELAY_RESOLVERS = true;

const SERVER_ENDPOINT =
  environment.STAGE === 'production'
    ? environment.SERVER_ENDPOINT
    : environment.SERVER_ENDPOINT;

function fetchRelay(params: RequestParameters, variables: Variables) {

  const response = fetch(`${SERVER_ENDPOINT}/graphql`, {
    method: 'POST',
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
    headers: {
      'content-type': 'application/json',
    },
  });

  return Observable.from(response.then((data) => data.json()));
}

const RelayEnvironment = new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
});

export default RelayEnvironment;