const {HomePage} = require('./HomePage.spec');
const {ArrayPage} = require('./ArrayPage.spec');
const {SignInPage} = require('./SignInPage.spec');
const{RegisterPage} = require('./RegisterPage.spec');
const { QueuePage } = require('./QueuePage.spec');
const { TreePage } = require('./TreePage.spec');
const { DataStructuresIntroductionPage } = require('./DataStructuresIntroductionPage.spec');

class POManager {
    constructor(page) {
        
        this.page = page;
        this.homePage = new HomePage(this.page,this);
        this.signInPage = new SignInPage(this.page,this);
        this.registerPage = new RegisterPage(this.page,this);      
        this.stackPage=null;
        this.linkedListPage=null; 
        this.graphPage=null;
        this.arrayPage = new ArrayPage(this.page,this);
        this.queuePage = new QueuePage(this.page, this);
        this.treePage = new TreePage(this.page,this);
        this.datastructurePage = new DataStructuresIntroductionPage(this.page,this);
    }

    getHomePage() {
        return this.homePage;
        
    }

    getSignInPage() {
        return this.signInPage;
    }

    getRegisterPage() {
        return this.registerPage;
    }

     getStackPage()
    {    if(!this.stackPage)
        {
            const {StackPage}=require('./StackPage.spec'); 
            this.stackPage=new StackPage(this.page,this);
        }        
        return this.stackPage;
    }


    getQueuePage() {
        return this.queuePage;
    }

    getLinkedListPage()
    {
        if(!this.linkedListPage)
        {
            const {LinkedListPage}=require('./LinkedListPage.spec'); 
            this.linkedListPage=new LinkedListPage(this.page,this);
        }        
        return this.linkedListPage;
    }

    getGraphPage()
    {
        if(!this.graphPage)
        {
            const {GraphPage}=require('./GraphPage.spec'); 
            this.graphPage=new GraphPage(this.page,this);
        }        
        return this.graphPage;
    }

 

    getArrayPage(){
        return this.arrayPage;
    }
    getTreePage() {
        return this.treePage;
    }

    getDataStructurePage(){
        return this.datastructurePage;
    }

}
module.exports = {POManager};