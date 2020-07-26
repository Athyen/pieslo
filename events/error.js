module.exports = async (client, error) => {
  client.logger.log(`Błąd modułu Discord.js: \n${JSON.stringify(error)}`, 'error')
}
