# 18. Reliability
**1. User Input’s Error**

An error in user input leads to data inconsistency, which can be the source of system crash. To prevent this kind of error, we must ensure data consistency in the database by doing a request data validation and consistency checking across the database on data edit (including data insertion, data editing,and data removal) on the web server.

For better user experience, we have to validate a data in the client side as well. This can be in many forms, including, but not limited to a form validation help text, an action-required dialog box, or an alert. It can also be a combination of those forms.

**2. Web Server Up-time**

We target for at least 99.9% up-time for the web server, although not guaranteed. To reduce human intervention, the system may require high-availability setup on the web servers database servers, and load balancers.

**3. Database Corruption**

Database corruption can occur in case of database server failure, web server malfunction, or severe security breach. If database corruption happens, database admin should follow the database recovery procedure, including recover the database from the time-delayed backup, preferable within 24 hours after event acknowledgement.

To prevent database corruption from happening in the first place, we must do a data replication across servers, which takes time to set up. The solution that might be more appealing is to rely on hosted cloud database service instead, which should have built-in solution for database corruption handling. The service should also provide built-in replication, which results in higher reliability.

**4 Security Breach**

In case of severe security breach, an admin must shut down the system first, find the cause of vulnerability and patch it, find the attacked target and act appropriately, and then turn the system back on. If there is no sign of an attack, however, the system can continue running, but the vulnerability should be patched within a reasonable amount of time.

