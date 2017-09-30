# 21. Acceptance Criteria

1. **System Testing**

    1.1.	Unit Tests<br>
    During the development phase, the development team must prepare for testing system and make sure that the tests are correct and comprehensive in detailed system design. If any mistake happened in the system, the test can detect the failure of system before deploying and fix it beforehand. Moreover, it can prevent regression from happening. It also makes sure that the code structure is well-designed.<br>
    The unit tests are divided into separate class which contains input and expected output, and each test case is trying to pass input into a class or method that would like to test, if output from method is matching to expected output then the test will be passed and will be rejected on the otherwise. We must design test-cases comprehensively to verify that the test cases can test all possible real use-cases in system.

    1.2.	Integration Tests<br>
    We must test correctness of each module/class which works with another module/class. The objective of integration tests is to test how multiple components in our system is stitched together instead of testing each component in isolation; it behaves as the whole picture of how multiple functions perform. Therefore, integration tests focus on testing connection between interface. It also prevents the broken code from being merged into the repository.<br>
    Each interface will receive tested input and behave corresponding to the input. We must design test-cases comprehensively to verify that our integration tests can test all possible use-cases in system and behave normally as we expected.

    1.3.	System Tests<br>
    When we have developed system until the system met requirement as we desired. We must confident that our system met all agreement documentation in chapter 4 before deliver to customer. So, we must verify our system again. If we found failures, we can fix it beforehand. The objective of system tests is focus on function requirements and qualitative requirements in this document to test the completeness of system by manually tested by developer instead of automation.

    1.4.	Acceptance Tests<br>
    When we finished developing the system, before deliver the system to client. We must do testing together between client, user and developer to make sure that our system pass completely through all acceptance tests. If the system can’t pass the criteria. Developer must fix all mistakes in system and test it again.

2. **Acceptance Criteria**<br>
The objective of acceptance criteria is to consider that system can perform completely in agreement between client, user and developer, also consider and verify all deliverables system, and sent to client after finish testing. Acceptance criteria divide to 3 group as follows:

    2.1 Acceptance criteria for functional requirements<br>
    For acceptance criteria in first group. It is acceptance criteria for functional requirements. It must test all users in different role in each user. How each user interacts to system and scope of functionality that user can do. List of acceptance criteria for functional requirements are shown as follows

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
                1. User must able to register to our system
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                2. User must able to login to our system
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                3. User must able to see market landing page
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
                1. Vendor must able to reserve a booth
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                2. Vendor must able to select payment method before transferring.
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                3. Vendor must able to upload receipt as proof of payment
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                4. Vendor must able to customize their profile
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                5. Vendor can become to a lessor
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
                1. Lessor must able to provide a bank account for receiving the money
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                2. Lessor must able to create flea market
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                3. Lessor must able to approve booth that vendors have reserved
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                4. Lessor must able to track payment status of each vendor in 2 periods
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                5. Lessor must able to provide booth layout
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                6. Lessor must able to customize their profile
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
                1. Admin must able to verify a receipt
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
      </tbody>
    </table>

    2.2 Acceptance criteria for qualitative requirements<br>
    For acceptance criteria in second group. It is acceptance criteria for qualitative requirements for testing quality of our system. Acceptance criteria for qualitative requirements can split to 5 groups, such as usability and system environment, availability, security and privacy, maintainability and portability.

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
                1. Language in user interface must be Thai and clearly explained.
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                2. System must support main operating system such as Windows, MacOS and Linux
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                3. System must support completely in newest browser
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                4. System must support various screen type and orientation especially mobile screen and desktop screen
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
                1. The available time of system must be 99% of whole time that system is still open
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                2. Mean time between failure of system must be at least 5 years
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
                1. System must use user&rsquo;s username and password to authenticate to our system
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                2. System must save all logs history on our server
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                3. User has right to access their data
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                &nbsp;&nbsp;&nbsp;&nbsp;a. Vendor must able to access vendors&rsquo; data
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                &nbsp;&nbsp;&nbsp;&nbsp;b. Lessor must able to access lessors&rsquo; data and view vendor profile
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                &nbsp;&nbsp;&nbsp;&nbsp;c. Admin must able to access vendor receipt
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                4. All data must not able to be edited from outside server
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                5. Password must be encrypted inside database
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
                1. System must easy to installation
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                2. System must deliverable without any problem
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
                1. System must work perfectly in different environment without any problem
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
      </tbody>
    </table>


    2.3. Acceptance criteria for deliverables<br>
    For acceptance criteria in third group. It can divide to 2 subjects, first subject is document deliverables which consist of problem statement, software requirements specification, design document and test plan, another subject is user manual deliverables.


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
                1. All documents are written in English
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                2. All words in document must consistence by definition
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                3. Document must contain table of contents, list of tables and list of figures
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
                1. User manual must explain all role of user
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                1. User manual must explain all functionality
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="70%">
                2. User manual must include at least one figure for each functionality
            </td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
      </tbody>
    </table>