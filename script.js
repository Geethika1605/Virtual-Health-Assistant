// Simple front-end auth prototype using localStorage (NOT for production)
(function(){
  const showLoginBtn = document.getElementById('show-login');
  const showSignupBtn = document.getElementById('show-signup');
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const loginMsg = document.getElementById('login-msg');
  const signupMsg = document.getElementById('signup-msg');

  function toggle(to) {
    if (to === 'login') {
      loginForm.classList.remove('hidden');
      signupForm.classList.add('hidden');
      showLoginBtn.classList.add('active');
      showSignupBtn.classList.remove('active');
      loginMsg.textContent = signupMsg.textContent = '';
    } else {
      signupForm.classList.remove('hidden');
      loginForm.classList.add('hidden');
      showSignupBtn.classList.add('active');
      showLoginBtn.classList.remove('active');
      loginMsg.textContent = signupMsg.textContent = '';
    }
  }

  showLoginBtn.addEventListener('click', () => toggle('login'));
  showSignupBtn.addEventListener('click', () => toggle('signup'));

  // Simple user store
  function getUsers() {
    try { return JSON.parse(localStorage.getItem('vha_users') || '[]'); }
    catch(e){ return [];}
  }
  function setUsers(users){ localStorage.setItem('vha_users', JSON.stringify(users)); }

  // Signup
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim().toLowerCase();
    const pw = document.getElementById('signup-password').value;
    const pw2 = document.getElementById('signup-password-confirm').value;

    if (!name || !email || !pw) {
      signupMsg.textContent = 'Please complete all fields.';
      return;
    }
    if (pw !== pw2) {
      signupMsg.textContent = 'Passwords do not match.';
      return;
    }
    const users = getUsers();
    if (users.find(u => u.email === email)) {
      signupMsg.textContent = 'Email already registered. Try logging in.';
      return;
    }
    users.push({ name, email, password: pw });
    setUsers(users);
    signupMsg.style.color = 'green';
    signupMsg.textContent = 'Account created. You can now log in.';
    signupForm.reset();
    setTimeout(() => { signupMsg.textContent = ''; toggle('login'); }, 1000);
  });

  // Login
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const pw = document.getElementById('login-password').value;
    const users = getUsers();
    const u = users.find(x => x.email === email && x.password === pw);
    if (!u) {
      loginMsg.style.color = '#dc2626';
      loginMsg.textContent = 'Invalid email or password.';
      return;
    }
    // Simulate successful login; replace with real API call in next steps
    loginMsg.style.color = 'green';
    loginMsg.textContent = `Welcome, ${u.name}. Redirecting to dashboard...`;

    // Example: imagine redirect to dashboard.html or integrate with your VHA front-end
    setTimeout(() => {
      // For prototype, just clear message and reset form
      loginForm.reset();
      loginMsg.textContent = '';
      alert('Login success — connect this to your health-assistant dashboard/API next.');
    }, 800);
  });

})();
