const search_input = document.getElementById('search_input') as HTMLInputElement | null;

document.addEventListener('DOMContentLoaded', () => {
  if (search_input) {
    //this block runs when you click enter on the search input
    search_input.addEventListener('keypress', (event: KeyboardEvent) => {
      const query = search_input.value.trim();
      if (event.key !== 'Enter') {
        return;
      }
      //send arguments to the next page via html query
      if (query) {
        window.location.href = `search.html?query=${encodeURIComponent(query)}`;
      }
    });
  }
});
