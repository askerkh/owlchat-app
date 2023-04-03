const Events = {
  CONNECT: "connection",

  SERVER: {
    AUTH: "auth",
    CREATE_ROOM: "create-room",
    JOIN_ROOM: "join-room",
    SEND_MESSAGE: "send-message",
    DELETE_ROOM: "delete-room",
  },

  CLIENT: {
    SET_ROOM_ID: "set-room-id",
    MESSAGE: "message",
    GET_ALL_ROOMS: "get-all-rooms",
  },
}

export default Events
