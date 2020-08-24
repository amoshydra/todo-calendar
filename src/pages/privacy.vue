<template>
  <div class="privacy-page">
    <h1>Privacy Policy</h1>

    <p>This Privacy Policy describes how I (<a href="https://github.com/amoshydra">@amoshydra</a>) collect, use and share your information on <a href="https://todo-calendar.surge.sh">todo-calendar.surge.sh</a>.</p>

    <br><hr><br>

    <p>
      <strong>I do not collect, use and share your information.</strong>
    </p>

    <p>
      However, Todo-Calendar depends on third-party services to work.
      <ul>
        <li>
          <span>Todo-Calendar uses <a href="https://surge.sh/tour">surge.sh</a> as its hosting service.</span>
        </li>
        <li>
          <span>Todo-Calendar uses <a href="https://policies.google.com/privacy">Google API services</a> to access your Google Calendar and Google Tasks.</span>
        </li>
      </ul>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.privacy-page {
  hr {
    opacity: 0.2;
  }
  ul {
    margin-top: 0.25em;
  }
  li span {
    display: inline-block;
    width: calc(100% - 4em);
    vertical-align: top;
  }
}
</style>
