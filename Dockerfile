FROM kthse/kth-nodejs:14.0.0

RUN apk --no-cache add python3 make

RUN ["mkdir", "-p", "/application"]
WORKDIR /application

COPY ["package.json", "package.json"]
COPY ["package-lock.json", "package-lock.json"]
RUN ["npm", "run", "docker-build"] 

COPY ["config", "config"]
COPY ["modules", "modules"]
COPY ["app.js", "app.js"]

CMD ["node", "app.js"]