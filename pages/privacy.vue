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

<style scoped>
.privacy-page * {
  line-height: 1.5em !important;
}

.privacy-page strong {
  font-weight: bold;
}
.privacy-page h1,
.privacy-page h2,
.privacy-page h3,
.privacy-page h4,
.privacy-page h5,
.privacy-page h6,
.privacy-page p {
  margin-bottom: 0.5em;
}
.privacy-page hr {
  opacity: 0.2;
}
.privacy-page ul {
  margin-top: 0.25em;
  padding-left: 1em;
}
.privacy-page li {
  list-style-type: circle;
  list-style-position: inside;
}
.privacy-page li span {
  display: inline-block;
  width: calc(100% - 1em);
  vertical-align: top;
}
</style>
