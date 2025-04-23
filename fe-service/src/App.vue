<template>
  <div id="tricky-votes">
    <header>
      <nav>
        <RouterLink to="/">{{ $t('navigation.landingPage') }}</RouterLink>
        <RouterLink to="/create-poll">{{ $t('navigation.createPoll') }}</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
header,
main {
  padding: var(--padding-l);
}

#tricky-votes {
  display: flex;
}
header {
  line-height: 1.5;
  position: fixed;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 30vw;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--padding-l);
  box-sizing: border-box;
}

main {
  margin-left: 30vw;
  width: 50vw;
  padding: var(--padding-l);
  box-sizing: border-box;
}

nav {
  width: 100%;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-vibrant);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-white);
  color: var(--color-white);
}

nav a:first-of-type {
  border: 0;
}
</style>
