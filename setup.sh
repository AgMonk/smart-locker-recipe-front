image_version=`date +%Y%m%d%H%M`;
echo $image_version;
# cd vue2docker
git pull --rebase origin master;
docker container stop smart-locker-recipe-front
docker container rm smart-locker-recipe-front
docker build -t smart-locker-recipe-front:$image_version .;
docker images;
docker run -p 18900:80 -d --name smart-locker-recipe-front smart-locker-recipe-front:$image_version;
# -v ~/docker-data/house-web/appsettings.json:/app/appsettings.json -v ~/docker-data/house-web/NLogFile/:/app/NLogFile   --restart=always
docker logs smart-locker-recipe-front;
#删除build过程中产生的镜像    #docker image prune -a -f
#docker rmi $(docker images -f "dangling=true" -q)
docker rmi $(docker images -f "dangling=true" -q)
