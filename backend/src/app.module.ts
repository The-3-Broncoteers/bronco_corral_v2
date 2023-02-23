import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtakController } from './hw-three/artak.controller';
import { DanielController } from './hw-three/daniel.controller';

@Module({
  imports: [],
  controllers: [AppController, DanielController, ArtakController],
  providers: [AppService],
})
export class AppModule { }
