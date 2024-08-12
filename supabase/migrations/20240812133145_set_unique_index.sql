-- <timestamp>_create_unique_index_on_repositories.sql

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'repositories_full_name_key') THEN
        CREATE UNIQUE INDEX repositories_full_name_key ON repositories (full_name);
    END IF;
END $$;
