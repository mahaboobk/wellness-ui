# Stage 1: Build the Vite app using Node
FROM node AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the Vite build using 'serve'
FROM node

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 5713

CMD ["serve", "-s", "dist", "-l", "5713"]