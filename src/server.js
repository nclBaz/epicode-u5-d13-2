import express from "express"
import listEndpoints from "express-list-endpoints"
import mongoose from "mongoose"
import { Server as SocketIOServer } from "socket.io"
import { createServer } from "http" // CORE MODULE

const expressServer = express()
const port = process.env.PORT || 3001

// **************************** SOCKETIO ******************
const httpServer = createServer(expressServer)
new SocketIOServer(httpServer) // this constructor is expecting to receive an HTTP-SERVER not an EXPRESS SERVER!!

// *********************** MIDDLEWARES ********************

// ************************* ENDPOINTS ********************

// *********************** ERROR HANDLERS *****************

mongoose.connect(process.env.MONGO_CONNECTION)

mongoose.connection.on("connected", () =>
  httpServer.listen(port, () => {
    // DO NOT FORGET TO LISTEN WITH HTTPSERVER HERE NOT EXPRESS SERVER!!
    console.table(listEndpoints(expressServer))
    console.log(`Server is running on port ${port}`)
  })
)
