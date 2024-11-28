const search_text = document.getElementById('search_text') as HTMLElement;

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('query');

  if (search_text && query) {
    displayresult(query);
  }
  //make show results function here: put some logic
  function displayresult(query: string) {
    search_text.innerHTML = 'showing results for: ' + query;
  }
});
