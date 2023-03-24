import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { Lobby as LobbyModel, Message as MessageModel } from "@prisma/client";
import { Lobby } from "../../chat/chatLobby";
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaLobbyService {
  constructor(private readonly prismaService: PrismaService) {}

  async pushLobby(lobby: Lobby, owner: string) {
    try{
      console.log(`owner is `, owner);
      const channel = await this.prismaService.lobby.create({
      data: {
        ...lobby,
        adminName: owner,
      },
    });
  }
  catch (error)
  {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: "Problem to create channel"
      }, HttpStatus.BAD_REQUEST); 
  }
  }

  async pushUserToLobby(
    username: string,
    lobbyId: string
  ): Promise<LobbyModel | null> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          name: username,
        },
      });
      return await this.prismaService.lobby.update({
        where: {
          id: lobbyId,
        },
        include: { users: true },
        data: {
          users: {
            connect: {
              id: user?.id,
            },
          },
        },
      });
    } catch (e) {
      throw new Error(`Can't add user database entry for the lobby: ${e}`);
    }
  }

  async pushMessage(
    lobbyId: string,
    message: string,
    username: string
  ): Promise<{ messages: MessageModel[] }> {
    try {
      return this.prismaService.lobby.update({
        where: {
          id: lobbyId,
        },
        data: {
          messages: {
            createMany: {
              data: [{ content: message, authorName: username }],
            },
          },
        },
        select: {
          messages: true,
        },
      });
    } catch (e) {
      throw new Error(`Lobby database entry creation failed ${e}`);
    }
  }

  async lobbiesFromUserName(
    name: string
  ): Promise<{ lobbies: LobbyModel[] } | null> {
    try {
      return await this.prismaService.user.findUnique({
        where: {
          name: name,
        },
        select: {
          lobbies: true,
        },
      });
    } catch (error) {
      throw new Error(`User ${name} not found`);
    }
  }

  async fetchPublicLobbies(): Promise<LobbyModel[]> {
    return this.prismaService.lobby.findMany({
      where: {
        privacy: "public",
      },
      include: {
        messages: true,
      },
    });
  }

  async fetchPrivateLobbies(username: string): Promise<LobbyModel[]> {
    return this.prismaService.lobby.findMany({
      where: {
        privacy: "private",
        users: {
          some: { name: username },
        },
      },
      include: {
        messages: true,
      },
    });
  }

  async fetchLobbies(): Promise<LobbyModel[]> {
    return this.prismaService.lobby.findMany();
  }

  async fetchLobbyFromId(lobbyId: string): Promise<LobbyModel | null> {
    return this.prismaService.lobby.findUnique({
      where: {
        id: lobbyId,
      },
      include: {
        messages: true,
      },
    });
  }

  async fetchUsersInLobby(lobbyId: string) {
    return this.prismaService.lobby.findUnique({
      where: {
        id: lobbyId,
      },
      select: {
        users: true,
      },
    });
  }

  async fetchAdminInLobby(
    lobbyId: string
  ): Promise<{ adminName: string } | null> {
    return this.prismaService.lobby.findUnique({
      where: {
        id: lobbyId,
      },
      select: {
        adminName: true,
      },
    });
  }

  async fetchLobbbyByName(password : string, chanName: string){
    try {
       return await this.prismaService.lobby.findFirst({
        where: {
          name: chanName,
        },
      })      
    }
    catch ( error) 
  {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: "Channel doesn't exist"
      }, HttpStatus.BAD_REQUEST); 
  }  
}

  async addToBannedList(lobbyId: string, username: string) {
    return this.prismaService.lobby.update({
      where: {
        id: lobbyId,
      },
      data: {
        banned: {
          connect: {
            name: username,
          },
        },
      },
    });
  }

  async deleteLobby(id: string): Promise<LobbyModel> {
    return this.prismaService.lobby.delete({
      where: {
        id: id,
      },
    });
  }
}
