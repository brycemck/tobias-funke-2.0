# tobias funkë - actor, therapist, discord bot
I just found out that my cellular telephone was a lemon. It didn't work.

## Installation Instructions
* clone the repo & cd into it
* `npm install`
* `touch .env`
* add below contents into .env

.env file
```
# bot token from your Discord Developer app
BOT_TOKEN=

# the IP of your Minecraft server (if this bot runs on the same server, set to localhost)
MC_SERVER_IP=

# the hostname of your Minecraft server (either IP address or domain name, never localhost)
MC_SERVER_EXTERNAL_IP=

# RCON port as configured in your server.properties (default is 25575)
MC_RCON_PORT=25575

# RCON password as configured in your server.properties (default is blank, you should change it)
MC_RCON_PASSWORD=

# query port as configured in your server.properties (default is 25565)
MC_QUERY_PORT=25565

# name of the admin role in the Discord server the bot is running in that lets users run RCON tasks
DISCORD_ADMIN_ROLE="Tobias Admin"

# prefix to listen for (if you're running a dev environment you could change this to !t for example)
# keep the space at the end
BOT_PREFIX="!tobias "
```