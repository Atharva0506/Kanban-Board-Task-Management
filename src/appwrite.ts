import { Client,Account,ID,Storage,Databases } from 'appwrite';

const client = new Client()
client
   .setEndpoint('https://cloud.appwrite.io/v1')
   .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECTID!);
const account = new Account(client);
const db = new Databases(client);
const storage = new Storage(client);

export {client,account,db, storage,ID}