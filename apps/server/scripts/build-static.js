import { execSync } from 'node:child_process';

execSync('pnpm --filter @restaurant/web build', { stdio: 'inherit' });
