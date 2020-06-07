#-------------------------------------------------------------------------------
# Name:        module2
# Purpose:
#
# Author:      Admin
#
# Created:     05.06.2020
# Copyright:   (c) Admin 2020
# Licence:     <your licence>
#-------------------------------------------------------------------------------

import paramiko
import os

host = 'host'
user = 'login'
pw = 'password'
port = 22

remotepath = "/opt/blog"
localpath = "/deploy/tomcat"
bin = "opt/blog/tomcat/bin"
startup = "./startup.sh"
terminal = open("terminal", "w+")

os.system("gradlew clean assemble build")

transport = paramiko.Transport((host, port))
transport.connect(username = user, password = pw)
sftp = paramiko.SFTPClient.from_transport(transport)
sftp.put(localpath,remotepath)
sftp.close()
transport.close()

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(hostname=host, username=user, password=pw, port=port)
stdin, stdout, stderr = client.exec_command("chmod -R 777 " + bin)
data = stdout.read() + stderr.read()
terminal.writelines(data + "\n\n")
stdin, stdout, stderr = client.exec_command("cd " + bin)
stdin, stdout, stderr = client.exec_command(startup)
data = stdout.read() + stderr.read()
terminal.writelines(data)

client.close()
terminal.close()



