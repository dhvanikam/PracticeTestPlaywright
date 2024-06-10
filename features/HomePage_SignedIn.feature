@HomePage
Feature: Home Page Functionality with signed in status for DsAlgo Website

Background: 
    Given User gives the correct DsAlgo portal URL
    Given User clicks on SignIn link on Home Page
    When User enters valid username "tohfatul@gmail.com" and password "Array123$$" and clicks on login button

Scenario: Verify user can navigate to Data Structures-Introduction page from Home Page
    When User clicks on Get Started button of Data Structures-Introduction module
    Then User is able to go to Data Structures-Introduction page

Scenario: Verify user can navigate to Array page from Home Page
	When User clicks on Get Started button of Array module
   	Then User is able to go to Array page

Scenario: Verify user can navigate to Linked List page from Home Page
	When User clicks on Get Started button of Linked List module
   	Then User is able to go to Linked List page

Scenario: Verify user can navigate to Stack page from Home Page
	When User clicks on Get Started button of Stack module
   	Then User is able to go to Stack page


Scenario: Verify user can navigate to Queue page from Home Page
	When User clicks on Get Started button of Queue module
   	Then User is able to go to Queue page

Scenario: Verify user can navigate to Tree page from Home Page
	When User clicks on Get Started button of Tree module
   	Then User is able to go to Tree page

Scenario: Verify user can navigate to Graph page from Home Page
	When User clicks on Get Started button of Graph module
   	Then User is able to go to Graph page

################## Sign out #########################

Scenario: Verify user can see Sign out link
   	Then User can see signed out link on Home Page

Scenario: Verify user can succesfully Sign out
	When User clicks on Sign out link on Home Page
   	Then User is signed out