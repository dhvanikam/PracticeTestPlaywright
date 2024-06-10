@HomePage
Feature: Home Page Functionality without sign in for DsAlgo Website
Background: User has launched the browser
################ End Point scenarios #####################

Scenario: Verify User is able to land on home page
    When User gives the correct DsAlgo portal URL
    Then User lands on home page

Scenario: Verify User gets 404 Page Not Found for incorrect URL
    When User gives DsAlgo URL with misspelled baseURL
    Then User recieves status code "404" and  error message "Not Found"

################ SignIn Link scenarios #####################   

Scenario: Verify user can see Sign In Link
    And User gives the correct DsAlgo portal URL
    When User sees SignIn link 

Scenario: Verify user can navigate to Sign In Page
    And User gives the correct DsAlgo portal URL
    When User clicks on SignIn link on Home Page
    Then User lands on SignIn Page

################ Registration Link scenarios #####################  

Scenario: Verify user can see Registration link
    And User gives the correct DsAlgo portal URL
    When User sees Registration link

Scenario: Verify user can navigate to Registration Page
    And User gives the correct DsAlgo portal URL
    When User clicks on Registration link
    Then User lands on Registration Page

################ Dropdown scenarios #####################    

Scenario: Verify dropdown
    When User gives the correct DsAlgo portal URL
   	Then User sees dropdown menu with "Data Structures" option selected on home page  


Scenario: Verify dropdown has six options
    And User gives the correct DsAlgo portal URL 
    When User clicks on dropdown menu
   	Then User sees "6" options with following options:
   	|Arrays|
   	|Linked List|
   	|Stack|
   	|Queue|
   	|Tree|
   	|Graph|    


Scenario: Verify Unsuccessful access of dropdown topic modules without signing in
    And User gives the correct DsAlgo portal URL
   	And User clicks on dropdown menu
   	When User clicks on each of the dropdown menu
	Then User sees "You are not logged in" message each time


################ Module Panels scenarios #####################    

Scenario: Verify presence of seven topic panels
    And User gives the correct DsAlgo portal URL
    Then User sees "7" panels with following panel header:
   	|Data Structures-Introduction|
    |Array|
   	|Linked List|
   	|Stack|
   	|Queue|
   	|Tree|
   	|Graph|


Scenario: Verify Unsuccessful access of topic panels without signing in
    And User gives the correct DsAlgo portal URL	
    When User clicks Get Started button of every topic panels
    Then User sees "You are not logged in" error message each time
