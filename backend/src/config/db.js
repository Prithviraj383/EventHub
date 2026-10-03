const { Pool } = require("pg");

const getPoolConfig = () => {
  if (process.env.DATABASE_URL) {
    const databaseUrl = new URL(process.env.DATABASE_URL);
    const sslMode = databaseUrl.searchParams.get("sslmode");

    databaseUrl.searchParams.delete("sslmode");
    databaseUrl.searchParams.delete("channel_binding");

    return {
      connectionString: databaseUrl.toString(),
      ssl:
        process.env.DATABASE_SSL === "false" || sslMode === "disable"
          ? false
          : { rejectUnauthorized: false },
    };
  }

  return {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
  };
};

const pool = new Pool(getPoolConfig());

module.exports = pool;
