# Jenkins: Automated Deployment of GitHub Repository to Webserver

To provide a link to the newest version of our project, a Jenkins job was implemented that copies the files from the repository to the webserver (test server)

## Description

## Configuration


```
Code Beispiel
```

## Copy to "productive" Apache folder:
```
sudo rm -rf brillianIDEAS/
sudo cp -r brillianideas/ brillianIDEAS/
sudo service apache2 restart
```
