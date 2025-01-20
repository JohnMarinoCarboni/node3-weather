const request = require('postman-request')

const forecast = (lat, lon, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=34823b20fb3148daafc672869f183cfc&query=' + lat+','+lon + '&units=f'

    request({url , json: true}, (error, { body }) => {

        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error) {
            callback('invalid location input', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0]+'- It is currently '+body.current.temperature+' degrees out. it feels like '+body.current.feelslike+'. The humidity is '+body.current.humidity+'.')
        }
    })
}

module.exports = forecast