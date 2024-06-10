@Linkedlist
Feature: Stack Page Validations

  Background:
    When User gives the correct DsAlgo portal URL
    When User clicks get started button for LinkedList after entering valid credential

  @LinkedList-links 
  Scenario Outline: User is able to navigate to "<Links>" on stack page
    Given User is on "LinkedList" page after logged in to the portal
    When User clicks on "<Links>" in LinkedList page
    Then User should be navigate to "<pagename>" in LinkedList page

    Examples:    
    |Links                          |pagename|
    |introduction                   |Introduction|
    |creating-linked-list           |Creating Linked LIst|
    |types-of-linked-list           |Types of Linked List|
    |implement-linked-list-in-python|Implement Linked List in Python|
    |traversal                      |Traversal|
    |insertion-in-linked-list       |Insertion|
    |deletion-in-linked-list        |Deletion|


  @LinkedList-tryeditor 
  Scenario Outline: User is able to navigate to "<Links>" on linkedlist page
    Given User is on "LinkedList" page after logged in to the portal
    When User click the Try here button from "<Links>" in LinkedList page from "<SheetName>" of rownumber "<rownumber>"
    Then User should be directed to a page having an tryEditorr with a Run button to test

     Examples:    
    |Links                          |     SheetName       | rownumber |                
    |introduction                   |  Linkedlistpage     |         0 |               
    |creating-linked-list           |  Linkedlistpage     |         1 |                
     |implement-linked-list-in-python|  Linkedlistpage     |         2 |       
    |types-of-linked-list           |  Linkedlistpage     |         3 |       
    |traversal                      |  Linkedlistpage     |         4 |             
    |insertion-in-linked-list       |  Linkedlistpage     |         5 |          
    |deletion-in-linked-list        |  Linkedlistpage     |         6 |           

  @LinkedList-tryeditor-validcode 
  Scenario: User is able run valid python code in tryEditor for '<Links>' page
    Given User is on "LinkedList" page after logged in to the portal
    When User click the Try here button from '<Links>' in LinkedList page from "<SheetName>" and row "<rownumber>" 
    And User clicks the run button after entering valid python code in the tryEditorr page from "<SheetName>" and row "<rownumber>"
    Then User should be presented with Run message from "<SheetName>" and row "<rownumber>"

    Examples:
      | Links                           |     SheetName       | rownumber | 
      | introduction                    | Linkedlistpage     |         0 | 
      | creating-linked-list            | Linkedlistpage     |         1 |
      | implement-linked-list-in-python | Linkedlistpage     |         2 |
      |types-of-linked-list             | Linkedlistpage     |         3 |
      |traversal                        | Linkedlistpage     |         4 |   
      |insertion-in-linked-list         | Linkedlistpage     |         5 |  
      |deletion-in-linked-list          | Linkedlistpage     |         6 | 
     
 @LinkedList-tryeditor-invalidcode
  Scenario: User is presented with error message for code with invalid syntax in tryEditor for "<Links>" page
    Given User is on "LinkedList" page after logged in to the portal
    When User click the Try here button from '<Links>' in LinkedList page from "<SheetName>" and row "<rownumber>" 
    And User clicks the run button after entering valid python code in the tryEditorr page from "<SheetName>" and row "<rownumber>"
    Then User should be presented with Errorr Message from sheet "<SheetName>" and row "<rownumber>" of  in the popup box

     Examples:
      | Links                           |     SheetName       | rownumber | 
       | introduction                    | Linkedlistpage     |         7 | 
       |creating-linked-list            | Linkedlistpage     |         8 |
      |implement-linked-list-in-python | Linkedlistpage     |         9 |
      |types-of-linked-list             | Linkedlistpage     |         10 |
      |traversal                        | Linkedlistpage     |         11 |   
      |insertion-in-linked-list         | Linkedlistpage     |         12 |  
      |deletion-in-linked-list          | Linkedlistpage     |         13 | 

 @PracticeQuestions_LinkedList
 Scenario Outline: The user is able to navigate to '<Links>' in stack Page
   Given User is on "LinkedList" page after logged in to the portal
   When The user clicks on the Practice Questions button on the '<Links>' in the LinkedList page
   Then The user should be directed to Practice Questions  Page which contains '<practiceLinks>' url

   Examples:        
    |Links                          |practiceLinks|
    |introduction                   |linked-list/practice|        
    |creating-linked-list           |linked-list/practice|     
    |implement-linked-list-in-python|linked-list/practice|
    |types-of-linked-list           |linked-list/practice|
    |traversal                      |linked-list/practice|   
    |insertion-in-linked-list       |linked-list/practice| 
    |deletion-in-linked-list        |linked-list/practice|  
