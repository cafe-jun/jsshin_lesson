import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MySqlConfigService {
  constructor(private configService: ConfigService) {}
  get db_host(): string {
    return this.configService.get<string>('mysql.host');
  }
  get db_port(): number {
    return Number(this.configService.get<string>('mysql.port'));
  }
  get db_username(): string {
    return this.configService.get<string>('mysql.username');
  }
  get db_password(): string {
    return this.configService.get<string>('mysql.password');
  }
  get db_database(): string {
    return this.configService.get<string>('mysql.database');
  }
}
