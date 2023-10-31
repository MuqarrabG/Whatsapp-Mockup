const { Server } = require("socket.io");
const { createServer } = require("http");
const Client = require("socket.io-client");
const setupSocket  = require("../Websocket");

describe("socket.io server", () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = setupSocket(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
        done();
      });
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test("should communicate", (done) => {
    io.emit("echo", "Hello World");
    clientSocket.once("echo", (message) => {
      expect(message).toBe("Hello World");
      done();
    });
    io.on("connection", (socket) => {
      expect(socket).toBeDefined();
      done();
    });
  });

  test("should communicate with waiting for socket.io handshakes", (done) => {
    clientSocket.emit("newUser", { username: 'testUser', socketID: clientSocket.id });
    serverSocket.on("newUser", (data) => {
      expect(data).toBeDefined();
      expect(data.username).toBe('testUser');
      expect(data.socketID).toBe(clientSocket.id);
      done();
    });
  });

  test("should handle messages", (done) => {
    clientSocket.emit("message", { authorId: "11117", author: "Bob", content: "Hello Guys" });
    serverSocket.on("message", (data) => {
      expect(data).toBeDefined();
      expect(data.author).toBe('Bob');
      expect(data.authorId).toBe('11117');
      expect(data.content).toBe('Hello Guys')
      done();
    });
  });
});
