#!/usr/bin/env -S node
import endContract from '../../snapshots/2f40eedb3e60f20343cabc23b1ca9ca9b8fbae5f5d01dde540658de4b2e08a9f/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';
export default class M extends Migration {
    endContractJson = endContract;
    get operations() {
        return [
            this.createSchema({ schema: 'public' }),
            this.createTable({
                schema: 'public',
                table: 'Post',
                columns: [
                    col('author', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
                    col('category', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
                    col('content', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
                    col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
                    col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
                ],
                constraints: [primaryKey(['id'])],
            }),
        ];
    }
}
MigrationCLI.run(import.meta.url, M);
//# sourceMappingURL=migration.js.map