# Example of unit-testing an AngularJS 1 application

Each resource must be tested in complete isolation from the rest of the world. 
All dependencies should be mocked, e.g. when testing a component, we should not 
relay at all on any injected services. 

## Examples:
1. Component with a custom service dependency.
2. Custom service with Angular service dependency. 
3. Custom service, dependent on another custom service and an Angular service.
4. Filter.

## Step #1 - Clone the project
```
git clone https://github.com/vmanchev/angularjs-unit-test.git
```

## Step #2 - Install node/npm and karma-cli
```
sudo apt-get install node
sudo npm install -g karma-cli
```

## Step #3 - Install project dependencies
```
//it will also run bower install and gulp for you 
npm install 
```

### To run the project, use one of these:
```
npm start
gulp
```

### To run the tests once, use one of these:
```
npm test
karma start --single-run
```

### To run the tests in realtime, use one of these:
```
npm run testing
karma start
```

### Code coverage
Find the code coverage in the ./coverage folder. Just run the index.html file in a browser.