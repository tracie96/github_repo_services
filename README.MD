# Repository Monitor

Overview
Repository Monitor is a TypeScript service that fetches data from GitHub's public APIs, stores repository and commit information in a Supabase database, and continuously monitors repositories for new commits. The service is designed to keep track of repository details and commit history and handle errors gracefully.

## Features
* Fetch repository details and commits from GitHub.
* Store repository and commit data in Supabase.
* Continuously monitor repositories and fetch new commits every 5 minutes.
* Configurable start date for pulling commits.
* Handle errors and ensure database consistency.

## Project Structure
* app.ts: Contains functions to fetch and store repository and commit data.
* db.ts: Handles interactions with the Supabase database, including inserting and updating repository and commit records.
* monitor.ts: Runs a cron job to periodically fetch and store repository data.
* tests/: Contains unit tests for the service.

# Setup
## Prerequisites
* Node.js and npm (or Yarn)
* Supabase account and database
* GitHub personal access token

## Installation
Clone the repository:
```sh
git clone https://github.com/tracie96/github_repo_services.git
cd github_repo_services
```
Install dependencies:
```sh
npm install
```
I attached my env to the mail,please copy an paste to your directory.

## Running the Service
To start the service and begin monitoring repositories, run:
```sh
 npx ts-node src/monitor.ts
 ```
## Running the Test
To run the unit tests, use:
```sh
 npm test
 ```

## Error Handling
I designed the service to handle errors properly. Any errors encountered during API calls or database interactions are logged and propagated to ensure proper handling.

## Functions

- fetchCommits(owner: string, repo: string, since: string): Promise<Commit[]> : Fetches commits from GitHub for a specified repository since a given date.
- fetchAndStoreRepositoryData(owner: string, repo: string, since: string): Promise<void> : Fetches repository details and commits, and stores them in the Supabase database. 
- insertCommit(commitData: Commit): Promise<any>: great UI boilerplate for modern web apps : Inserts a commit record into the Supabase database.
- insertRepository(repoData: Repository): Promise<any>: Inserts or updates a repository record in the Supabase database.
