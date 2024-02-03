# PDF Generator
- Generate PDF documents from web pages using [Puppeteer](https://pptr.dev/).

> *In the host environment, there is no `node_modules` directory; it remains in the image (for security reasons). This is possible because the home directory of the application is superior to the `svc` directory containing the application code.*

The original `sources.list` that is in the `nodejs18.slim` image:
```
# deb http://snapshot.debian.org/archive/debian/20221004T000000Z bullseye main
deb http://deb.debian.org/debian bullseye main
# deb http://snapshot.debian.org/archive/debian-security/20221004T000000Z bullseye-security main
deb http://deb.debian.org/debian-security bullseye-security main
# deb http://snapshot.debian.org/archive/debian/20221004T000000Z bullseye-updates main
deb http://deb.debian.org/debian bullseye-updates main
```

## Resources
- Node.js, Express.js
- Google Chrome

## Endpoints
- **/** Generate PDF from any URL.
- **/tls/nosso/nemo/objednavky/***  Generate PDF from a specific structure.

## Docker Setup
- A Dockerfile is available for downloading Google Chrome.
- Use docker-compose to create the container.

## Usage
- Start the Docker container: **docker-compose up dev**
- The application runs on: **http://localhost:8013**
