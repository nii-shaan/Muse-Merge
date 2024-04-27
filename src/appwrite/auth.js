import { config } from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteEndpoint)
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
     const userAccount =  await this.account.create(ID.unique(), email, password, name);

     if(userAccount){
        return true;

     }else{
        return false;
     }
    } catch (error) {
      throw error;
    }
  }

  async login({email,password}){
    try {

        return await this.account.createEmailPasswordSession(email,password)
        
    } catch (error) {
        throw error
        
    }
  }


  async getCurrentUser(){
    try {
        return await this.account.get()
        
    } catch (error) {
        throw error
    }
    return null;
  }

  async logout(){
    try {
        await this.account.deleteSessions()
    } catch (error) {
        console.log(error);
    }
  }
}

const authService = new AuthService();

export default authService;
