import { Client, Databases, Query } from "appwrite";
import conf from "../conf/conf";

class AppWriteService {
    private client = new Client();
    private databases;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);

    }


    async getBlogs(limit?: number, offSet?: number) {

        const queries = [
            Query.limit(limit || 10),
            Query.offset(offSet || 0),
        ]
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteBookedUserBlogsId,
                queries
            );
            return response;
        } catch (error) {
            throw new Error("Error getting blogs: " + error);
        }

    }
}

const appWriteService = new AppWriteService();
export default appWriteService;
