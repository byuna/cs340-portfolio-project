# CS340_PCDB
![App Screenshot](https://i.imgur.com/a5Kcphf.png)

[Link to Project](http://flip1.engr.oregonstate.edu:32147/)

## SQL Tips
After SSH into an OSU flip server, login to the SQL server by executing the following command. Replace <<LOGINNAME>LOGINNAME> with the login username.
```
mysql -u cs340_<LOGINNAME> -h classmysql.engr.oregonstate.edu -p
```
To load a sql file, navigate to the SQL source directory
```
source filename.sql;
```
To create a back up of the sql db, navigate to the SQL source directory
```
mysqldump -u cs340_<LOGINNAME> -h classmysql.engr.oregonstate.edu -p s340_<LOGINNAME> > backup_YYYY_MM_DD.sql
```


# References
[SQL Standards](https://towardsdatascience.com/10-sql-standards-to-make-your-code-more-readable-in-2021-4410dc50b909)

