@QueuePage
Feature: User Launch DSAlgo application and test Queue Page
Background:
  When User gives the correct DsAlgo portal URL
  When User clicks get started for queue after entering valid credential

@queue-links
  Scenario Outline: User is able to navigate to "<Links>" on queue page
    Given User is on "Queue" page after logged in
    When User clicks on queue "<Links>"
    Then User should be navigate to "<pagename>" page

    Examples:
      | Links                     | pagename                              |
      | implementation-lists      | Implementation of Queue in Python     |
      | implementation-collections| Implementation using collections.deque|
      | Implementation-array      | Implementation using array            |
      | QueueOp                   | Queue Operations                      |

@queue-tryeditor
  Scenario Outline: User is able to navigate to "<Links>" on  queue page
    Given User is on "Queue" page after logged in
    When User click the Try here button for Queue page from "<Links>" page
    Then User should be navigate to a page having an tryEditor with a Run button to test

    Examples:
      | Links                     |
      | implementation-lists      |
      | implementation-collections|
      | Implementation-array      |
      | QueueOp                   |

@queue-tryeditor-validcode-exceldata
  Scenario: User is able run valid python code in tryEditor for "<pagename>" page
    Given User is on "Queue" page after logged in
    When User click the Try here button for Queue page from "<pagename>" page from "<rownumber>" of sheet "<SheetName>"
    And User clicks the run button after entering code in tryEditor for Queue page from row "<rownumber>" of sheet "<SheetName>"
    Then User should be presented with Run result for Queue page from row "<rownumber>" of sheet "<SheetName>"

    Examples:
      | pagename                              | SheetName       | rownumber |
      | Implementation of Queue in Python     | QueuePythonCode |         0 |
      | Implementation using collections.deque| QueuePythonCode |         1 |
      | Implementation using array            | QueuePythonCode |         2 |
      | Queue Operations                      | QueuePythonCode |         3 |

@queue-tryeditor-invalidcode-exceldata
 Scenario: User is presented with error message for code with invalid syntax in tryEditor for "<pagename>"
    Given User is on "Queue" page after logged in
    When User click the Try here button for Queue page from "<pagename>" page from "<rownumber>" of sheet "<SheetName>"
    And User clicks the run button after entering code in tryEditor for Queue page from row "<rownumber>" of sheet "<SheetName>"
    Then User should be presented with error message for Queue page from row "<rownumber>" of sheet "<SheetName>"

    Examples:
      | pagename                              | SheetName       | rownumber |
      | Implementation of Queue in Python     | QueuePythonCode |         4 |
      | Implementation using collections.deque| QueuePythonCode |         5 |
      | Implementation using array            | QueuePythonCode |         6 |
      | Queue Operations                      | QueuePythonCode |         7 |

@queue-practice-questions
  Scenario: The user is able to navigate to QueueOp page and click on Practice Questions
    Given User is on "Queue" page after logged in
    When User clicks Practice Questions after reaching to QueueOp page
    Then User is directed to Practice page

    