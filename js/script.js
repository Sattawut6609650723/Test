document.getElementById('loginButton').disabled = true;

function checkForm() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;
  document.getElementById('loginButton').disabled = !(username && password && role !== '0');
}

function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
  
    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Application-Key': 'TU40d540d16f11defaa5c8982d3e28d45d5ff24fab844812dd12d35cd371446be23fcd600c359d7167d77eacdc24c22ff4',
      },
      body: JSON.stringify({
        UserName: username,
        PassWord: password,
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Login Response:', data); // Log the response data for debugging
        if (data.success) {
          fetchUserProfile(username);
        } else {
          document.getElementById('message').innerText = `Welcome, ${data.displayname_en}!`;
        }
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'An error occurred. Please try again later.';
      });
}

function fetchUserProfile(username) {
    fetch(`https://restapi.tu.ac.th/api/v2/profile/std/info/?username=${username}`, {
      method: 'GET',
      headers: {
        'Application-Key': 'TU40d540d16f11defaa5c8982d3e28d45d5ff24fab844812dd12d35cd371446be23fcd600c359d7167d77eacdc24c22ff4',
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Profile Response:', data); 
        if (data && data.displayname_en) {
          document.getElementById('message').innerText = `Welcome, ${data.displayname_en}!`;
        } else {
          document.getElementById('message').innerText = 'Failed to fetch profile data.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'An error occurred while fetching profile data. Please try again later.';
      });
}
