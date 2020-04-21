FROM node:10

RUN mkdir -p /app
WORKDIR /app

COPY public ./public
COPY components ./components
COPY pages ./pages
COPY redux ./redux
COPY styles ./styles
COPY routes ./routes
COPY db ./db
COPY utils ./utils
COPY config ./config
COPY __tests__ ./__tests__
COPY package*.json /app/
COPY yarn.lock /app/
COPY *.js /app/
RUN npm i
RUN npm run build

			
