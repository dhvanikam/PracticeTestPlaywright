@Graph
Feature: Graph Page Validations

  Background:
    When User gives the correct DsAlgo portal URL
    When User clicks get started button for Graph after entering valid credential

  @Graphpage-links 
  Scenario Outline: User is able to navigate to "<Links>" on Graph page
    Given User is on Graph page after logged in to the portal
    When User clicks on "<Links>" in Graph page
    Then User should be navigate to "<pagename>" in Graph page

    Examples:    
    |Links                     |pagename|
    |graph                     |Graph|
    |graph-representations     |Graph Representations|
   


  @Graphpage-tryeditor 
  Scenario Outline: User is able to navigate to "<Links>" on Graph page
    Given User is on Graph page after logged in to the portal
    When User click the Try here button from "<Links>" in Graph page from "<SheetName>" of row  "<rownumber>" 
    Then User should be navigate to a page having an tryEditorr with a Run button to test in Graphpage

    Examples:        
    |Links                 | SheetName | rownumber |
    |graph                 | Graphpage |         0 |
    |graph-representations | Graphpage |         1 |
   
  @Graphpage-tryeditor-validcode 
  Scenario: User is able run valid python code in tryEditor for "<Links>" page
    Given User is on Graph page after logged in to the portal
    When User click the Try here button from "<Links>" in Graphpage page from "<SheetName>" of row  "<rownumber>"
    And User clicks the run button after entering valid python code from from "<SheetName>" of row  "<rownumber>"
    Then User should be presented with run msg from "<SheetName>" and "<rownumber>" in Graphpage

     Examples:        
    |Links                 | SheetName | rownumber |
    |graph                 | Graphpage |         0 |
    |graph-representations | Graphpage |         1 |


 @Graphpage-tryeditor-invalidcode
  Scenario: User is presented with error message for code with invalid syntax in tryEditor for "<Links>" page
     Given User is on Graph page after logged in to the portal
    When User click the Try here button from "<Links>" in Graphpage page from "<SheetName>" of row  "<rownumber>"
    And User clicks the run button after entering valid python code from from "<SheetName>" of row  "<rownumber>"
    Then User should be presented with errorrr message from sheet "<SheetName>" and row "<rownumber>" of in the popup box

     Examples:        
    |Links                 | SheetName | rownumber |
    |graph                 | Graphpage |         2 |
    |graph-representations | Graphpage |         3 |
      
     
 @PracticeQuestions_Graphpage
 Scenario Outline: The user is able to navigate to '<Links>' in  in Graphpage Page
   Given User is on Graph page after logged in to the portal
   When The user clicks on the Practice Questions button on the '<Links>'  in Graphpage
   Then The user should be directed to Practice Questions   in Graphpage which contains '<practiceLinks>'

   Examples:        
    |Links                     |practiceLinks|
    |graph                     |graph/practice|
    |graph-representations     |graph/practice|
   
