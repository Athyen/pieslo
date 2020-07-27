exports.run = async (client, message, args, level) => {
  const msg = await message.channel.send('Ping?')
  msg.edit(`Pong! Opóźnienie to ${msg.createdTimestamp - message.createdTimestamp}ms. Opóźnienie API to ${Math.round(client.ws.ping)}ms`)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Użytkownik'
}

exports.help = {
  name: 'ping',
  category: 'Różne',
  description: 'Sprawdza opóźnienia dla bota i API discorda.',
  usage: 'ping'
}
