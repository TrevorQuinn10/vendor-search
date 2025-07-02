let allVendors = [];

async function loadVendors() {
  try {
    const res = await fetch('vendors.json?cache=' + new Date().getTime());
    allVendors = await res.json();

    // Populate autocomplete dropdown
    const list = document.getElementById('vendorList');
    list.innerHTML = '';
    allVendors.forEach(vendor => {
      const opt = document.createElement('option');
      opt.value = vendor.name;
      list.appendChild(opt);
    });
  } catch (e) {
    console.error("Failed to load vendors:", e);
  }
}

function searchByName(name) {
  const resultDiv = document.getElementById('result');
  const bubble = document.getElementById('speechBubble');
  const image = document.getElementById('talkingHead');

  const matches = allVendors.filter(v =>
    v.name.toLowerCase().includes(name.toLowerCase())
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

  image.classList.remove('talking');
  void image.offsetWidth;
  image.classList.add('talking');
}

function lookupVendor() {
  const input = document.getElementById('vendorInput').value;
  searchByName(input);
}

document.addEventListener('DOMContentLoaded', () => {
  loadVendors();

  document.getElementById('vendorInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      lookupVendor();
    }
  });
});
