<h1 align="center">Atlas</h1>

<div align="center"><strong>Open-source product analytics for the modern data stack</strong></div>
<div align="center">Atlas replaces Mixpanel or Amplitude and lets you analyze funnels, retention, and user flows.</div>

<br />

<div align="center">
  <img src="https://img.shields.io/static/v1?label=PRs&message=welcome&style=flat-square&color=5e17eb&labelColor=000000" alt="PRs welcome!" />

  <img alt="License" src="https://img.shields.io/github/license/jpedroschmitz/typescript-nextjs-starter?style=flat-square&color=5e17eb&labelColor=000000">
</div>

<div align="center">
  <sub>Created by <a href="https://github.com/mjirv">Michael Irvine</a> with the help of many <a href="https://github.com/mjirv/atlas/graphs/contributors">wonderful contributors</a>.</sub>
</div>

<br />

![Screen Shot 2022-09-26 at 7 43 16 PM](https://user-images.githubusercontent.com/5953854/192400417-6c73e781-1207-46b2-b82b-33279cac5f2e.png)

<br />

## Features

- Funnels
- Flows
- Retention
- SQL runner with dbt/Jinja support

### Requirements
* A [dbt project](https://getdbt.com) (running locally) with the [dbt_product_analytics](https://hub.getdbt.com/mjirv/dbt_product_analytics/latest/) package instealled
* NodeJS

### Development

1. Add a file called `.env.local` with `DBT_PROJECT_PATH` pointing to the root of your local dbt project. For example:
```
DBT_PROJECT_PATH=/Users/mjirv/git_repos/dbt_product_analytics/integration_tests
```
2. To start the project locally, run:

```bash
yarn dev
```

Open `http://localhost:3000` with your browser to see the result.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for more information.
