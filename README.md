<h1 align="center">Atlas</h1>
<div align="center"><strong>Open-source product analytics for the modern data stack</strong></div>
<div align="center">Atlas replaces Mixpanel or Amplitude and lets you analyze funnels, retention, and user flows.</div>
<div align="center"><a href="https://atlas-demo.onrender.com/reports/funnel?query=eyJzdGVwcyI6WyJwbGFjZWQiLCJjb21wbGV0ZWQiLCJyZXR1cm5lZCJdLCJldmVudFN0cmVhbSI6InJlZignb3JkZXJzJykifQ%3D%3D" target="_blank">View live demo</a></div>

<br />

<div align="center">
  <img src="https://img.shields.io/static/v1?label=PRs&message=welcome&style=flat-square&color=5e17eb&labelColor=000000" alt="PRs welcome!" />

  <img alt="License" src="https://img.shields.io/github/license/jpedroschmitz/typescript-nextjs-starter?style=flat-square&color=5e17eb&labelColor=000000">
</div>

<div align="center">
  <sub>Created by <a href="https://github.com/mjirv">Michael Irvine</a> with the help of many <a href="https://github.com/mjirv/atlas/graphs/contributors">wonderful contributors</a>.</sub>
</div>

<br />
<video src='https://user-images.githubusercontent.com/5953854/195661289-66720386-4778-4d7c-8d67-fc565f9ef5ae.mp4'></video>
<br />

## Features

- Funnels
- Flows
- Retention
- SQL runner with dbt/Jinja support

## Quick Start

### Requirements
* A [dbt project](https://getdbt.com) (running locally) with the [dbt_product_analytics](https://hub.getdbt.com/mjirv/dbt_product_analytics/latest/) package instealled
* At least one dbt model using `dbt_product_analytics.event_stream()` tagged with the tag `event_stream` (see <a href="https://github.com/Sightglass-Data/atlas-demo/blob/main/atlas_demo_dbt/models/orders.sql" target="_blank">this link</a> for an example)
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
