export class AuthError extends Error {
  constructor() {
    super();
    this.name = "AuthError";
  }
}

export class ResourceNotFoundError extends Error {
  constructor() {
    super();
    this.name = "ResourceNotFoundError";
  }
}
