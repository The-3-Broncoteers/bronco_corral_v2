import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DanielController } from './hw-three/daniel.controller';

@Module({
  imports: [],
  controllers: [AppController, DanielController],
  providers: [AppService],
})
export class AppModule {}
