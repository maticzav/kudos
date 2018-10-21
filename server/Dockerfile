FROM node:latest

WORKDIR /usr/app

COPY package.json .
RUN npm install --silent

COPY . .

EXPOSE $PORT

# RUN ["chmod", "+x", "./scripts/build.sh"]
# ENTRYPOINT [ "./scripts/build.sh" ]