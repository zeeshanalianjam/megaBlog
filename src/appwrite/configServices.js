import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Services {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, status, featuredImage, userId }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          status,
          featuredImage,
          userId,
        }
      );
    } catch (error) {
      throw new Error("Error creating post: " + error.message);
    }
  }

  async updatePost(slug, { title, content, status, featuredImage }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          status,
          featuredImage,
        }
      );
    } catch (error) {
      throw new Error("Error updating post: " + error.message);
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
      throw new Error("Error deleting post: " + error.message);
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      throw new Error("Error getting post: " + error.message);
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      throw new Error("Error getting posts: " + error.message);
    }
  }

  //   file upload service

  async uploadFile(file) {
    try {
      return await this.storage.createFile(config.appwriteBucketId, file);
    } catch (error) {}
  }

  async deleteFile(fileId) {
    try {
      return await this.storage.deleteFile(config.appwriteBucketId, fileId);
    } catch (error) {
      throw new Error("Error deleting file: " + error.message);
    }
  }

  getFilePreview(fileId) {
    try {
      return this.storage.getFilePreview(config.appwriteBucketId, fileId);
    } catch (error) {
      throw new Error("Error getting file preview: " + error.message);
    }
  }
}

const services = new Services();

export default services;
