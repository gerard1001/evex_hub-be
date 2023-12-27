import { Module, forwardRef } from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { OrganisationResolver } from './organisation.resolver';
import { OrganisationController } from './organisation.controller';
import { CloudinaryModule } from 'src/config/cloudinary/cloudinary.module';
import { ProfessionModule } from '../profession/profession.module';

@Module({
  imports: [
    forwardRef(() => CloudinaryModule),
    forwardRef(() => ProfessionModule),
  ],
  controllers: [OrganisationController],
  providers: [OrganisationResolver, OrganisationService],
})
export class OrganisationModule {}
