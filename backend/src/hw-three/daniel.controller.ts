import { Controller, Get } from '@nestjs/common/decorators';

//The controller metadata defines the route. ie: localhost:3001/danielhw3
@Controller('danielhw3')
//Nestjs uses the mvc model. For this basic request i just used a controller.
export class DanielController {
  //tells nestjs the following method is used for the http GET method
  @Get()
  forHW() {
    return `Daniel's hw3`;
  }
}

//Say you wanted to run this on your computer you need to do the following (skip first 3 steps if you already completed them)
//1. from root folder do "cd backend"
//2. do "npm i"
//3. do "npm install -g @nestjs/cli"
//4. do "npm run start:dev"
