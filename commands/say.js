exports.run = async (client, message, args, level) => {
  function reply (content) {
    if (message) {
      return message.reply(content.slice(0, 1).toLowerCase() + content.slice(1))
    } else {
      return client.logger.warn(content)
    }
  }

  if (!args[0]) return reply('Musisz podać nazwę kanału, na którym chcesz wysłać wiadomość.')
  if (!args[1]) return reply('Musisz podać treść wiadomości do wysłania.')

  const channel = client.channels.cache.find(channel => channel.name === args[0])

  if (!channel) return reply('Taki kanał nie istnieje.')

  args.shift(2)
  for (let i = 0; i < args.length; i++) {
    if (args[i][0] === '@') {
      args[i] = (message && message.guild && message.guild.members.cache.find(member => member.nickname && client.normalize(member.nickname) === client.normalize(args[i].slice(1)))) || client.users.cache.find(user => client.normalize(user.username) === client.normalize(args[i].slice(1))) || args[i]
    }
  }
  const content = args.join(' ')

  channel.send(content)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Bot Admin'
}

exports.help = {
  name: 'say',
  category: 'Różne',
  description: 'Pozwala wysyłać wiadomości jako bot.',
  usage: 'say nazwa-kanału tekst' // eslint-disable-line no-useless-escape
}
