
export const formatDate = (dateToFormat) => {
    const date = new Date(dateToFormat);
const options = {
  year: 'numeric',
  month: 'long', // Display full month name
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: false, // Display time in 24-hour format
  timeZone: 'UTC', // Change to your desired timezone if necessary
};

const formattedDate = date.toLocaleString('en-US', options);
return formattedDate
}
