# pull official base image
FROM node:alpine

<<<<<<< HEAD:Client1/Dockerfile
# set working directory
=======
>>>>>>> dff3e7d7f66615923cc05af7b67399a3eba0924e:client/Dockerfile
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
<<<<<<< HEAD:Client1/Dockerfile
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

# start app
=======
RUN npm install
COPY ./ ./

>>>>>>> dff3e7d7f66615923cc05af7b67399a3eba0924e:client/Dockerfile
CMD ["npm", "start"]