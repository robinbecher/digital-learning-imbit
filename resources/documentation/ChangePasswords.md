# How to Change System and Application Passwords 

## MySQL Database

The database has several users: root, brillianicm, brilliancrm, Wiki.
The procedure for resetting a password is similar to root:

### MySQL root Password

* When you know the password: 
```
mysql-u root -p
ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass';
```


* When you need to set a new root password:
```
sudo service mysql stop
sudo mkdir /var/run/mysqld
sudo chown mysql: /var/run/mysqld
sudo mysqld_safe --skip-grant-tables --skip-networking &
```
Open new SSH shell:
```
mysql -u root mysql
UPDATE mysql.user SET authentication_string='NewPassword' WHERE user='root@localhost';
sudo mysqladmin -S /var/run/mysqld/mysqld.sock shutdown
sudo service mysql start
```
This procedure restarts the SQL server in a specific mode, where you can change the logon credentials. Afterwards you stop & start the server again and the new password is set.


### context.xml files for Tomcat-MySQL-Connector

* The SQL-Database users are defined within this file including username (brillianxxx) and password (imbit15):
```
    <Resource name="jdbc/security" auth="Container"
        username="brilliancrm" password="imbit15"
        driverClassName="com.mysql.jdbc.Driver"
        url="jdbc:mysql://localhost:3306/cake?autoReconnect=true"
        logAbandoned="true" removeAbandoned="true"
        type="javax.sql.DataSource" factory="org.apache.tomcat.jdbc.pool.DataSourceFactory"
        testWhileIdle="true"
        validationQuery="SELECT 1"
    />
```
The context.xml files of the Tomcat webapps folder (find in $CATALINA_HOME/webapps/brillianXXX/META-INF/context.xml) define the connection to the database via the JDBC-Driver for MySQL Connectors. The URL "jdbc:mysql://localhost:3306/cake?autoReconnect=true" describes the connection to localhost (the same server), port 3306 is the standard SQL connector port, cake is the database name of the brillianCRM webapp.

## Linux Passwords
* How to change a Ubuntu password: there are several users in the Ubuntu installation, such as root, tomcat, www, ...
```
sudo passwd USERNAME
```

## Serious Games Passwords
There are also several passwords to consider:
* Password Hashing and Salting in the database: The passwords are saved "securely" in the database in non-cleartext by using a hash and a salt. The DB entry for the password "Hbru" is for example:		$shiro1$SHA-256$500000$DhdIuSNhEvqrvOmyfIfcuw==$AzmajwrcT/UxrYO50+zkTIFxjyazOhiiAY1xsSyPxBI=
* The hash is set in the web.xml files of the webapps ($CATALINA_HOME/webapps/brillianXXX/WEB-INF/web.xml)
* You can "reset" the password in the database "dirtyly" by executing: When user_id is 19 for example:
```
UPDATE user SET PASSWORD= '$shiro1$SHA-256$500000$iZM+IX1PRhes5AnrcVcL9w==$L8cCaxLVrF4s0itqPgK1SKKQQod1s52KXvDsSGlzSWQ=' WHERE USER_ID = 19;
```
* Student/Professor/Admin passwords: The standard password in the database is "Hbru". This needs to be changed after final deployment! Best is changing by using the webapp function Change Password.
* See Mail-Password (required for sending mails)


## Mail-Password 

* Change the password for the mailbox that is used for the send mail functions: in /opt/tomcat/webapps/brillianxxx/WEB-INF/web.xml
```
        <context-param>
                <description>Password for Mail-User</description>
                <param-name>mailpw</param-name>
                <param-value>imbit15</param-value>
        </context-param>
```
TIP: change the password to the actual one in the web.xml files before compiling/ building the .WAR file during the deployment!!!

## Tomcat password for manager GUI

Edit the file tomcat-user.xml in $CATALINA_HOME/conf/tomcat-user.xml and change the password in clear text here:
```	<role rolename="manager-gui"/>
	<role rolename="manager-script"/>
	<user username="tomcat" password="password" roles="manager-gui,manager-script"/>
```
