# Hono Server with Drizzle ORM and PGLite (WASM PostgreSQL)

This repository contains a server application built using the [Hono](https://hono.dev/) framework, [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm), and [PGLite](https://github.com/electric-sql/pglite) (a WebAssembly build of PostgreSQL). The server is bundled into a single executable binary using [pkg](https://github.com/vercel/pkg).

## Architecture Overview

1. **Hono Framework**: A lightweight and fast web framework for Node.js, designed for creating APIs and web applications.
2. **Drizzle ORM**: A TypeScript-first ORM for building type-safe SQL queries.
3. **PGLite**: A WebAssembly build of PostgreSQL, allowing you to run a lightweight database in a Node.js environment.
4. **pkg**: A tool for packaging Node.js projects into standalone executables.
5. **Prisma (Optional)**: using Prisma for database migrations and schema management.

## Architecture Design

### Design Overview

The architecture leverages a combination of modern web frameworks, ORMs, and lightweight database solutions to create a robust and efficient server application. Here's a detailed breakdown:

1. **Hono Framework**:
    
    - **Role**: Acts as the web server, handling HTTP requests and responses.
    - **Benefits**: Lightweight, fast, and easy to use, making it ideal for building APIs.
2. **Drizzle ORM**:
    
    - **Role**: Manages database interactions, providing a type-safe way to write SQL queries.
    - **Benefits**: Ensures type safety and reduces the risk of SQL injection attacks.
3. **PGLite (WASM PostgreSQL)**:
    
    - **Role**: Acts as the database engine, running as a WebAssembly module within the Node.js environment.
    - **Benefits**: Lightweight, portable, and does not require a separate database server, making it ideal for embedded applications.
4. **pkg**:
    
    - **Role**: Bundles the Node.js application into a standalone executable.
    - **Benefits**: Simplifies deployment and distribution by creating a single binary that can run on different platforms without requiring Node.js to be installed on the target machine.

### Pros

1. **Portability**: The use of PGLite and `pkg` makes the application highly portable, as it can be run on any platform (Linux, Windows, macOS) without additional dependencies.
2. **Simplicity**: The architecture is straightforward, with clear separation between the web framework, ORM, and database.
3. **Performance**: Hono and PGLite are designed to be lightweight and fast, providing efficient handling of requests and database operations.
4. **Type Safety**: Drizzle ORM ensures type safety, reducing the risk of runtime errors and improving maintainability.

## Creating a Single Executable from a Node.js Server

### Using `pkg`

`pkg` is a tool that packages Node.js projects into standalone executables for Windows, macOS, and Linux. This allows you to distribute a single binary that can be run on different platforms without requiring Node.js to be installed.

#### Tauri Sidecar

[Tauri](https://tauri.app/) is a framework for building tiny, fast binaries for all major desktop platforms. You can integrate the standalone executable created with `pkg` into a Tauri application using the Tauri sidecar feature. Tauri sidecar allows you to bundle and ship additional executables with your Tauri application. This is useful for including background services, helper processes, or other binaries that your application depends on. (Note: your bundled server increase final build size of Tauri app)

## Setup and Installation

### Prerequisites

- Node.js (v20.18.0 or higher)
- pnpm (or npm)

### Steps

1. **Clone the Repository**
    
    ```bash
    git clone https://github.com/Mj23978/hono-pglite-pkg.git
    cd hono-pglite-pkg
    ```
    
2. **Install Dependencies**
    
    ```bash
    pnpm install
    ```
    
3. **Generating Drizzle Database Schema from prisma**
   Run the following command to generate the Drizzle database schema from your Prisma schema file (`prisma/schema.prisma`).

    ```bash
    pnpm db:generate
    ```
4. **Create Migrations**
    Run the following command to create migrations based on your Drizzle schema and Drizzle Configuration (`drizzle.config.ts`).
    
    ```bash
    pnpm db:push
    ```
5. **Bundle the Server**
    The server is built using `tsup`, which generates CommonJS code from TypeScript. bundles ships postgres.data and postgres.wasm from pglite node_modules into executable and also includes postgres migrations.

    ```bash
    pnpm bundle
    ```
6. **Build the Server**
    
    The server is built using `tsup`, which generates CommonJS code from TypeScript.
    
    ```bash
    pnpm build
    ```
    
7. **Bundle the Server into a Single Binary**
    
    Use `pkg` to package the server into a standalone executable.
    
    ```bash
    pnpm run package
    ```
    
    This will generate executables for different platforms (e.g., Linux, Windows, macOS) in the `dist` directory.
    

## Running the Server

### Using the Bundled Binary

1. **Navigate to the `bin` Directory**
    
    ```bash
    cd bin
    ```
    
2. **Run the Executable**
    
    - **Linux/MacOS**
        
        ```bash
        ./your-server-name-linux
        ```
        
    - **Windows**
        
        ```bash
        your-server-name-win.exe
        ```
        

### Using Node.js

1. **Start the Server**
    
    ```bash
    pnpm start
    ```

## License

This project is licensed under the MIT License - see the [LICENSE](https://huggingface.co/chat/conversation/LICENSE) file for details.

---

Feel free to customize the `README.md` further to include any additional details specific to your project!