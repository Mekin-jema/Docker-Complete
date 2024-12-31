# # Pulling  the node environemt variable
# FROM node:latest  

# WORKDIR /app

# COPY . .
# # COPY package.json .

# RUN  npm install
# # Expose the running container to our local file like  running the node applicaion to our machine that is installed on the container
# EXPOSE 3000

# #  This code not executed when the image is created insetad when the container is created
# CMD [ "node","index.js" ]


# Re-arange the docker command for better rebuilding performance

FROM node:latest

WORKDIR /app

COPY package.json .

RUN npm install
# relate to the code 
COPY . .
# doing this arrangement ensure that, if you change in the source code
# instruction above the code . . not executed so make the builing is faster 
EXPOSE 3000

CMD [ "node","index.js" ]
