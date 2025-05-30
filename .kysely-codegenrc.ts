const config = {
  camelCase: true,
  dateParser: "timestamp",
  defaultSchemas: [],
  dialect: "postgres",
  domains: true,
  envFile: "./.env",
  excludePattern: null,
  includePattern: null,
  logLevel: "warn",
  numericParser: "string",
  outFile: "./node_modules/kysely-codegen/dist/db.d.ts",
  overrides: {},
  partitions: false,
  print: false,
  runtimeEnums: false,
  singularize: false,
  typeOnlyImports: true,
  url: "env(DATABASE_URL)",
  verify: false,
};

export default config;
