# aqueduct-ui

React-based web UI for the [seashell/aqueduct](https://github,com/seashell/aqueduct) project.

This project was bootstraped with [Create React App](https://github.com/facebook/create-react-app), and NOT ejected. In order to allow for arbitrary overwrites of the Webpack and Babel settings, `react-app-rewired` and `customize-cra` are used.

## Environment

Make sure you set the following variables:

- `NODE_ENV`
  - Examples: `staging`,`production`,`development`

## Directory structure

Babel, ESLint, and Webpack configurations should be kept within the `/config` directory or in the their corresponding configuration files at the project root (`.eslintrc`, `.babelrc`).

We suggest the organization of components in a three-level hierarchy:

- Presentational components, stored in  `/src/components`;
- Higher-order components, stored in `/src/containers`; and
- Complete views, stored in `/views`.

All style-related configurations, including themes, are stored in the `/src/styles` directory.

All assets should be put into the `/src/assets` directory, and separated according to their type (icons, illustrations, etc).

Finally, configurations of the Apollo client, including its caching structure, goes into the `/src/graphql` directory.

## Available Scripts

In the project directory, you can run:

### `npm run fakeserver`

Runs a graphql server which provides the application with fake data for development and testing purposes.
You can edit the schema in the file `schema.faker.graphql`.

### `npm run start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
