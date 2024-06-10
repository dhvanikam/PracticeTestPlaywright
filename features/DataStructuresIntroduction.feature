@data-structure
Feature: Data Structures-Introduction feature Validations

  Background:
    When User gives the correct DsAlgo portal URL
    When User clicks get started for data structure after entering valid credential

  @data-structure-links-navigation
  Scenario Outline: User is able to navigate to "<Links>" from Data Structures page
    Given User is on Data Structures page after logged in
    When User clicks on "<Links>" for Data Structures page
    Then User should be navigate to "<pagename>" page Data Structures page

    Examples:
      | Links           | pagename        |
      | time-complexity | Time Complexity |

  @data-structure-practiceQuetionsLink-navigation
  Scenario Outline: User is able to navigate to a page having an Practice Questions from "<Links>"
    Given User is on Data Structures page after logged in
    When User click the practice question button from "<Links>" page for Data Structures page
    Then User should be navigate to a page having "Practice Questions" for Data Structures page

    Examples:
      | Links           |
      | time-complexity |

  @data-structure-tryeditor-navigation
  Scenario Outline: The user is able to navigate to a page having an tryEditor from "<pagename>"
    Given User is on "Data Structures" page after logged in
    When User click the Try here button from "<pagename>" page from "<rownumber>" of sheet "<SheetName>" for Data Structures page
    Then User should be navigate to a page having an tryEditor with a Run button to test for Data Structures page

    Examples:
      | pagename             | SheetName    | rownumber |
      | Time Complexity page | DSPythonCode |         0 |

  @data-structure-tryeditor-validcode
  Scenario: User is able run valid python code in tryEditor for "<pagename>" Data Structures page
    Given User is on Data Structures page after logged in
    When User click the Try here button from "<pagename>" page from "<rownumber>" of sheet "<SheetName>" for Data Structures page
    And User clicks the run button after entering code in tryEditor from row "<rownumber>" of sheet "<SheetName>" for Data Structures page
    Then User should be presented with Run result from row "<rownumber>" of sheet "<SheetName>" for Data Structures page

    Examples:
      | pagename             | SheetName    | rownumber |
      | Time Complexity page | DSPythonCode |         0 |

  @data-structure-tryeditor-invalidcode
  Scenario: User is presented with error message for code with invalid syntax in tryEditor for "<pagename>" for Data Structures page
    Given User is on "Data Structures" page after logged in
    When User click the Try here button from "<pagename>" page from "<rownumber>" of sheet "<SheetName>" for Data Structures page
    And User clicks the run button after entering code in tryEditor from row "<rownumber>" of sheet "<SheetName>" for Data Structures page
    Then User should be presented with error message from row "<rownumber>" of sheet "<SheetName>" for Data Structures page

    Examples:
      | pagename             | SheetName    | rownumber |
      | Time Complexity page | DSPythonCode |         1 |
