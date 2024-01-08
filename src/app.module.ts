import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { EventModule } from './modules/event/event.module';
import { OrganisationModule } from './modules/organisation/organisation.module';
import { ProfessionModule } from './modules/profession/profession.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { Neo4jModule } from './database/neo4j/neo4j.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CeremonyModule } from './modules/ceremony/ceremony.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req, res }) => ({ req, res }),
    }),
    Neo4jModule.forRootAsync(),
    EventModule,
    OrganisationModule,
    ProfessionModule,
    UserModule,
    AuthModule,
    CeremonyModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
