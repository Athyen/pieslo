exports.run = (client, message, args, level) => {
  const warnMsg = 'coś poszło nie tak. Aby dać suba użyj komendy /daj suba'

  if (!args[0]) return message.channel.sendwarnMsg
  if (client.normalize(args[0]) !== 'sub' && client.normalize(args[0]) !== 'suba') return message.reply(warnMsg)

  const sub = message.guild.roles.cache.get('562331914959323176')

  if (message.member.roles.cache.has(sub.id)) {
    message.channel.send('To miłe, że chcesz po raz drugi dać suba szamanom. Podziwiam Twój entuzjazm!')
  } else {
    message.member.roles.add(sub)
    message.channel.send(`Właśnie ${message.member.roles.cache.has('555782372495196189') ? 'dałeś' : message.member.roles.cache.has('555782266689945611') ? 'dałaś' : 'dałeś/aś'} suba szamanom!`)
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'daj',
  category: 'Różne',
  description: 'Daje suba szamanom.',
  usage: 'daj suba'
}
