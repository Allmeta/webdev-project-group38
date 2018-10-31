FROM node:8.12.0
EXPOSE 5025
RUN mkdir /home/server
COPY server/ /home/server
WORKDIR /home/server
RUN yarn global add nodemon
RUN yarn install
CMD yarn start
