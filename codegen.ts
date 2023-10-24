import { type CodegenConfig } from '@graphql-codegen/cli';
import { environment } from './src/lib/environment';

const SERVER_ENDPOINT: string =
  environment.STAGE === 'production'
    ? environment.SERVER_ENDPOINT
    : environment.SERVER_ENDPOINT;

const config: CodegenConfig = {
  schema: {
    [`${SERVER_ENDPOINT}/graphql`]: {
      loader: './scripts/schema-gen.js',
    }
  },
  overwrite: true,
  generates: {
    'src/graphql/__generated__/': {
      preset: 'client',
    },
    'src/graphql/__generated__/schema.graphql': {
      plugins: [
        'schema-ast'
      ]
    }
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;