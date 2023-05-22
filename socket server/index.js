const io = require("socket.io")(8000, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("sendMessage", (message) => {
    socket.broadcast.emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

io.listen(8900, () => {
  console.log("Socket server listening on port 8900");
});
