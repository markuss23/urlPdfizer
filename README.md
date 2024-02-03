# PDF Generator
- genrator PDF dokumentů z webových stránek pomocí [Puppeteer](https://pptr.dev/).

> *v hostu vubec neexistuje node_modules, zustava v image (bezpecnost). Je to umozneno tim ze domovska slozka aplikace je nadrazena slozce svc s kodem aplikace*

puvodni sources.list ktery je v nodejs18.slim:  
```
# deb http://snapshot.debian.org/archive/debian/20221004T000000Z bullseye main
deb http://deb.debian.org/debian bullseye main
# deb http://snapshot.debian.org/archive/debian-security/20221004T000000Z bullseye-security main
deb http://deb.debian.org/debian-security bullseye-security main
# deb http://snapshot.debian.org/archive/debian/20221004T000000Z bullseye-updates main
deb http://deb.debian.org/debian bullseye-updates main
```

## Prostředky
- Node.js, express.js
- Google Chrome

## Endpointy
- **/** Generace PDF z jakékoliv URL.
- **/tls/nosso/nemo/objednavky/***  Generace PDF z dané struktury

## Docker Setup
- K dispozici je Dockerfile pro stažení Google Chrome
- K použití je docker-compose pro tvorbu kontejneru

## Použití
- Start Docker container: **docker-compose up dev**
- Aplikace běží na : **http://localhost:8013**
