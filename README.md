# Nest v7.4.0

A quick guide for NestJS | September 2020

0. CLI

   1. Installation:

   ```typescript
   // npm
   $ npm i -g @nestjs/cli
   // or yarn (CMD Admin: $ choco install yarn)
   $ yarn global add @nestjs/cli
   ```

   2. Create a project: `$ nest new task-management`
      ![coffeeTime](images/yarnTakingCoffee.jpg)

   3. Main commands by Nest CLI:

      ```typescript
      // Installation
      $ yarn install
      // Running the app: development
      $ yarn start
      // Running the app: watch mode
      $ yarn start:dev
      // Running the app: production mode
      $ yarn start:prod
      // Test: unit tests
      $ yarn test
      // Test: e2e tests
      $ yarn test:e2e
      // Test: test coverage
      $ yarn test:cov
      ```

   4. Modules:

      - They are an effective way to organize components by a closely related set of capabilities (e.g. per feature).
      - Modules are **singletons**, therefore a module can be imported by multiple other modules.
      - Each application has at least one module - the root module. That is the starting point of the application.
      - It is a good practice to have a folder per module, containing the module's components.
      - **@Module Decorator** provides metadata that Nest uses to organize the application structure, and its properties are:
        - _providers_: Array of providers to be available within the module via dependency injection;
        - _controllers_: Array of controllers to be instantiated within the module;
        - _exports_: Array of providers to export to other modules;
        - _imports_: List of modules required by this module. Any exported provider by these modules will now be available on our module via dependency injection.
      - Command to generate a module: `$ nest g module tasks`

   5. Controllers:

      - Responsible for handling incoming **requests** and returning **responses** to the client.
      - Bound to a specific **path** ('/tasks').
      - Contain **handlers**, which handle **endpoints** and **request methods** (@Get(), @Post(),...).
      - Can take advantage of **dependency injection** to consume providers within the same module.
      - Command to generate a controller: `$ nest g controller tasks --no-spec` (_--no-spec_ to not generate the spec file / unit test).

   6. Providers:

      - Can be injected into constructors if decorated as **@Injectable**, via **dependency injection**.
      - Can be a plain value, a class, sync/async factory,...
      - Must be provided to a module for the to be usable.
      - Can be exported from a module, and then be available to other modules that import it.
      - **Services** are defined as providers BUT **Not all providers are services**. They are singletons when wrapped with **@Injectable()** and provided to a module. That means, the same instance will be shared across the application, acting as a single source of truth.
      - Command to generate a provider/service: `$ nest g service tasks --no-spec`

   7. Features:

      - Getting all tasks: `http://localhost:3000/tasks`
      - Use the uuid package to generate the id:
        - https://www.npmjs.com/package/uuid
        - `$ yarn add uuid`
      - Two ways to use the @Body decorator in a POST:
        - `(@Body() body)`
        - ```typescript
          (
             @Body('title') title: string,
             @Body('description') description: string
          )
          ```

   8. DTOs:

      - An example of an HTTP Request-Response where we don't have a unified way to define the data looks like. Imagine we have to change one field, remove or add a new one:
        ![exampleHTTPRequestResponse](images/exampleRequestResponse.jpg)
      - A **Data Transfer Object** is an object that carries data between processes that can be defined using an interface or class.
      - The recommended approach is to use classes since interfaces are a part of TypeScript and therefore are not preserved post-compilation. Classes also allow us to do more.
      - Applying the DTO pattern will make it easy to maintain and refactor.

   9. Pipes:
      - Operate on the **arguments** to be processed by the route handler, just before the handler is called;
      - Can perform **data transformation** or **data validation**;
      - Can return data that will be passed on the route handler;
      - Can throw exceptions that will be handled by NestJS and parsed into an error response;
      - Can be asynchronous.
      - Use:
        - Add class-validator class-transformer: `$ yarn add class-validator class-transformer`;
        - Decorators available: https://github.com/typestack/class-validator#validation-decorators;
        - Implement the decorator to the DTO like `@IsNotEmpty()`;
        - Apply it to the Controller:
          - `@UsePipes(ValidationPipe)`
            OR
          - `@Query(ValidationPipe)`
