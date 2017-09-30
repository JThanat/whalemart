# 21. Acceptance Criteria

1. **System Testing**

    1.1.	Unit Tests<br>
    During the development phase, the development team must prepare for testing system and make sure that the tests are correct and comprehensive in detailed system design. If any mistake happened in the system, the test can detect the failure of the system before deploying. Moreover, it can prevent regression from happening. It also makes sure that the code structure is well-designed.<br>
    The unit tests are divided into separate classes which contain input and expected output, and each test case is trying to pass in an input into a class or method to be tested. If the actual output matches the expected output, the test will be passed. Otherwise, it will be rejected. We must comprehensively design test cases to ensure that all possible real use cases in the system are covered.


    1.2.	Integration Tests<br>
    In addition to testing each component in isolation using unit tests, we should also test how multiple components in our system is attached together; it behaves as the whole picture of how multiple functions perform. Therefore, integration tests focus on testing connection between interfaces. It also prevents the broken code from being merged into the repository.<br>
    Each interface will receive tested input and behave corresponding to the input. We must design test cases comprehensively to ensure that our integration tests can test all possible use cases in system and behave normally as we expected.


    1.3.	System Tests<br>
    We must ensure that the system met all predefined requirements before being delivered. This can be done by testing the completeness of the system manually.

    1.4.	Acceptance Tests<br>
    Before delivering the system to client, the developers must do an additional testing together with client, users, and developers. This is to make sure that the system passes completely through all acceptance tests. If the system does not meet the criteria, developers must fix the issues beforehand.

2. **Acceptance Criteria**<br>
The objective of acceptance criteria is to consider if the system can perform correctly as described in the requirements before sending to the client. Acceptance criteria is divided to three groups as follows:

    2.1 Acceptance criteria for functional requirements<br>
    This acceptance criteria tests all users in different role on how each user interacts to system and scope of functionality. List of acceptance criteria for functional requirements are shown as follows:

    <table>
      <tbody>
          <tr>
            <td width="70%">
                <strong>Criteria</strong>
            </td>
            <td>
                <strong style="text-align: center;">Pass</strong>
            </td>
            <td>
                <strong style="text-align: center;">Reject</strong>
            </td>
            <td>
                <strong style="text-align: center;">Comment</strong>
            </td>
          </tr>
          <tr>
            <td colspan="4">
                Functionality of user
            </td>
          </tr>
          <tr>
            <td width="70%">
                1. User must be able to register to our system
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                2. User must be able to login to our system
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                3. User must be able to see market landing page
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td colspan="4">
                Functionality of vendor
            </td>
          </tr>
          <tr>
            <td width="70%">
                1. Vendor must be able to reserve a booth
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                2. Vendor must be able to select payment method before transferring.
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                3. Vendor must be able to upload receipt as proof of payment
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                4. Vendor must be able to customize their profile
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                5. Vendor must be able to become a lessor
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td colspan="4">
                Functionality of lessor
            </td>
          </tr>
          <tr>
            <td width="70%">
                1. Lessor must be able to provide a bank account for receiving the money
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                2. Lessor mustbe  able to create a flea market event
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                3. Lessor must be able to approve the  booth that vendors have reserved
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                4. Lessor must be able to track payment status of each vendor in 2 periods
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                5. Lessor must be able to provide booth layout
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                6. Lessor must be able to customize his/her profile
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                Functionality of admin
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                1. Admin must be able to verify a receipt
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
      </tbody>
    </table>

    2.2 Acceptance criteria for qualitative requirements<br>
    This acceptance criteria tests the quality of the system. It can be split into five groups: usability and system environment, availability, security and privacy, maintainability, and portability.

    <table>
      <tbody>
          <tr>
            <td width="70%">
                <strong>Criteria</strong>
            </td>
            <td>
                <strong style="text-align: center;">Pass</strong>
            </td>
            <td>
                <strong style="text-align: center;">Reject</strong>
            </td>
            <td>
                <strong style="text-align: center;">Comment</strong>
            </td>
          </tr>
          <tr>
            <td colspan="4">
                Usability and system environment
            </td>
          </tr>
          <tr>
            <td width="70%">
                1. Language in user interface must be in Thai and clearly explained.
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                2. The system must support major operating systems such as Windows, MacOS and Linux
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                3. System must support all evergreen browsers
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                4. System must support various screen types and orientations, especially in mobile screen and desktop screen
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td colspan="4">
                Availability
            </td>
          </tr>
          <tr>
            <td width="70%">
                1. The system up-time availability must be greater than 99.9%
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td colspan="4">
                Security and privacy
            </td>
          </tr>
          <tr>
            <td width="70%">
                1. A user must be able to authenticate to the system using either email or Facebook
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                2. The system must log all user actions on our server
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                3. A user has the right to access his/her data
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                &nbsp;&nbsp;&nbsp;&nbsp;a. A vendor must be able to access vendor’s data
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                &nbsp;&nbsp;&nbsp;&nbsp;b. A lessor must be able to access lessor’s data and view vendor profile
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                &nbsp;&nbsp;&nbsp;&nbsp;c. An admin must be able to access vendor receipts
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                4. The database must not be accessible directly
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                5. All passwords stored in the database must be encrypted
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td colspan="4">
                Maintainability
            </td>
          </tr>
          <tr>
            <td width="70%">
                1. The system must be installed with ease
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                2. The system must be deliverable without any problem
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                Portability
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                1. The system must work perfectly in different environments without any problem
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
      </tbody>
    </table>

    2.3. Acceptance criteria for deliverables<br>
    This acceptance criteria can be divided into two subjects: 1) document deliverables, which consist of a problem statement, software requirements specification, design document, and test plan, 2) user manual deliverables.

    <table>
      <tbody>
          <tr>
            <td width="70%">
                <strong>Criteria</strong>
            </td>
            <td>
                <strong style="text-align: center;">Pass</strong>
            </td>
            <td>
                <strong style="text-align: center;">Reject</strong>
            </td>
            <td>
                <strong style="text-align: center;">Comment</strong>
            </td>
          </tr>
          <tr>
            <td colspan="4">
                Document deliverables
            </td>
          </tr>
          <tr>
            <td width="70%">
                1. All documents must be written in English
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                2. All wording in document must be consistent corresponding to the Terms and Definitions
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                3. The document must contain table of contents, list of tables, and list of figures
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td colspan="4">
                User manual deliverables
            </td>
          </tr>
          <tr>
            <td width="70%">
                1. User manual must explain all role of users
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                2. User manual must explain all functionalities
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                3. User manual must include at least one figure for each functionality
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
      </tbody>
    </table>