# Pulling  the node environemt variable
FROM node:latest  

WORKDIR /app

COPY . .
# COPY package.json .

RUN  npm install
# Expose the running container to our local file like  running the node applicaion to our machine that is installed on the container
EXPOSE 3000

#  This code not executed when the image is created insetad when the container is created
CMD [ "node","index.js" ]


