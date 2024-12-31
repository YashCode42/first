async function fetchAnalysis() {
    try {
        const response = await fetch('/analysis');
        const data = await response.json();
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = data.map(row => `<p>${JSON.stringify(row)}</p>`).join('');
    } catch (error) {
        console.error('Error fetching analysis:', error);
        document.getElementById('results').innerText = 'Failed to load analysis data.';
    }
}

if (document.getElementById('results')) {
    fetchAnalysis(); // Call the function on page load
}

