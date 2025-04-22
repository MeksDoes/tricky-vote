<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/create-poll">About</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header,
main {
  padding: var(--padding-l);
}

header {
  line-height: 1.5;
  max-height: 100vh;
  margin: auto;
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
