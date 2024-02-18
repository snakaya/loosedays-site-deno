FROM denoland/deno:latest
# The port that your application listens to.
EXPOSE 8081
WORKDIR /app
# Prefer not to run as root.
#USER deno
# These steps will be re-run upon each file change in your working directory:
COPY /app .
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache --lock=deno.lock --lock-write main.ts
CMD ["run", "-A", "main.ts"]