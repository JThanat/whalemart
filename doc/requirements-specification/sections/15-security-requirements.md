# 15. Security Requirements

1. The system must be secure from security breach, as it might result in sensitive data leak, loss of credibility, and costly system repair process. The system should conform to industry standard security measure, including, but not limited to:
2. Each server should only listen from expected IP and port, e.g. database server should only listen to the request from web server.
3. The website must be prevented from XSS, CSRF, and other common web vulnerabilities.
4. The web servers must be prevented from SQL injection. One possible prevention is to use ORM instead.
5. Each API endpoints must have user's access control level (ACL) working correctly.
6. All users’ password should be encrypted using industry standard algorithm.
7. All servers must be accessible only via SSH.
8. The website must use HTTPS for connecting to the users. If users request the HTTP, it should redirect to HTTPS protocol.
9. Log as much user actions as possible to any logging service.
