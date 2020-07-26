exports.run = (client, message, args, level) => {
  const boi = message.guild.roles.cache.get('555782372495196189')
  const gurl = message.guild.roles.cache.get('555782266689945611')
  if (client.normalize(args[0]) === 'chlopcem') {
    if (message.member.roles.cache.has(boi.id)) {
      message.channel.send('Co Ty kombinujesz? Przecież jesteś już chłopcem...')
    } else if (message.member.roles.cache.has(gurl.id)) {
      message.channel.send('Wypad mi z tym gender fluid!')
    } else {
      message.member.roles.add(boi)
      message.channel.send('Gratulacje, właśnie zostałeś chłopcem!')
    }
  } else if (client.normalize(args[0]) === 'dziewczynka') {
    if (message.member.roles.cache.has(gurl.id)) {
      message.channel.send('Co Ty kombinujesz? Przecież jesteś już dziewczynką...')
    } else if (message.member.roles.cache.has(boi.id)) {
      message.channel.send('Wypad mi z tym gender fluid!')
    } else {
      message.member.roles.add(gurl)
      message.channel.send('Gratulacje, właśnie zostałaś dziewczynką!')
    }
  } else message.channel.send('Coś poszło nie tak. Użyj komendy /jestem chłopcem lub /jestem dziewczynką')
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'jestem',
  category: 'Różne',
  description: 'Ustawia Twoją płeć na serwerze.',
  usage: 'jestem [chłopcem/dziewczynką]'
}
