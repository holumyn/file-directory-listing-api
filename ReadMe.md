### Directory Listing API Server

# Installation

Install packages
`npm install`

To start server
`npm run start`

To run test
`npm run test`

To generate coverage report
`npm run coverage`

---

# Docker

Build docker image
`docker-compose build`

Run container
`docker-compose up`

# Example

Get your root directory

```
    URL: POST http://127.0.0.1:3002/get-directories

    Sample payload for different env

    Docker: {
        "rootPath": "/"
    }

    Mac: {
        "rootPath": "/Users"
    }
```
