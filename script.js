async function lookupVendor() {
  const input = document.getElementById('vendorInput').value.toLowerCase();
  const resultDiv = document.getElementById('result');

  if (!input) {
    resultDiv.textContent = "Please enter a vendor name.";
    return;
  }

  try {
    const res = await fetch('vendors.json');
    const vendors = await res.json();

    const matches = vendors.filter(v =>
      v.name.toLowerCase().includes(input)
    );

    if (matches.length > 0) {
      resultDiv.innerHTML = matches.map(match => `
        <div style="margin-bottom: 15px; border-bottom: 1px solid #ccc; padding-bottom: 10px;">
          <p><strong>Name:</strong> ${match.name}</p>
          <p><strong>ID:</strong> ${match.id}</p>
          <p><strong>Email:</strong> ${match.email}</p>
          <p><strong>Contact:</strong> ${match.contact}</p>
        </div>
      `).join('');
    } else {
      resultDiv.textContent = "No matching vendors found.";
    }
  } catch (error) {
    resultDiv.textContent = "Error loading vendor data.";
    console.error(error);
  }
}
