# Jenkins: Automated Deployment of GitHub Repository to Webserver

To provide a link to the newest version of our project, a Jenkins job was implemented that copies the files from the repository to the webserver (test server)

## Description

Jenkins helps to automate the non-human part of the software development process, with continuous integration and facilitating technical aspects of continuous deployment.  
Builds can be triggered by various means, for example by commit in a version control system, by scheduling via a cron-like mechanism and by requesting a specific build URL. It can also be triggered after the other builds in the queue have completed. Jenkins functionality can be extended with plugins.

## Configuration

The installation of Jenkins is very straight forward, in our case we used a droplet (server) by DigitalOcean with ubuntu 16.04.3 x64 running on it. Then you follow the instructions of this guide from the chapter "A time to test" on how to install it on the server: https://code.tutsplus.com/tutorials/setting-up-continuous-integration-continuous-deployment-with-jenkins--cms-21511  
Instead of using the script given in the guide you use the script in this documentation under "deploy.sh".  
  
After the setup is done you make the rest of the configurations in the web overlay. You have to make a new project and fill in the right configurations. In some cases you can have different approaches, for example the Handling of old Builds.  
The crucial configurations are:  
* GitHub-project: link to your GitHub project, for example https://github.com/MariaBiosciences/digital-learning-imbit/
* Git: 
 * Repository: link to your GitHub project
 * Branch specifier: brnach you want to be build (*/master)
* GitHub Hook trigger for GITScm polling: true
* Execute Shell: 
```
$JENKINS_HOME/deploy.sh
```

## deploy.sh

This file has to be located in the jenkins home directory, commonly /var/lib/jenkins.

```
ssh -i ~/.ssh/amazon.pem ubuntu@ec2-52-14-250-138.us-east-2.compute.amazonaws.c$  
cd /var/www/html  
sudo rm -R brillianideas  
svn checkout https://github.com/MariaBiosciences/digital-learning-imbit/trunk$  
exit 1  
EOF  
```

## GitHub polling

In order to build the project every time a commit gets pushed, you have to send a notification to Jenkins when it happens from GitHub.
GitHub enables you to add under the settings of your directory in "integrations and services" to add the webhook for Jenkins.
You have to add Jenkins(GitHub plugin) and enter the link to your webhook on you jenkins server, for example http://YOUR-IP/github-webhook/.

## Copy to "productive" Apache folder:
```
sudo rm -rf brillianIDEAS/
sudo cp -r brillianideas/ brillianIDEAS/
sudo service apache2 restart
```
