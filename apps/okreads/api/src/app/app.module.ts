import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { ApiBooksModule } from '@tmo/api/books';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Module({
  imports: [ApiBooksModule,MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule],
  controllers: [AppController]
})
export class AppModule {}
