// Config File to get the information of database if Development / Production

const dbConfig = (env) => {
  if (env === 'production') {
    return {
      password: process.env.PRODUCTION_DB_PASSWORD,
      user: process.env.PRODUCTION_DB_USERNAME,
      host: process.env.PRODUCTION_DB_HOST,
      database: process.env.PRODUCTION_DB_NAME,
      port: process.env.PRODUCTION_DB_PORT,
    };
  }
  if (env === 'development') {
    return {
      user: process.env.dbUser,
      password: process.env.dbPassword,
      database: process.env.dbName,
      host: 'localhost',
    };
  }
  throw new Error(
    'specify enviroment, only "test" and "development" is available now',
  );
};
module.exports = {
  DB_CONFIG: dbConfig(process.env.NODE_ENV),
};
