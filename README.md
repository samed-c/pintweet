


# PinTweet Share Portal
* A web based platform for sharing twitter statuses as user based created for IDEKA.

## Description

* PinTweet is a simple web based product which lets users to view last tweets from Donald Trump, share with pinning and write own comments and opinions with a slogan.

* PinTweet has a light and user friendly interface to access information fastly from any device.

* PinTweet may contain some security bugs and lacks of functions due to limited time of development.

## Documentation
* We unfortunately do not have a complete documentation for this product.

## Features

* Standard Features
  * Mobile compatible interface
  * Membership system (Register/Login/Delete Pin)
  * Latest Tweets Pinned by Users (Accessible by guest in homepage)
  * Live Feed (Last 40 Tweets from Donald Trump's official twitter profile)
  * Pin This Tweet
  * Show pinned tweet with author's comments
* Disadvantages
  * Code based security leaks (SQL Injection)
  * Systematic security leak (Passport middleware were not used for authentication)
  * Non-Relational MongoDB database is hosted in Evennode cloud rather than AWS due to pricing policies
  * Node.js code is not structured and refactored properly according to OOP and MVC, due to limited development time.

## Installation on Windows, MacOS, Linux
* Copy shared files from GitHub as zip package into your environment
* Unzip the documents if necessary, open app.js file with a editor and change the connection string in line 35 with your own to use your particular mongo database. Don't forget to save the changes.
* Register an account over AWS Platform and fill up credit card information, be aware of over usage costs.

### Cloud Installation
* Zip the files with a utility, .rar extension is not accepted by AWS. You also need to ensure that App.js and package.json files are in root of compressed .zip file.
* Create a Node.js web server physically located onto Linux machine.
* Upload and deploy the changed .zip file over AWS Elastic Beanstalk Dashboard. You will not need to type unix code over console.

### Test Installation
* If you need to test web application, you can use AWS Cloud9 Platform (https://console.aws.amazon.com/cloud9/)
* Drag and drop the files without compressing onto Cloud9 Environment tab.
* Start a new terminal and run "node app.js" command.
* Click "Preview" to review your website.

## Have a question? Need assistance?
* Let me know and i’ll get back to you soon. Write me to samedcansin@gmail.com

## About the author
* Samed Cansin is a full-stack web developer from QC, creating responsive enterprise systems and informatics architectures for the Web. 
* Don't forget to review earlier canadian projects over portfolio website (http://www.samedcansin.com)
