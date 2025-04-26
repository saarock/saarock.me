const conf = {
    appwriteUrl: String(import.meta.env.VITE_REACT_APP_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_REACT_APP_APPWRITE_PROJECT_ID),
    appwriteUserCollectionId: String(import.meta.env.VITE_REACT_APP_APPWRITE_USER_ID),
    appwriteBookedUserBlogsId: String(import.meta.env.VITE_REACT_APP_APPWRITE_BLOGS_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_REACT_APP_APPWRITE_DATABASE_ID),
};

export default conf;
