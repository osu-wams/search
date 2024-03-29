OSU Search is an application designed for searching through OSU for various pages and other pieces of content related to Oregon State. It can also show people and places of OSU. It can be accessed at [search.oregonstate.edu](https://search.oregonstate.edu).

This codebase is a serverless application model, meaning there is no "backend". To access third-party APIs and other endpoints requiring credentials, this application makes calls to AWS Lambda functions that do the work.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Lambda Functions

### First time deployment to AWS
There is one manual step required when deploying to AWS for the FIRST time.<br>
1. Deploy the lambda functions using `yarn deploy-lambda`
2. In a browser navigate to the `updateApigeeToken` lambda function
3. Go to Configuration -> Permissions -> Resource-based policy -> Add permission
![Permissions options](/images/secret-manager-policy.png)
4. Save and return to the Permissions configuration
5. Click the link under `Execution Role` to view the functions role
6. Attach a new policy with the following permissions
![Permissions options](/images/secret-manager-permission.png)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
