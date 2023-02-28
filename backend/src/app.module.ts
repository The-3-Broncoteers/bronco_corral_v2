import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtakController } from './hw-three/artak.controller';
import { DanielController } from './hw-three/daniel.controller';
import { LoginController } from './login.controller';

@Module({
  imports: [],
  controllers: [AppController, DanielController, ArtakController, LoginController],
  providers: [AppService],
})
export class AppModule { }
