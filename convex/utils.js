const API_KEY = process.env.OPENWEATHER_API_KEY || "";

export const fetchWeatherData = async (location) => {
    try{
        if (!API_KEY){
            throw new Error("API key is missing")
        }

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${API_KEY}&units=metric`)
        
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status} ${response.statusText}`)
        }
        const data = await response.json();

        return {
            location: data.name,
            country: data.sys.country,
            temperature: {
                current: Math.round(data.main.temp),
                feels_like: Math.round(data.main.feels_like),
                min: Math.round(data.main.temp_min),
                max: Math.round(data.main.temp_max),
                unit: "°C"
            },
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            weather: {
                main: data.weather[0].main,
                description: data.weather[0].description,
                icon: data.weather[0].icon
            },
            wind: {
                speed: Math.round(data.wind.speed),
                direction: data.wind.deg,
                unit: "m/s"
            },
            visibility: data.visibility,
            clouds: data.clouds.all
        };
    
    } catch (err) {
        throw new Error(`Failed to fetch weather data: ${err.message}`);
    }
}
