<template>
    <div>
      <header class="active">
        <section id="nav">
          <div class="navcontainer">
            <a href="" class="navitems">
              <img class="websiteicon" src="/public/picture/logonoword.png" alt="o-dots!">
            </a>
            <div class="websitename navitems">O-dots!</div>
            <div class="loginmsg menu">
                <a v-if='!session.data?.user' href='/users/signin'>Login</a>
                <a v-else href='/users/signout'>
                    Logout
                    <p class="loginemail">({{ session.data?.user.email }})</p>
                </a>
            </div>
          </div>
        </section>
        <div class="secondnav">
          <ul>
            <li><a href="#" data-target="page1">
              <svg width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="menu-item1 nav-icon">
                <g>
                  <path fill="none" d="M0 0h24v24H0z"/>
                  <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zM6.023 15.416C7.491 17.606 9.695 19 12.16 19c2.464 0 4.669-1.393 6.136-3.584A8.968 8.968 0 0 0 12.16 13a8.968 8.968 0 0 0-6.137 2.416zM12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </g>
              </svg>
              <br><p>Home</p>
            </a></li>
            <li><a href="#" data-target="page2">
              <svg width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="menu-item2 nav-icon">
                <g>
                  <path fill="none" d="M0 0h24v24H0z"/>
                  <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zM6.023 15.416C7.491 17.606 9.695 19 12.16 19c2.464 0 4.669-1.393 6.136-3.584A8.968 8.968 0 0 0 12.16 13a8.968 8.968 0 0 0-6.137 2.416zM12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </g>
              </svg>
              <br><p>Hot-dots!</p>
            </a></li>
            <li><a href="#" data-target="page3">
              <svg width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="menu-item3 nav-icon">
                <g>
                  <path fill="none" d="M0 0h24v24H0z"/>
                  <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zM6.023 15.416C7.491 17.606 9.695 19 12.16 19c2.464 0 4.669-1.393 6.136-3.584A8.968 8.968 0 0 0 12.16 13a8.968 8.968 0 0 0-6.137 2.416zM12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </g>
              </svg>
              <br><p>Dot Academy</p>
            </a></li>
            <li><a href="#" data-target="page4">
              <svg width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="menu-item4 nav-icon">
                <g>
                  <path fill="none" d="M0 0h24v24H0z"/>
                  <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zM6.023 15.416C7.491 17.606 9.695 19 12.16 19c2.464 0 4.669-1.393 6.136-3.584A8.968 8.968 0 0 0 12.16 13a8.968 8.968 0 0 0-6.137 2.416zM12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </g>
              </svg>
              <br><p>My O-dots!</p>
            </a></li>
          </ul>
        </div>
      </header>
    </div>
  </template>
  
  <script> import { onMounted, watch } from 'vue'; export default { methods: { handleClick(event, targetPage) { event.preventDefault(); this.$el.querySelectorAll('.page').forEach(page => { page.classList.remove('active'); }); this.$el.querySelector(`.${targetPage}`).classList.add('active'); } }, mounted() { this.$el.querySelectorAll('.secondnav a').forEach(link => { link.addEventListener('click', event => this.handleClick(event, link.dataset.target)); }); }, setup() { const session = useSession(); watch(session, (newValue) => { console.log('Session data updated:', newValue); }); return { session }; } }; </script> 

  <script setup>
   const session =useSession();
</script>
  