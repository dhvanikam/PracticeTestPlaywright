@Register
Feature: Register page Validation

  Background: User navigates to Register page from Home page
    #Given User launches the browser
    When User gives the correct DsAlgo portal URL
    When User clicks on Registration link

  @RegisterTest_LoginLink
  Scenario: To verify Login link in Register page
    When User clicks on Login link on Register Page
    Then User lands on SignIn Page

  @RegisterTest_with_validdata_JSON
  Scenario Outline: User register with valid information from JsonFile "<JsonDataSet>"
    #Given The user opens Register Page
    When User logs in with valid credentials from "<JsonDataSet>"
    Then User navigate to the home page with a message "New Account Created"

    Examples:
      | JsonDataSet |
      |           1 |
      |           2 |

  @RegisterTest_with_invalidcredentials_Excel
  Scenario Outline: To verify Register Form with invalid Credentials from "<sheetname>" and row number <rownum>
    #Given The user opens Register Page
    When user enters invalid credentials in the sheetname "<sheetname>" and row number <rownum>
    Then User verifies for the mismatch error message "password_mismatch:The two password fields didn’t match."

    Examples:
      | sheetname                   | rownum |
      | Register_InvalidCredentials |      2 |
      | Register_InvalidCredentials |      3 |
      | Register_InvalidCredentials |      4 |
      | Register_InvalidCredentials |      5 |
      | Register_InvalidCredentials |      6 |
      | Register_InvalidCredentials |      7 |
      | Register_InvalidCredentials |      8 |

  @RegisterTest_with_invalidcredentials_Excel @OnlySheetname
  Scenario Outline: To verify Register Form with invalid Credentials with all data sets from "<sheetname>"
    #Given The user opens Register Page
    When user enters invalid credentials in the sheetname "<sheetname>"
    Then User verifies for the mismatch error message "password_mismatch:The two password fields didn’t match."

    Examples:
      | sheetname                   |
      | Register_InvalidCredentials |

  @RegisterTest_Empty_Fields
  Scenario Outline: The user is presented with error message for empty fields for dataset from "<sheetname>" and row number <rownum>
    When The user clicks Register button with atleast one empty field in the sheetname "<sheetname>" and row number <rownum>
    Then It should display an error "Please fill out this field." underneath one of the fields

    Examples:
      | sheetname                   | rownum |
      | Register_InvalidCredentials |      9 |
      | Register_InvalidCredentials |     10 |
      | Register_InvalidCredentials |     11 |
      | Register_InvalidCredentials |     12 |
      | Register_InvalidCredentials |     13 |
      | Register_InvalidCredentials |     14 |
