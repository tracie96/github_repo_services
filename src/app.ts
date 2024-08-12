import axios from "axios";
import dotenv from "dotenv";
import { Repository, insertCommit, insertRepository } from "./db";

dotenv.config();

const GITHUB_API_BASE_URL = "https://api.github.com/repos";

export const fetchCommits = async (owner: string, repo: string, since: string) => {
  try {
    const response = await axios.get(
      `${GITHUB_API_BASE_URL}/${owner}/${repo}/commits`,
      {
        params: { since },
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    return response.data.map((commit: any) => ({
      message: commit.commit.message,
      author: commit.commit.author.name,
      date: commit.commit.author.date,
      url: commit.html_url,
      sha: commit.sha,
    }));
  } catch (error) {
    console.error(`Error fetching commits: ${error}`);
    throw error;
  }
};

export const fetchAndStoreRepositoryData = async (
  owner: string,
  repo: string,
  since: string
) => {
  try {
    const repoResponse = await axios.get(
      `${GITHUB_API_BASE_URL}/${owner}/${repo}`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    const repoData: Omit<Repository, "id"> = {
      full_name: repoResponse.data.full_name,
      description: repoResponse.data.description,
      url: repoResponse.data.html_url,
      language: repoResponse.data.language,
      forks_count: repoResponse.data.forks_count,
      stars_count: repoResponse.data.stargazers_count,
      open_issues_count: repoResponse.data.open_issues_count,
      watchers_count: repoResponse.data.watchers_count,
      created_at: repoResponse.data.created_at,
      updated_at: repoResponse.data.updated_at,
    };
    const result = await insertRepository(repoData);
    if (result && result.length > 0) {
      const [repository] = result;
      console.log("Repository saved:", repository);

      const commits = await fetchCommits(owner, repo, since);

      for (const commit of commits) {
        await insertCommit({ ...commit, repository_id: repository.id });
      }

      console.log("Repository and commits saved successfully");
    } else {
      console.error("Failed to save repository");
    }
  } catch (error) {
    console.error(`Error fetching and storing repository data: ${error}`);
  }
};
