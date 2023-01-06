# Leaderboard service
A service to show weekly leaderboards for a stock market application

# leaderboard-api
REST API for paginated leaderboard service in a stock market app. Built with Clean Architecture and Test-driven development methodology. Uses Redis Sorted Set to maintain the leaderboard rankings. Note: Some endpoints require JWT to authenticate user, this JWT must be provided in the Authorization header of each request, in `Bearer <token>` format.

## Endpoints

### POST /pnl
Submit PnL values. Requires a JWT for access. Body params:

#### pnl
Running Profit/Loss value

#### PATCH /pnl
Update PnL values. Requires a JWT for access. Body params:

##### pnl
Running Profit/Loss value

#### GET /rank
Get your current ranking. Requires a JWT for access.

#### GET /leaderboard
Get leaderboard. Paginated to 50 results per page (configurable). Query params:
##### pageNo
The page number to fetch.

#### GET /leaderboard/totalPages
Get total number of pages in the leaderboard. Useful to show page navigation.



## Scripts

```npm run test```
Runs all the tests in \_\_test\_\_ directory

```npm run start:dev```
Start development server

```npm run start:prod```
Start production server

```npm run build```
Transpile TS to JS. Output directory: ./dist

```npm run seed:dev```
Flush db and seed new sample data into the db


# redis
Used to store the leaderboard rankings in a Sorted Set in the format userId:pnlValue, and the usernames as simple key-value pairs in the format userId:username.

Runs a weekly cronjob to dump the sorted set into disk, and reset the leaderboard. (Future scope: Can upload these dumps to remote storage like AWS S3 for backups)


# leaderboard-frontend
A barebones frontend built with Vue.js, provided for convenience to demo the application 


# Demo:
Demo is hosted at http://139.59.14.162/
The backend is available at http://139.59.14.162/api

Use the JWT input field to input token which will be sent with all requests.
Note: "Submit" will not work if the user (as defined by the JWT) has already submitted PnL, please use "Update" instead
