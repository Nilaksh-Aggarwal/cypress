import * as schema from'../../../migrations/schema';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';



if(!process.env.DATABASE_URL){
    console.log('no database URL');
}
const client = postgres(process.env.DATABASE_URL as string,{max:1})
const db=drizzle(client,{schema})
const migrateDb=async()=>{
    try {
        console.log('Migrating client');
        await migrate(db,{migrationsFolder:'migrations'})
        console.log('Successfully Migrated')
    } catch (error) {
        console.log(error)
        console.log('Error Migrating Client')
    }
}
migrateDb()
export default db;