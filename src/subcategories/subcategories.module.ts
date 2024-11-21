import { Module } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { SubcategoriesController } from './subcategories.controller';
import { PrismaService } from 'src/prisma.service';
import { SubcategoriesRepository } from './subcategory.repository';

@Module({
  controllers: [SubcategoriesController],
  providers: [SubcategoriesService, SubcategoriesRepository, PrismaService],
  exports: [SubcategoriesService, SubcategoriesRepository],
})
export class SubcategoriesModule {}
