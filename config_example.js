const config = {
  ownerID: 'id',
  admins: [],
  token: 'token',
  permLevels: [
    {
      level: 0,
      name: 'User',
      check: () => true
    },
    {
      level: 3,
      name: 'Administrator',
      check: (message) => {
        try {
          const adminRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === message.settings.adminRole.toLowerCase())
          return (adminRole && message.member.roles.cache.has(adminRole.id))
        } catch (e) {
          return false
        }
      }
    },
    {
      level: 4,
      name: 'Server Owner',
      check: (message) => message.channel.type === 'text' ? (message.guild.ownerID === message.author.id) : false
    },
    {
      level: 9,
      name: 'Bot Admin',
      check: (message) => config.admins.includes(message.author.id)
    },

    {
      level: 10,
      name: 'Bot Owner',
      check: (message) => message.client.config.ownerID === message.author.id
    }
  ]
}

module.exports = config
