import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '../constants/pg.constants';

export const IsPublic = () => SetMetadata(IS_PUBLIC_KEY, true);
