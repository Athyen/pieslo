exports.run = async (client, message, args, level) => {
  if (!args || args.length < 1) return message.reply('musisz podać nazwę komendy, którą chcesz przeładować.')
  const command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]))
  let response = await client.unloadCommand(args[0])
  if (response) return message.reply(`błąd wyłączania: ${response}`)

  response = client.loadCommand(command.help.name)
  if (response) return message.reply(`błąd wczytywania: ${response}`)

  message.reply(`komenda \`${command.help.name}\` została przeładowana.`)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Bot Admin'
}

exports.help = {
  name: 'reload',
  category: 'Systemowe',
  description: 'Przeładowuje komendę.',
  usage: 'reload [komenda]'
}
