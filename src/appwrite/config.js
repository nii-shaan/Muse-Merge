import { config } from "../config/config";
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteEndpoint)
      .setProject(config.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deletePost(slug) {
    try {
       await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;

    } catch (error) {
        console.log(error);
        return false;
    }
  }


  async getPost(slug){
    try {
        return await this.databases.getDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            slug
        )
    } catch (error) {
        console.log(error);
        return false;
    }
  }

  async getPosts(queries = [Query.equal("status","active")]){
    try {
        return this.databases.listDocuments(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            queries
        )
        
    } catch (error) {
        console.log(error);
        return false
    }
  }

  async uploadFile(file){
    try {
        return await this.storage.createFile(
            config.appwriteBucketId,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log(error);
    }
  }

  async deleteFile(fileId){
    try {
        await this.storage.deleteFile(
            config.appwriteBucketId,
            fileId,

        )
    } catch (error) {
        console.log(error);
        return false;
    }
  }

  getFilePreview(fileId){
    return this.storage.getFilePreview(
        config.appwriteBucketId,
        fileId
    )
  }

  downloadFile(fileId){
    return this.storage.getFileDownload(
        config.appwriteBucketId,
        fileId
    )
  }
}


const service = new Service();
export default service;
