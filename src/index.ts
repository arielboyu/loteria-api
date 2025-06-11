import http from "http";
import app from "./server";
import { config } from "./config/config";
import swaggerDocs from "./config/swagger";

const server = http.createServer( app );

// Swagger documentation
swaggerDocs( app, config.port );

// Connection to the database


server.listen( config.port, () => {
  console.log( `Server is running on port ${config.port}` );
} );
