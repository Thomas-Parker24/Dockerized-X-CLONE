export const LogInWithEmailAndPassWord = {
  tags: ["LogIn"],
  description: "This Endpoint allows you to logIn with email and password",
  responses: {
    200: {
      description: "User loggedIn",
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
                example: "User loggedIn succesfully",
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
                    msg: "Param Email is obligatory.",
                    path: "email",
                    location: "body",
                  },
                  {
                    type: "field",
                    msg: "Param email is not a valid Email.",
                    path: "email",
                    location: "body",
                  },
                  {
                    type: "field",
                    msg: "Param PassWord is empty.",
                    path: "passWord",
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
                example: "Error while trying to LogIn With Email and Password",
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
export const LogInUserNameAndPassWord = {
  tags: ["LogIn"],
  description: "This Endpoint allows you to logIn with UserName and password",
  responses: {
    200: {
      description: "User loggedIn",
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
                example: "User loggedIn succesfully",
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
                    msg: "Param UserName is obligatory.",
                    path: "UserName",
                    location: "body",
                  },
                  {
                    type: "field",
                    msg: "Param PassWord is obligatory.",
                    path: "passWord",
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
                  "Error while trying to LogIn With UserName and Password",
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
export const LogOut = {
  tags: ["LogIn"],
  description:
    "This Endpoint allows you to logOut using the provided AccessToken in headers.",
  responses: {
    200: {
      description: "User loggedOut",
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
                example: "User loggedOut succesfully",
              },
            },
          },
        },
      },
    },
    401: {
      description: "Unauthorized",
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
                example: "Access Token in headers is empty.",
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
                example: "Error while trying to LogOut.",
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
