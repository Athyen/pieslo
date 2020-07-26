exports.run = (client, message, args, level) => {
  if (client.normalize(args[0]) === 'sub' || client.normalize(args[0]) === 'suba') {
    const sub = message.guild.roles.cache.get('562331914959323176')
    if (message.member.roles.cache.has(sub.id)) {
      message.channel.send('To miłe, że chcesz po raz drugi dać suba szamanom. Podziwiam Twój entuzjazm!')
    } else {
      message.member.roles.add(sub)
      message.channel.send('Właśnie dałeś/aś suba szamanom!')
    }
  } else message.channel.send('Coś poszlo nie tak. Aby dać suba użyj komendy /daj suba')
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
