@stack
Feature: Stack Page Validations

  Background:
    When User gives the correct DsAlgo portal URL
    When User clicks get started button for stack after entering valid credential

  @stack-links 
  Scenario Outline: User is able to navigate to "<Links>" on stack page
    Given User is on "Stack" page after logged in to the portal
    When User clicks on "<Links>" in stack page
    Then User should be navigate to "<pagename>" in stack page

    Examples:    
    |Links              |pagename|
    |operations-in-stack|Operations in Stack|
    |implementation     |Implementation|
    |stack-applications |Applications|


  @stack-tryeditor 
  Scenario Outline: User is able to navigate to "<Links>" on stack page
    Given User is on "stack" page after logged in to the portal
    When User click the Try here button from "<Links>" in stack page from "<rownumber>" of sheet "<SheetName>" 
    Then User should be navigate to a page having an tryEditorr with a Run button to test

    Examples:        
    |Links              | SheetName | rownumber |
    |operations-in-stack| Stackpage |         0 |
    |implementation     | Stackpage |         1 |
    |stack-applications | Stackpage |         2 |

  @stack-tryeditor-validcode 
  Scenario: User is able run valid python code in tryEditor for "<Links>" page
    Given User is on "stack" page after logged in to the portal
    When User click the Try here button from "<Links>" in stack page from "<rownumber>" of sheet "<SheetName>"
    And User clicks the run button after entering valid python code from row "<rownumber>" of sheet "<SheetName>"
    Then User should be presented with run msg from "<SheetName>" and "<rownumber>"

    Examples:        
    |Links              | SheetName | rownumber |
    |operations-in-stack| Stackpage |         0 |
    # |implementation     | Stackpage |         1 |
    # |stack-applications | Stackpage |         2 |
     
 @stack-tryeditor-invalidcode
  Scenario: User is presented with error message for code with invalid syntax in tryEditor for "<Links>" page
    Given User is on "stack" page after logged in to the portal
    When User click the Try here button from "<Links>" in stack page from "<rownumber>" of sheet "<SheetName>"
    And User clicks the run button after entering valid python code from row "<rownumber>" of sheet "<SheetName>"
    Then User should be presented with error message from sheet "<SheetName>" and row "<rownumber>" of  in the popup box

    Examples:
      | Links                     | SheetName | rownumber |
      | operations-in-stack       | Stackpage |         3 |
      | implementation          | Stackpage |         4 |
      | stack-applications      | Stackpage |         5 |
     
 @PracticeQuestions_stack
 Scenario Outline: The user is able to navigate to '<Links>' in stack Page
   Given User is on "stack" page after logged in to the portal
   When The user clicks on the Practice Questions button on the '<Links>' page
   Then The user should be directed to Practice Questions  Page which contains '<practiceLinks>'

   Examples:        
    |Links              |practiceLinks|
    |operations-in-stack|stack/practice|
    |implementation     |stack/practice|
    |stack-applications |stack/practice|
