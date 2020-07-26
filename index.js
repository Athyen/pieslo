const Discord = require('discord.js')
const { promisify } = require('util')
const readdir = promisify(require('fs').readdir)
const Enmap = require('enmap')

const client = new Discord.Client()

client.config = require('./config.js')

client.logger = require('./modules/logger')

require('./modules/functions.js')(client)

client.commands = new Enmap()
client.aliases = new Enmap()

client.settings = new Enmap({ name: 'settings' })

const init = async () => {
  const commandFiles = await readdir('./commands/')
  client.logger.log(`Ładuję ${commandFiles.length} komend.`)
  commandFiles.forEach(f => {
    if (!f.endsWith('.js')) return
    const response = client.loadCommand(f)
    if (response) console.log(response)
  })

  const eventFiles = await readdir('./events/')
  client.logger.log(`Ładuję ${eventFiles.length} eventy.`)
  eventFiles.forEach(file => {
    const eventName = file.split('.')[0]
    client.logger.log(`Ładuję event: ${eventName}`)
    const event = require(`./events/${file}`)
    client.on(eventName, event.bind(null, client))
  })

  client.levelCache = {}
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i]
    client.levelCache[thisLevel.name] = thisLevel.level
  }

  const input = process.openStdin()
  input.addListener('data', res => {
    const args = res.toString().trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName))
    if (!command) {
      return client.logger.error('Taka komenda nie istnieje!')
    }
    client.logger.cmd(`${client.config.permLevels.filter(permLevel => permLevel.level === 10)[0].name} Vertex uruchomił komendę ${command.help.name}`)
    command.run(client, null, args)
  })

  client.login(client.config.token)
}

init()
