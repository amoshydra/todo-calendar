# Todo Calendar

> A Todo app + a calender view, that allow users to quickly record down their todos and organise them easily.

<img height="60px">

## Getting started in development

### 1. Initialise the repository
```bash
git clone git@github.com:amoshydra/todo-calendar.git
cd todo-calendar
yarn
```

<img height="30px">

### 2. Configure the project
After running `yarn`, a `keys.js` will be generated for you at `config/secrets/keys.js`.  
You are required update the `client_id` inside the file with your own Google Client ID.  

For instruction on how to obtain a Google Client ID,  
see https://developers.google.com/identity/sign-in/web/devconsole-project.

#### Credentials Options
Here are the options you should choose when creating the Google Credential
- Google Calendar API
- Web browser (Javascript)
- User data

Check out `config/secrets/keys.js` in your local repository for more information.

<img height="30px">

### 3. Run the project
Once you have done configuring the project,  
run `yarn run dev` to start developing!

This project is based on https://github.com/vuejs-templates/webpack.  
For detailed explanation on how things work, checkout the  
- [guide](http://vuejs-templates.github.io/webpack/) and
- [docs for vue-loader](http://vuejs.github.io/vue-loader).

<img height="30px">

### 4. Build and deploy the project
`yarn run build` to build the project into the `dist` folder.  

This project usese [surge.sh](http://surge.sh/) for deployment.  
`yarn run deploy` will deploy the `dist` folder to todo-calendar.surge.sh (you can change this in [`config/index.js`](https://github.com/amoshydra/todo-calendar/blob/master/config/index.js))

<img height="30px">

### 5. Tweak the project
See [`config/index.js`](https://github.com/amoshydra/todo-calendar/blob/master/config/index.js) to tweak some of the project settings


<img height="60px">

## More information:
1. [Background](https://github.com/amoshydra/todo-calendar/wiki) of this project
2. On-going [tasks](https://github.com/amoshydra/todo-calendar/wiki/Tasks)

