<div align="center">
  <img src="https://tractian.com/intensivao3/logo-tractian.png" height="40px">
  <h2 align="center">Backend API</h2>
</div>
<br />

<div margin="10px 0" align="center">
    <img alt="Github Top Language" src="https://img.shields.io/github/languages/top/giovaniif/tractian-backend-challenge">
    <img alt="Github language count" src="https://img.shields.io/github/languages/count/giovaniif/tractian-backend-challenge">
    <img alt="Size" src="https://img.shields.io/github/repo-size/giovaniif/tractian-backend-challenge">
</div>

## 🚀  Techs
- Node.js
- Typescript
- Jest
- Typeorm
- MongoDB

## Design Patterns

- ### Builder
```typescript
  // usage
  ValidationBuilder.of({ value: companyName, fieldName: 'companyName' }).required().build()

  // returns
  [new RequiredStringValidator()]
```
*Usage*

In this project, the main purpose of implementing this design pattern was to reuse validation login inside the application controllers, ensuring the params I was going to need on each Request would be required</p>
Another usage of this can be seen [here](https://github.com/giovaniif/tractian-backend-challenge/blob/main/src/application/controllers/user/create.ts), where I use it to ensure the *email* field in the request is in a valid email format.

- ### Factory 
```typescript
  //usage
  const makeCreateUserUseCase = (): CreateUser => setupCreateUser(makeMongoDBCompanyRepo(), makeMongoDBUserRepo())
  const makeCreateUserController = () => new CreateUserController(makeCreateUserUseCase())

  //returns
  new CreateUserController
```
*Usage*
Factories were the most important pattern to me while building this app, them make it very use to write clean, legible, and reusable code.

The main usage of Factories in this project can be seen under *src/main/factories*. There are all the factories I've used to create the routes, controllers, usescases and repos of the app.
<br />
<br />

## Test API 

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/13698417-43fed79e-34bc-49a6-9f55-58fb3b6fb972?action=collection%2Ffork&collection-url=entityId%3D13698417-43fed79e-34bc-49a6-9f55-58fb3b6fb972%26entityType%3Dcollection%26workspaceId%3Daff8c2b4-a510-4658-afa4-aed4965bb599#?env%5BTractian%5D=W3sia2V5Ijoie3tiYXNlX3VybH19IiwidmFsdWUiOiJodHRwczovL3RyYWN0aWFuLWJhY2tlbmQtY2hhbGxlbmdlLmhlcm9rdWFwcC5jb20vYXBpIiwiZW5hYmxlZCI6dHJ1ZX1d)

Heroku <br />
https://tractian-backend-challenge.herokuapp.com/api


Made with :hearts: by Giovani Farias :wave: [Get in touch!](https://www.linkedin.com/in/giovani-farias-b97316186/)
