import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

// Swagger options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "customer-auth",
      version: "1.0.0",
      description: "API documentation for the customer-auth microservice",
    },
  },
  apis: ["./routes/userRoutes.js"],
};

// Create Swagger specification object
const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const swaggerDocs = (app, port) => {
  // Swagger page
  app.use(
    "/docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerSpec, { explorer: true })
  );

  // Documentation in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`Swagger documentation available at http://localhost:${port}/docs`);
};
