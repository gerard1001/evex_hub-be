import { Module, forwardRef } from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { OrganisationResolver } from './organisation.resolver';
import { OrganisationController } from './organisation.controller';
import { CloudinaryModule } from 'src/config/cloudinary/cloudinary.module';

@Module({
  imports: [forwardRef(() => CloudinaryModule)],
  controllers: [OrganisationController],
  providers: [OrganisationResolver, OrganisationService],
})
export class OrganisationModule {}
