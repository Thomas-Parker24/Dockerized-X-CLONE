export const getAllPosts = {
  tags: ["Posts"],
  description: "This endpoint returns a list with all posts",
  responses: {
    200: {
      description: "limited to 10 per page",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: true,
              },
              posts: {
                type: "object",
                example: [
                  {
                    _id: "66ddd7baa97a908d71b92190",
                    createdAt: "2024-10-10T05:00:00.000Z",
                    updatedAt: "2024-08-09T17:17:11.000Z",
                    deleted: false,
                    creatorUID: "66ddccaa186d0c8487ae9f18",
                    content: "Lo modifiqué",
                    v: 0,
                  },
                  {
                    _id: "66de2e4d5be5aa760b0d517d",
                    createdAt: "2024-10-10T05:00:00.000Z",
                    updatedAt: "2024-08-10T05:00:00.000Z",
                    deleted: true,
                    creatorUID: "user456",
                    content: "Lo cree",
                    v: 0,
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
                example: "An error ocurred while trying to get posts",
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

export const getPostById = {
  tags: ["Posts"],
  description: "This endpoint returns a posts by id",
  responses: {
    200: {
      description: "Post obtained successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: true,
              },
              posts: {
                type: "object",
                example: [
                  {
                    _id: "66ddd7baa97a908d71b92190",
                    createdAt: "2024-10-10T05:00:00.000Z",
                    updatedAt: "2024-08-09T17:17:11.000Z",
                    deleted: false,
                    creatorUID: "66ddccaa186d0c8487ae9f18",
                    content: "Lo modifiqué",
                    v: 0,
                  },
                ],
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
                    value: "123",
                    msg: "Param id does not have minimal length of 20",
                    path: "id",
                    location: "params",
                  },
                ],
              },
            },
          },
        },
      },
    },
    404: {
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
                example: "Post not found",
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
                example: "An error ocurred while trying to get post by uid",
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

export const createPost = {
  tags: ["Posts"],
  description: "This Endpoint allows you to create a new post",
  operationId: "createUser",
  responses: {
    201: {
      description: "Post created successfully!",
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
                example: "Post created successfully",
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
                    msg: "Param createdAt is not a valid Date",
                    path: "createdAt",
                    location: "body",
                  },
                  {
                    type: "field",
                    msg: "Param creatorUID is empty",
                    path: "creatorUID",
                    location: "body",
                  },
                  {
                    type: "field",
                    msg: "Param createdAt is not a valid Date",
                    path: "updatedAt",
                    location: "body",
                  },
                  {
                    type: "field",
                    msg: "Param deleted is not a Boolean",
                    path: "deleted",
                    location: "body",
                  },
                  {
                    type: "field",
                    msg: "Param content is empty",
                    path: "content",
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
                example: "An error ocurred while trying to create a new post",
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

export const updatePostContent = {
  tags: ["Posts"],
  description: "This endpoint update a post content",
  responses: {
    200: {
      description: "Post updated successfully",
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
                example: "Post updated successfully",
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
                    value: "",
                    msg: "Param content is empty",
                    path: "content",
                    location: "body",
                  },
                ],
              },
            },
          },
        },
      },
    },
    404: {
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
                example: "Post not found",
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
                  "An error ocurred while trying to update a post by uid",
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

export const deletePostById = {
  tags: ["Posts"],
  description: "This endpoint delete a post by id",
  responses: {
    200: {
      description: "Post deleted successfully",
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
                example: "Post deleted successfully",
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
                    value: "123",
                    msg: "Param id does not have minimal length of 20",
                    path: "id",
                    location: "params",
                  },
                ],
              },
            },
          },
        },
      },
    },
    404: {
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
                example: "Post not found",
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
                  "An error ocurred while trying to delete a post by uid",
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

export const restorePostById = {
  tags: ["Posts"],
  description: "This endpoint restore a post by id",
  responses: {
    200: {
      description: "Post restored successfully",
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
                example: "Post restored successfully",
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
                    value: "123",
                    msg: "Param id does not have minimal length of 20",
                    path: "id",
                    location: "params",
                  },
                ],
              },
            },
          },
        },
      },
    },
    404: {
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
                example: "Post not found",
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
                  "An error ocurred while trying to restore a post by uid",
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

export const GetPostsCreatedByFollowingUsers = {
  tags: ["Posts"],
  description:
    "This endpoint returns a list with all posts created by following users",
  responses: {
    200: {
      description: "limited to 10 per page",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              ok: {
                type: "boolean",
                example: true,
              },
              length: {
                type: "int",
                example: "2",
              },
              posts: {
                type: "object",
                example: [
                  {
                    _id: "66ddd7baa97a908d71b92190",
                    createdAt: "2024-10-10T05:00:00.000Z",
                    updatedAt: "2024-08-09T17:17:11.000Z",
                    deleted: false,
                    creatorUID: "66ddccaa186d0c8487ae9f18",
                    content: "Lo modifiqué",
                    v: 0,
                  },
                  {
                    _id: "66de2e4d5be5aa760b0d517d",
                    createdAt: "2024-10-10T05:00:00.000Z",
                    updatedAt: "2024-08-10T05:00:00.000Z",
                    deleted: true,
                    creatorUID: "user456",
                    content: "Lo cree",
                    v: 0,
                  },
                ],
              },
              lastPostInfoFollowing: {
                type: "string",
                example: "66ddd7baa97a908d71b92190",
              },
              createdDateTime: {
                type: "date",
                example: "2024-10-10T05:00:00.000Z",
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
                    value: "123",
                    msg: "Param id does not have minimal length of 20",
                    path: "id",
                    location: "params",
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
                  "An error ocurred while trying to get posts created by followed users.",
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
