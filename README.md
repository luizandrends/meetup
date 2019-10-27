# Meetup
<p>The meetup app it's an application developed with <strong>NodeJs</strong>, <strong>ReactJS</strong> and <strong>React Native</strong>. The back-end was developed with Express framework. Bessides that the front-end was developed with ReactJs using react redux and react hooks, and in mobile we use React Native. This api is a task of Rocketseat's bootcamp class</p>

## Get started

<p>For you get started, please follow theese steps below: </p>



<div>
<h2> Back-end </h2>
<ol>
  <li>You need to run a Postgres container using <a href="https://hub.docker.com/_/postgres">Docker</a>.</li>
  <li>You need to run a Redis container using <a href="https://hub.docker.com/_/redis">Redis</a>.</li>
  <li>With the docker container running, you need a Postgres client to access the database. On this case i'm using <a href="https://electronjs.org/apps/postbird">Postbird.</a></li>
  <li>After that you need to run a <a href="https://hub.docker.com/_/mongo">Mongo</a> container.</li>
  <li>After you set up the containers you can add an file <strong>.env</strong> and configure your project. Have an <strong>.env.example</strong> at the root of the project</li>
  <li>After you followed theese steps, you can run , <strong>YARN</strong> on your bash.</li>
  <li>Please create an account and configure properly using the documentation of <a href="https://mailtrap.io/">Mailtrap</a>.</li>
  <li>Create your account on <a href="https://sentry.io/">Sentry</a>
  <li>Run this command on your bash to create the migrations <strong>yarn sequelize db:migrate</strong>.</li>
  <li>Finnaly you can run the server script <strong>yarn dev</strong> and the queue script <strong>yarn queue</strong>.</li>
<ol>
</div>


<div>
<h2>Front-end</h2>

<ol>
	<li>Access your project folder</li>
	<li>Open on your favourite editor</li>
	<li>And run <strong>yarn</strong></li>
	<li>Then run <strong>yarn start</strong></li>
</ol>
</div>


<div> 
<h2>Mobile</h2>

<ol>
	<li>Access your project folder</li>
	<li>Open on your favourite editor</li>
	<li>And run <strong>yarn</strong></li>
	<li>Then open your emulator and run <strong>react-native run-android</strong> or <strong>react-native run-ios</strong></li>
	<li>Then run <strong>react-native start</strong></li>
</ol>
</div>
