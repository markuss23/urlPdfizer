FROM node:18-slim

# Vytvori app slozku
WORKDIR /home/node/app

# vytvorit slozku kam se mountnet handler
RUN mkdir svc
RUN mkdir node_modules

# aktualizace na nejnovejsi npm
RUN npm install -g npm@8.19.2
# Nainstaluje puppeteer a express
RUN npm install puppeteer-core express nodemon init
# RUN npm ci --only=production

#RUN cat /etc/apt/sources.list

COPY ./sources.list /etc/apt/sources.list

# instalace chrome headless
# Zdroje balicku
RUN apt-get update && apt-get install -y wget gnupg procps
#RUN apk update && apk add wget gnupg procps
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
    --no-install-recommends
RUN rm -rf /var/lib/apt/lists/*
RUN wget --quiet https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh -O /usr/sbin/wait-for-it.sh
RUN chmod +x /usr/sbin/wait-for-it.sh
