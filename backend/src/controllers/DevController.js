const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringToArray = require('../utils/parseStringToArray');
const { findConnections, /* sendMessage */ } = require('../websocket');

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },
  
  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
  
      var { name, avatar_url, bio } = apiResponse.data;

      !name? name = github_username : name=name
    
      const techsArray = parseStringToArray(techs);
    
      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };
    
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      })

      // Filtrar as conexões que estão há no máximo 10km de distância
      // e que o novo dev tenha pelo menos uma das tecnologias filtradas

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray,
      )

      console.log(sendSocketMessageTo)

      //sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }
  
    return response.json(dev);
  },
};