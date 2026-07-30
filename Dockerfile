FROM denoland/deno:latest

EXPOSE 8000
WORKDIR /app

COPY . .
RUN deno install --frozen
RUN deno task build

CMD ["task", "start"]
