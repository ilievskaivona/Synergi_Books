import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from "fastify";
import userController from "../controllers/user.controller";
import {
  userSchema,
  usersSchema,
  userPostSchema,
  userPutSchema,
} from "../schemas/user.schema";
import {
  UserByIdParam,
  UserPostBody,
  UserQueryParam,
} from "../types/user/user.query.types";
import { userService } from "../services" 
import { Role } from "../types/user/user.model.types";


export default function (fastify: FastifyInstance): void {
  fastify.get(
    "/user/:DBUserId",
    { schema: userSchema },
    async (
      request: FastifyRequest<{ Params: UserByIdParam }>,
      reply: FastifyReply
    ): Promise<void> => {
      const user = await userController.handleGetUserById(request.params);
      if (user === null) {
        await reply.code(404).send("User not found");
      } else {
        await reply.send(user);
      }
    }
  );

    fastify.get(
    "/users",
    { schema: undefined },
    async (request: FastifyRequest<{ Querystring: UserQueryParam }>, reply: FastifyReply): Promise<void> => {
      const query: UserQueryParam = request.query;
      const page: number = query.page || 1;
      const pageSize: number = query.pageSize || 3;
      const offset = (page - 1) * pageSize;
       const endIndex = ((page - 1) * pageSize) + (pageSize*1);
      console.log("Page, pagesize, offset, end",page, pageSize, offset, endIndex)
      const users = await userService.getUsersByPage(query, offset, pageSize, endIndex);
      const totalUsers = await userController.handleGetUsers(request.query)
      if (users.length == 0) {
        await reply.code(404).send();
      } else {
        await reply.send({ users, totalUsers: totalUsers.totalUsers });
      }
    }
  );

  fastify.post(
    "/login",
    { schema: undefined },
    async (
      request: FastifyRequest<{ Body: { email: string; password: string } }>,
      reply: FastifyReply
    ): Promise<void> => {
      const response = await userController.handleLoginUser(
        request.body.email,
        request.body.password
      );
      await reply.send(response);
    }
  );

     fastify.post(
    "/user",
    { schema: userPostSchema },
    async (
      request: FastifyRequest<{ Body: UserPostBody }>,
      reply: FastifyReply
    ): Promise<void> => {
      const user = await userController.handleCreateUser(request.body);
      console.log("REQUEST:", request.body);
      console.log("USER:", user);
      if (!user) {
        await reply.code(400).send();
      } else {
        await reply.send(user);
      }
    }
  );


  fastify.put(
    "/editUser/:DBUserId",
    { schema: userPutSchema},
    async (
      request: FastifyRequest<{ Params: UserByIdParam; Body:  UserPostBody  }>,
      reply: FastifyReply
    ): Promise<void> => {
     const user = await userController.handleEditUser( 
        request.params, 
        request.body
);
        await reply.code(200).send(user);
    }
  );
  fastify.put(
    "/deactivate/:DBUserId",
    { schema: userPutSchema },
    async (
      request: FastifyRequest<{ Params: UserByIdParam; Body:  UserPostBody  }>,
      reply: FastifyReply
    ): Promise<void> => {
     const user = await userController.handleDeactivateUser( 
        request.params, 
        request.body
);
        await reply.code(200).send(user);
    }
  );
}
