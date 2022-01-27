import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

export default () => TypeOrmModule.forFeature([User]);
