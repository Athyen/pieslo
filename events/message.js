
module.exports = async (client, message) => {
  if (message.author.bot) return

  const settings = message.settings = client.getSettings(message.guild)

  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`)
  if (message.content.match(prefixMention)) {
    return message.reply(`mój prefix na tym serwerze to \`${settings.prefix}\``)
  }

  if (message.content.indexOf(settings.prefix) !== 0) return

  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  if (message.guild && !message.member) await message.guild.fetchMember(message.author)

  const level = client.permlevel(message)

  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
  if (!cmd) return

  if (cmd && !message.guild && cmd.conf.guildOnly) { return message.channel.send('Ta komenda nie jest dostępna w prywatnej wiadomości. Uruchom tą komendę na kanale tesktowym serwera.') }

  if (level < client.levelCache[cmd.conf.permLevel]) {
    return message.channel.send(`Nie masz dostępu do tej komendy.
Twój poziom uprawnień to ${level} (${client.config.permLevels.find(l => l.level === level).name})
Ta komenda wymaga poziomu ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`)
  }

  message.author.permLevel = level

  message.flags = []
  while (args[0] && args[0][0] === '-') {
    message.flags.push(args.shift().slice(1))
  }
  client.logger.cmd(`${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) uruchomił komendę ${cmd.help.name}`)
  cmd.run(client, message, args, level)
}
