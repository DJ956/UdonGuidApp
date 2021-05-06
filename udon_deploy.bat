cd ./UdonApp/dist/UdonApp
scp -i ~/.ssh/debian/.ssh/id_rsa -P 37956  *.* george@nukomochi.work:/var/www/html

rem cd ./assets
rem scp -i ~/.ssh/debian/.ssh/id_rsa -P 37956 *.* george@nukomochi.work:/var/www/html/assets
pause