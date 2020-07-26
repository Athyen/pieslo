module.exports = async client => {
  client.logger.log(`${client.user.tag} jest gotowy do obsługi ${client.users.cache.size} użytkowników na ${client.guilds.cache.size} serwerach.`, 'ready')
  client.user.setActivity(`${client.settings.get('default').prefix}help`, { type: 'PLAYING' })
}
