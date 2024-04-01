// weather-icons.helper.ts

export function getWeatherIconUrl(condition: string): string {
  const conditionMap: { [key: string]: string } = {
    'Clear': 'sun.png',
    'Clouds': 'clouds.png',
    'Rain': 'rain.png',
    'Snow': 'snow.png',
    // Add more conditions and corresponding icons as needed
  };

  const defaultIcon = 'default.png';
  const iconFilename = conditionMap[condition] || defaultIcon;
  return `https://www.angulartraining.com/images/weather/${iconFilename}`;

}
