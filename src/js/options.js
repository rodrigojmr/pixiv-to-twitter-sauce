function restore_options() {
  chrome.storage.sync.get(
    {
      saucenaoAPI: ''
    },
    function (items) {
      document.getElementById('api-input').value = items.saucenaoAPI;
    }
  );
}

function save(e) {
  e.preventDefault();
  console.log(document.getElementById('api-input').value);
  chrome.storage.sync.set(
    {
      saucenaoAPI: document.getElementById('api-input').value
    },
    function () {
      // Update status to let user know options were saved.
      var status = document.getElementById('status');
      status.textContent = 'API saved!';
    }
  );
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('api-form').addEventListener('submit', save);

// TODO Check if API is valid
