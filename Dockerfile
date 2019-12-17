FROM kthse/kth-nodejs:12.0.0

COPY ["package.json", "package.json"]
RUN ["npm", "install", "--production"] 
COPY ["config", "config"]
COPY ["modules", "modules"]
COPY ["app.js", "app.js"]

CMD ["node", "app.js"]