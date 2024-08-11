import { Account, Avatars, Client, Databases, Storage } from 'appwrite';

export const appWriteConfig = {
    url: import.meta.env.VITE_APPWRITE_URL,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databasesId: import.meta.env.VITE_APPWRITE_DATABASES_ID,
    storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    usersCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
    postsCollectionId: import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
    savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
    followsCollectionId: import.meta.env.VITE_APPWRITE_FOLLOWS_COLLECTION_ID,
}

const client = new Client();
client.setEndpoint(appWriteConfig.url);
client.setProject(appWriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const stroage = new Storage(client);
export const avatars = new Avatars(client);