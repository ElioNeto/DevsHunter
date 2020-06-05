const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringToArray');

module.exports = {
  async index(request, response) {
    const { latitude, longitude, techs, Mdistance } = request.query;
  
    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
    });

    var devsArray = []

    devs.map(dev => {
      let lat = parseFloat(dev.location.coordinates[1])
      let lon = dev.location.coordinates[0]
      let name = dev.name

      var R = 6378.137; // Radius of earth in KM
      var dLat = (lat * Math.PI / 180) - (parseFloat(latitude) * Math.PI / 180);
      var dLon = (lon * Math.PI / 180) - (parseFloat(longitude) * Math.PI / 180);
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(parseFloat(latitude) * Math.PI / 180) * Math.cos(lat * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c;
      var distance = d * 1000
      console.log(parseInt(distance) + ' Meters of distance. User: ' + name)

      const maxDistance = Mdistance
      if(maxDistance >= distance){
        let developer = {
          techs: dev.techs,
          distance,
          name: dev.name,
          github_username: dev.github_username,
          location: dev.location,
          _id: dev._id,
          avatar_url: dev.avatar_url,
          bio: dev.bio
        }
        devsArray.push(developer)
      }

    })
    

    /*  */
    console.log('=== END ===')

    return response.json({devsArray});
  }
}