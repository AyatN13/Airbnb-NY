document.getElementById('search-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.target;

  const neighborhood = form.neighborhood.value;
  const minPrice = form.minPrice.value;
  const maxPrice = form.maxPrice.value;
  const checkin = form.checkin.value;
  const checkout = form.checkout.value;
  const adults = form.adults.value;

  const response = await fetch(
    `/api/search?neighborhood=${neighborhood}&minPrice=${minPrice}&maxPrice=${maxPrice}&checkin=${checkin}&checkout=${checkout}&adults=${adults}`
  );
  const data = await response.json();

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (data.length === 0) {
    resultsDiv.innerHTML = '<p>No properties found.</p>';
  } else {
    data.forEach((property) => {
      const propertyDiv = document.createElement('div');
      propertyDiv.innerHTML = `
        <h3>${property.name}</h3>
        <p>${property.address}</p>
        <p>Price: ${property.price.amount} ${property.price.currency}</p>
        <a href="${property.url}" target="_blank">View Details</a>
      `;
      resultsDiv.appendChild(propertyDiv);
    });
  }
});
