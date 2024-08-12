DROP TABLE IF EXISTS repositories CASCADE;

DROP TABLE IF EXISTS commits CASCADE;

-- Recreating the repositories table
CREATE TABLE IF NOT EXISTS repositories (
    id SERIAL PRIMARY KEY,
    full_name TEXT UNIQUE NOT NULL,
    description TEXT,
    url TEXT NOT NULL,
    language TEXT,
    forks_count INTEGER,
    stars_count INTEGER,
    open_issues_count INTEGER,
    watchers_count INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Recreating the commits table
CREATE TABLE IF NOT EXISTS commits (
    id SERIAL PRIMARY KEY,
    repository_id INTEGER REFERENCES repositories(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    author TEXT,
    date TIMESTAMP NOT NULL,
    url TEXT NOT NULL,
    sha TEXT UNIQUE NOT NULL
);
