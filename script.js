async function lookupVendor() {
  const input = document.getElementById('vendorInput').value.toLowerCase();
  const resultDiv = document.getElementById('result');
  const bubble = document.getElementById('speechBubble');

  if (!input) {
    resultDiv.textContent = "Please enter a vendor name.";
    bubble.classList.remove('hidden');
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
        <p><strong>Name:</strong> ${match.name}</p>
        <p><strong>ID:</strong> ${match.id}</p>
        <p><strong>Email:</strong> ${match.email}</p>
        <p><strong>Contact:</strong> ${match.contact}</p>
      `).join('<hr>');
    } else {
      resultDiv.textContent = "No matching vendors found.";
    }

    bubble.classList.remove('hidden');
    bubble.style.animation = 'none';
    void bubble.offsetWidth; // Trigger reflow to restart animation
    bubble.style.animation = '';
  } catch (error) {
    resultDiv.textContent = "Error loading vendor data.";
    bubble.classList.remove('hidden');
    console.error(error);
  }
}
