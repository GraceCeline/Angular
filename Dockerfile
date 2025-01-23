FROM node:23.6.0-slim as builder

WORKDIR /ng-app

COPY package.json package-lock.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npm run build --prod

RUN ls

# Step 2: Use NGINX to serve the Angular app
FROM nginx:1.27.3

COPY default.conf /etc/nginx/conf.d

COPY --from=builder /ng-app/dist/workshop-angular/browser /usr/share/nginx/html

# Expose port 80
# EXPOSE 80
