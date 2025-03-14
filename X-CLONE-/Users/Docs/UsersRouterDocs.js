export const UnFollowUser = {
  tags: ["Users"],
  description: "This Endpoint allows you to Unfollow an user",
  responses: {
    200: {
      description: "User unfollowed",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: true,
              },
              message: {
                type: "string",
                example: "User unfollowed successfully",
              },
            },
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "Request don't pass validations.",
              },
              errorDescription: {
                type: "Array",
                example: [
                  {
                    type: "field",
                    msg: "Param followerUid is empty.",
                    path: "followerUid",
                    location: "body",
                  },
                  {
                    type: "field",
                    msg: "Param followedUid is empty.",
                    path: "followedUid",
                    location: "body",
                  },
                ],
              },
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "An error ocurred while trying to unfollow user",
              },
              errorDescription: {
                type: "string",
                example: "An error description",
              },
            },
          },
        },
      },
    },
  },
};

export const FollowUser = {
  tags: ["Users"],
  description: "This Endpoint allows you to follow an users",
  responses: {
    200: {
      description: "User Followed",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: true,
              },
              message: {
                type: "string",
                example: "User followed successfully.",
              },
            },
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "Request don't pass validations.",
              },
              errorDescription: {
                type: "Array",
                example: [
                  {
                    type: "field",
                    msg: "Param followerUid is empty.",
                    path: "followerUid",
                    location: "body",
                  },
                  {
                    type: "field",
                    msg: "Param followedUid is empty.",
                    path: "followedUid",
                    location: "body",
                  },
                ],
              },
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "An error ocurred while trying to follow user",
              },
              errorDescription: {
                type: "string",
                example: "An error description",
              },
            },
          },
        },
      },
    },
  },
};

export const GetFollowersByUid = {
  tags: ["Users"],
  description: "This Endpoint allows you to get followers by UID",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: true,
              },
              data: {
                type: "Object",
                example: {
                  followers: [
                    {
                      uid: "66dd2623d366de01f5105657",
                      name: "Jhon Doe",
                      userName: "JhonDoe",
                      photo: "Photo 4321",
                    },
                  ],
                  lenght: 1,
                },
              },
            },
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "Request don't pass validations.",
              },
              errorDescription: {
                type: "Array",
                example: [
                  {
                    type: "field",
                    msg: "Param uid is empty.",
                    path: "uid",
                    location: "body",
                  },
                ],
              },
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "An error ocurred while trying to get followers",
              },
              errorDescription: {
                type: "string",
                example: "An error description",
              },
            },
          },
        },
      },
    },
  },
};

export const GetFollowedUsersByUid = {
  tags: ["Users"],
  description: "This Endpoint allows you to get followed users by UID",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: true,
              },
              data: {
                type: "Object",
                example: {
                  followed: [
                    {
                      uid: "66dd2623d366de01f5105657",
                      name: "Jhon Doe",
                      userName: "JhonDoe",
                      photo: "Photo 4321",
                    },
                  ],
                  lenght: 1,
                },
              },
            },
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "Request don't pass validations.",
              },
              errorDescription: {
                type: "Array",
                example: [
                  {
                    type: "field",
                    msg: "Param uid is empty.",
                    path: "uid",
                    location: "body",
                  },
                ],
              },
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "An error ocurred while trying to get followed users",
              },
              errorDescription: {
                type: "string",
                example: "An error description",
              },
            },
          },
        },
      },
    },
  },
};

export const GetUserByUserName = {
  tags: ["Users"],
  description: "This Endpoint allows you to get an user by UserName",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: true,
              },
              data: {
                type: "Object",
                example: {
                  data: {
                    uid: "66dd2623d366de01f5105657",
                    Name: "Jhon Doe",
                    Email: "JhonDoe@email.com",
                    userName: "JhonDoe",
                    CreatedAt: "2024-07-10T04:20:51.000Z",
                    LastLogIn: "2024-07-10T04:20:51.000Z",
                    isActive: false,
                    photo: "Photo 4321",
                    deleted: false,
                  },
                },
              },
            },
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "Request don't pass validations.",
              },
              errorDescription: {
                type: "Array",
                example: [
                  {
                    type: "field",
                    msg: "Param UserName is empty.",
                    path: "UserName",
                    location: "body",
                  },
                ],
              },
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example:
                  "An error ocurred while trying to get user by UserName",
              },
              errorDescription: {
                type: "string",
                example: "An error description",
              },
            },
          },
        },
      },
    },
  },
};

export const GetUserByEmail = {
  tags: ["Users"],
  description: "This Endpoint allows you to get an user by Email",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: true,
              },
              data: {
                type: "Object",
                example: {
                  data: {
                    uid: "66dd2623d366de01f5105657",
                    Name: "Jhon Doe",
                    Email: "JhonDoe@email.com",
                    userName: "JhonDoe",
                    CreatedAt: "2024-07-10T04:20:51.000Z",
                    LastLogIn: "2024-07-10T04:20:51.000Z",
                    isActive: false,
                    photo: "Photo 4321",
                    deleted: false,
                  },
                },
              },
            },
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "Request don't pass validations.",
              },
              errorDescription: {
                type: "Array",
                example: [
                  {
                    type: "field",
                    msg: "Param Email is empty.",
                    path: "Email",
                    location: "body",
                  },
                  {
                    type: "field",
                    msg: "Param email is not a valid Email.",
                    path: "Email",
                    location: "body",
                  },
                ],
              },
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "An error ocurred while trying to get user by Email",
              },
              errorDescription: {
                type: "string",
                example: "An error description",
              },
            },
          },
        },
      },
    },
  },
};

export const CreateUser = {
  tags: ["Users"],
  description: "This Endpoint allows you to create an user",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: true,
              },
              message: {
                type: "Object",
                example: "User created successfully.",
              },
            },
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "Request don't pass validations.",
              },
              errorDescription: {
                type: "Array",
                example: [
                  {
                    type: "field",
                    msg: "Param Name is empty.",
                    path: "Name",
                    location: "body",
                  },
                  {
                    type: "field",
                    msg: "Param UserName is empty.",
                    path: "UserName",
                    location: "body",
                  },
                  {
                    type: "field",
                    msg: "UserName is being using by other user.",
                    path: "UserName",
                    location: "body",
                  },
                  {
                    type: "field",
                    msg: "Param Email is empty.",
                    path: "Email",
                    location: "body",
                  },
                  {
                    type: "field",
                    msg: "Param Email is not a valid Email.",
                    path: "Email",
                    location: "body",
                  },
                  {
                    type: "field",
                    msg: "Email is being using by other user.",
                    path: "Email",
                    location: "body",
                  },
                  {
                    type: "field",
                    msg: "Param PassWord is empty.",
                    path: "PassWord",
                    location: "body",
                  },
                  {
                    type: "field",
                    msg: "Param Description is empty.",
                    path: "Description",
                    location: "body",
                  },
                  {
                    type: "field",
                    msg: "Param Photo is empty.",
                    path: "Photo",
                    location: "body",
                  },
                ],
              },
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "An error ocurred while trying to create a user",
              },
              errorDescription: {
                type: "string",
                example: "An error description",
              },
            },
          },
        },
      },
    },
  },
};

export const UpdateUser = {
  tags: ["Users"],
  description: "This Endpoint allows you to update an user",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: true,
              },
              message: {
                type: "Object",
                example: "User updated successfully.",
              },
            },
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "Request don't pass validations.",
              },
              errorDescription: {
                type: "Array",
                example: [
                  {
                    type: "field",
                    msg: "Param uid is empty.",
                    path: "uid",
                    location: "body",
                  },
                  {
                    type: "field",
                    msg: "Param Name is empty.",
                    path: "Name",
                    location: "body",
                  },
                  {
                    type: "field",
                    msg: "Param PassWord is empty.",
                    path: "PassWord",
                    location: "body",
                  },
                  {
                    type: "field",
                    msg: "Param Description is empty.",
                    path: "Description",
                    location: "body",
                  },
                  {
                    type: "field",
                    msg: "Param Photo is empty.",
                    path: "Photo",
                    location: "body",
                  },
                ],
              },
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "An error ocurred while trying to update user",
              },
              errorDescription: {
                type: "string",
                example: "An error description",
              },
            },
          },
        },
      },
    },
  },
};

export const DeleteUser = {
  tags: ["Users"],
  description: "This Endpoint allows you to delete an user",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: true,
              },
              message: {
                type: "Object",
                example: "User deleted successfully.",
              },
            },
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "Request don't pass validations.",
              },
              errorDescription: {
                type: "Array",
                example: [
                  {
                    type: "field",
                    msg: "Param uid is empty.",
                    path: "uid",
                    location: "body",
                  },
                ],
              },
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "An error ocurred while trying to delete user",
              },
              errorDescription: {
                type: "string",
                example: "An error description",
              },
            },
          },
        },
      },
    },
  },
};

export const RestoreUser = {
  tags: ["Users"],
  description: "This Endpoint allows you to restore an user",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: true,
              },
              message: {
                type: "Object",
                example: "User retored successfully.",
              },
            },
          },
        },
      },
    },
    400: {
      description: "Bad Request",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "Request don't pass validations.",
              },
              errorDescription: {
                type: "Array",
                example: [
                  {
                    type: "field",
                    msg: "Param uid is empty.",
                    path: "uid",
                    location: "body",
                  },
                ],
              },
            },
          },
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: false,
              },
              message: {
                type: "string",
                example: "An error ocurred while trying to restore user",
              },
              errorDescription: {
                type: "string",
                example: "An error description",
              },
            },
          },
        },
      },
    },
  },
};
