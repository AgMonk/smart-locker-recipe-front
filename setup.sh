image_version=`date +%Y%m%d%H%M`;
echo $image_version;
# cd vue2docker
git pull --rebase origin master;

echo '停止容器运行';
docker container stop smart-locker-recipe-front
echo '删除容器';
docker container rm smart-locker-recipe-front
echo '删除镜像';
docker image rm smart-locker-recipe-front:latest
echo '打包镜像';
docker build -t smart-locker-recipe-front .
echo '查询所有镜像';
docker images;
echo '使用镜像创建容易并运行';
docker run -p 18900:80 -d --name smart-locker-recipe-front smart-locker-recipe-front:latest;
# -v ~/docker-data/house-web/appsettings.json:/app/appsettings.json -v ~/docker-data/house-web/NLogFile/:/app/NLogFile   --restart=always
docker logs smart-locker-recipe-front;
#删除build过程中产生的镜像    #docker image prune -a -f
echo '删除build过程中产生的镜像';
docker rmi $(docker images -f "dangling=true" -q)
#docker rmi $(docker images -f "dangling=true" -q)
echo 'build完成';
