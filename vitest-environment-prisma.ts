import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process';
import { randomUUID } from 'crypto';
import type { Environment } from 'vitest'

const prisma = new PrismaClient()

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) throw new Error('Please provide a DATABASE_URL env variable.');
  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set('schema', schema);
  return url.toString();
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  setup() {
    const schema = randomUUID();
    const databaseURL = generateDatabaseURL(schema);
    process.env.DATABASE_URL = databaseURL;
    process.env.NODE_ENV = "test";
    execSync('npx prisma migrate deploy');
    return {
      async teardown() {
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
        await prisma.$disconnect();
      }
    }
  }
}