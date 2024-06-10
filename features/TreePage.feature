@TreePage
Feature: User Launch DSAlgo application and test Tree Page

Background:
  When User gives the correct DsAlgo portal URL
  When User clicks get started for tree after entering valid credential

@tree-links
  Scenario Outline: User is able to navigate to "<Links>" on tree page
    Given User is on "Tree" page after logged in
    When User clicks on tree "<Links>"
    Then User should be navigate to "<pagename>" page

    Examples:
      | Links                       | pagename                    |
      |  overview-of-trees          | Overview of Trees           |
      |  terminologies              | Terminologies               |
      | types-of-trees              | Types of Trees              |
      | tree-traversals             | Tree Traversals             |
      | traversals-illustration     | Traversals-Illustration     |
      | binary-trees                | Binary Trees                |
      | types-of-binary-trees       | Types of Binary Trees       |
      | implementation-in-python    | Implementation in Python    |
      | binary-tree-traversals      | Binary Tree Traversals      |
      | implementation-of-binary-trees| Implementation of Binary Trees|
      | applications-of-binary-trees| Applications of Binary trees|
      | binary-search-trees         | Binary Search Trees         |
      | implementation-of-bst       | Implementation Of BST       |

@tree-tryeditor
  Scenario Outline: User is able to navigate to "<Links>" on  queue page
    Given User is on "Tree" page after logged in
    When User click the Try here button for Tree page from "<Links>" page
    Then User should be navigate to a page having an tryEditor with a Run button to test

    Examples:
      | Links                       |
      |  overview-of-trees          | 
      |  terminologies              | 
      | types-of-trees              | 
      | tree-traversals             | 
      | traversals-illustration     | 
      | binary-trees                | 
      | types-of-binary-trees       |
      | implementation-in-python    | 
      | binary-tree-traversals      |
      | implementation-of-binary-trees| 
      | applications-of-binary-trees|  
      | binary-search-trees         | 
      | implementation-of-bst       | 

@tree-tryeditor-validcode-exceldata
  Scenario: User is able run valid python code in tryEditor for "<pagename>" page
    Given User is on "Tree" page after logged in
    When User click the Try here button for Tree page from "<pagename>" page from "<rownumber>" of sheet "<SheetName>"
    And User clicks the run button after entering code in tryEditor for Tree page from row "<rownumber>" of sheet "<SheetName>"
    Then User should be presented with Run result for Tree page from row "<rownumber>" of sheet "<SheetName>"

    Examples:
      | pagename                      | SheetName      | rownumber |
      | Overview of Trees             | TreePythonCode |         0 |
      | Terminologies                 | TreePythonCode |         1 |
      | Types of Trees                | TreePythonCode |         2 |
      | Tree Traversals               | TreePythonCode |         3 |
      | Traversals-Illustration       | TreePythonCode |         4 |
      | Binary Trees                  | TreePythonCode |         5 |
      | Types of Binary Trees         | TreePythonCode |         6 |
      | Implementation in Python      | TreePythonCode |         7 |
      | Binary Tree Traversals        | TreePythonCode |         8 |
      | Implementation of Binary Trees| TreePythonCode |         9 |
      | Applications of Binary trees  | TreePythonCode |        10 |
      | Binary Search Trees           | TreePythonCode |        11 |
      | Implementation Of BST         | TreePythonCode |        12 |

@tree-tryeditor-validcode
  Scenario: User is able run valid python code in tryEditor for "<Links>" page
    Given User is on "Tree" page after logged in
    When User click the Try here button for Tree page from "<Links>" page
    And User clicks the run button after entering "<valid python code>" in tryEditor for Tree page
    Then User should be presented with Run result as "<result>" in Tree page

    Examples:
      | Links                       | valid python code | result |
      |  overview-of-trees          | print('hello')    | hello  |
      |  terminologies              | print('hello')    | hello  |
      | types-of-trees              | print('hello')    | hello  |
      | tree-traversals             | print('hello')    | hello  |
      | traversals-illustration     | print('hello')    | hello  |
      | binary-trees                | print('hello')    | hello  |
      | types-of-binary-trees       | print('hello')    | hello  |
      | implementation-in-python    | print('hello')    | hello  |
      | binary-tree-traversals      | print('hello')    | hello  |
      | implementation-of-binary-trees|print('hello')    | hello  |
      | applications-of-binary-trees| print('hello')    | hello  |
      | binary-search-trees         | print('hello')    | hello  |
      | implementation-of-bst       | print('hello')    | hello  |

@tree-tryeditor-invalidcode-exceldata
 Scenario: User is presented with error message for code with invalid syntax in tryEditor for "<pagename>"
    Given User is on "Tree" page after logged in
    When User click the Try here button for Tree page from "<pagename>" page from "<rownumber>" of sheet "<SheetName>"
    And User clicks the run button after entering code in tryEditor for Tree page from row "<rownumber>" of sheet "<SheetName>"
    Then User should be presented with error message for Tree page from row "<rownumber>" of sheet "<SheetName>"

    Examples:
      | pagename                      | SheetName       | rownumber |
      | Overview of Trees             | TreePythonCode |         13 |
      | Terminologies                 | TreePythonCode |         14 |
      | Types of Trees                | TreePythonCode |         15 |
      | Tree Traversals               | TreePythonCode |         16 |
      | Traversals-Illustration       | TreePythonCode |         17 |
      | Binary Trees                  | TreePythonCode |         18 |
      | Types of Binary Trees         | TreePythonCode |         19 |
      | Implementation in Python      | TreePythonCode |         20 |
      | Binary Tree Traversals        | TreePythonCode |         21 |
      | Implementation of Binary Trees| TreePythonCode |         22 |
      | Applications of Binary trees  | TreePythonCode |         23 |
      | Binary Search Trees           | TreePythonCode |         24 |
      | Implementation Of BST         | TreePythonCode |         25 |

@tree-practice-questions
  Scenario: The user is able to navigate to QueueOp page and click on Practice Questions
    Given User is on "Tree" page after logged in
    When User clicks Practice Questions after reaching to Implementation of BST Page
    Then User is directed to Practice page


