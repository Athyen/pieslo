exports.run = (client, message, args, level) => {
  const sub = message.guild.roles.cache.get('562331914959323176')

  if (!message.member.roles.cache.has(sub.id)) {
    message.channel.send('Ej, cwaniaczku Ty jeden. Jak masz zamiar unsubować szamanów skoro jeszcze nie dałeś im suba? Bez komentarza...')
  } else {
    message.member.roles.remove(sub).catch(console.error)
    message.channel.send('To przykre, że nie chcesz już subować szamanów.. 😞')
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Użytkownik'
}

exports.help = {
  name: 'unsub',
  category: 'Różne',
  description: 'Prosimy nie używać tej komendy 🥺.',
  usage: 'unsub'
}
