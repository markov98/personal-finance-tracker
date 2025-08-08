# Stage 1: Build the Angular app
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Stage 2: Serve with Node.js and 'serve'
FROM node:18-alpine

WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist/frontend/browser /app/dist

EXPOSE 80

CMD ["serve", "-s", "dist", "-l", "80"]