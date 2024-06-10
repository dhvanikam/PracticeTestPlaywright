@logIn
Feature: Login Action

Background: 
    When User gives the correct DsAlgo portal URL
    When User clicks on SignIn link on Home Page

  @LoginTest_RegisterLink
  Scenario: To verify Register link in Sign In page
    When User clicks on Register link
    Then User lands on Registration Page

  @LoginTest_with_validdata
  Scenario Outline: User  Login with valid "<username>" and "<password>"
    When User enters valid username "<username>" and password "<password>" and clicks on login button
    Then User navigates to the home page with a message "You are logged in"

    Examples:
      | username        | password  |
      | julie@gmail.com | Sdet@1234 |

  @LoginTest_Invaliddatas
  Scenario Outline: To verify Login with invalid Credentials from "<sheetname>" and <rownum>
    When user enters invalid login credentials in the sheetname "<sheetname>" and row number <rownum> and clicks login button
    Then User verify the message "Invalid Username and Password".

    Examples:
      | sheetname                | rownum |
      | Login_InvalidCredentials |      2 |
      | Login_InvalidCredentials |      3 |
      | Login_InvalidCredentials |      4 |

  @LoginTest_Empty_Fields
  Scenario Outline: To verify SignIn with atleast one Empty fields from sheetname "<sheetname>" and row number <rownum>
    When User clicks on login button with atleast one empty field in the sheetname "<sheetname>" and row number <rownum>
    Then User verify the message "Please fill out this field." underneath one of the fields

    Examples:
      | sheetname                | rownum |
      | Login_InvalidCredentials |      5 |
      | Login_InvalidCredentials |      6 |
      | Login_InvalidCredentials |      7 |
