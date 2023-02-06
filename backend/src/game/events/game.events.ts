export enum ClientEvents {
  PaddlePosition = "client.paddlePosition",
  CreateLobby = 'client.createLobby',
}

export enum ServerEvents {
  BallPosition = "server.ballPosition",
  LobbyCreated = 'server.lobbyCreated',
  GameMessage = 'server.gameCreated'
}
