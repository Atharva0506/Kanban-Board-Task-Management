import { Client,Account,ID,Storage,Databases } from 'appwrite';
import { constants } from 'buffer';
const client = new Client()
.setEndpoint(process.env.APPWRITE_ENDPOINT!)
.setProject(process.env.APPWRITE_PROJECTID!)

const account = new Account(client);
const db = new Databases(client);
const storage = new Storage(client);

export (client, account,db, storage,ID)