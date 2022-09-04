<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Let's Cookin API</h3>

  <p align="center">
    <a href="https://github.com/mikhaelkevin/be-lets-cookin-app/issues">Report Bug</a>
    ·
    <a href="https://github.com/mikhaelkevin/be-lets-cookin-app/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#setup-env-example">Setup .env example</a></li>
      </ul>
    </li>
    <li><a href="#db-structure">DB Structure</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#related-project">Related Project</a></li>
    <li><a href="#our-team">Contact</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

**Let's Cookin** is a food lover website that help the user to find their recipe. Also, they can contribute as creator to share their own recipe for people who wants try it.
Beside of only to find what they want, this application also give the user newest information about the popular food or the newest food added. So, we hope it will help the user to grow.

### Built With

This app was built with some technologies below:

- [Javascript](https://www.javascript.com/)
- [ExpressJS](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

Before going to the installation stage there are some software that must be installed first.

- [NodeJs](https://nodejs.org/en/download/)
- [Postman](https://www.postman.com/downloads/)

<p align="right">(<a href="#top">back to top</a>)</p>

### Installation

If you want to run this project locally, I recommend you to configure the <a href="#setup-env">.env</a> first.

- Clone the repo

```
git clone https://github.com/mikhaelkevin/be-lets-cookin-app
```

- Go To Folder Repo

```
cd be-lets-cookin-app
```

- Install Module

```
npm install
```

- <a href="#setup-env">Setup .env</a>

Before you start the backend, make sure check the application folder and find a file named <b>lets_cookin.psql</b>. If you can't found any, you can make it by your own references to application <a href="#db-structure">DB Structure</a>.

Follow the other step bellow to continue settings up the application.

- Open CLI
- Get in to your database

```
psql postgres postgres
```

<i>Note: you can use your own way to get in to psql</i>

- Create new database

```
create database lets_cookin
```

- Import database

```
psql -U postgres -p 5432 -h localhost -d lets_cookin -f lets_cookin.psql
```

<i>Note: you can use your own way to import the database</i>

- Import our [API Documentation](http://postman.org/) on Postman
- After all the step is done you ready to go
- Open the backend folder with your IDE
- Open the IDE teriminal and run command below

```
nodemon
```

<p align="right">(<a href="#top">back to top</a>)</p>

### Setup .env example

Rename file called .env.example to .env and change the value to your own configs.

```
LOCAL_PORT=your local port
ENV_MODE=anything except production

DB_USER=your database username
DB_HOST=your database host
DB_NAME=your database name
DB_PASSWORD=your database user password
DB_PORT=your database port
```

<p align="right">(<a href="#top">back to top</a>)</p>

## DB Structure

<p align="center" display=flex>
   
<table>
<tr>
    <td style='text-align: center; background-color: #6661; font-weight: 600'>Lets cookin database structure</td>
  </tr>
  <tr>
    <td><image src="https://res.cloudinary.com/nocturncloud/image/upload/v1662300698/lets-cookin-app/README/db-structure_xgqctv.png" alt="login" width=100%></td>
  </tr>
</table>
      
</p>
<p align="right">(<a href="#top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b someFeature-features`)
3. Commit your Changes (`git commit -m 'add(someFeature): what kind of feature'`)
4. Push to the Branch (`git push origin someFeature-features`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

## Related Project

<center>
<table> 
    <tr>
    <th>Backend</th>
    <th>Frontend</th>
    <th>Web Service</th>
    <th>API </th>
    </tr>
    <tr>
    <td>
    <a href="https://github.com/mikhaelkevin/be-lets-cookin-app"> 
    <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="be-github"/>
    </a>
    </td>
    <td> 
    <a href="https://github.com/mikhaelkevin/fe-lets-cookin-app"> 
    <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" alt="fe-github">
    <a/>
    </td>
    <td> 
    <a href="#"> 
    <img src="https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white" alt="web-services">
    <a/>
    </td>
    <td> 
    <a href="#"> 
    <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" alt="postman">
    <a/>
    </td>
    </tr>
</table>
</center>

<p align="right">(<a href="#top">back to top</a>)</p>

## License

Distributed under the [MIT](/LICENSE) License.

<p align="right">(<a href="#top">back to top</a>)</p>
