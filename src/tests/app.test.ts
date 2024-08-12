import axios from 'axios';
import { insertCommit, insertRepository } from '../db';
import { fetchCommits, fetchAndStoreRepositoryData } from '../app';

// I am trying to mock axios here
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mocking db functions
jest.mock('../db', () => ({
  insertCommit: jest.fn(),
  insertRepository: jest.fn(),
}));

describe('App Functionality Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetchCommits should return formatted commits data', async () => {
    const mockCommitsResponse = {
      data: [
        {
          commit: {
            message: 'Initial commit',
            author: {
              name: 'Author Name',
              date: '2024-08-01T00:00:00Z',
            },
          },
          html_url: 'https://github.com/example/repo/commit/12345',
          sha: '12345',
        },
      ],
    };

    mockedAxios.get.mockResolvedValue(mockCommitsResponse);

    const commits = await fetchCommits('owner', 'repo', '2024-01-01T00:00:00Z');

    expect(commits).toEqual([
      {
        message: 'Initial commit',
        author: 'Author Name',
        date: '2024-08-01T00:00:00Z',
        url: 'https://github.com/example/repo/commit/12345',
        sha: '12345',
      },
    ]);
  });

  test('fetchAndStoreRepositoryData should fetch repo data and insert it', async () => {
    const mockRepoResponse = {
      data: {
        full_name: 'owner/repo',
        description: 'Repository Description',
        html_url: 'https://github.com/owner/repo',
        language: 'TypeScript',
        forks_count: 10,
        stargazers_count: 20,
        open_issues_count: 5,
        watchers_count: 15,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-08-01T00:00:00Z',
      },
    };

    const mockInsertRepoResult = [
      {
        id: 1,
        ...mockRepoResponse.data,
      },
    ];

    mockedAxios.get
      .mockImplementationOnce(() => Promise.resolve(mockRepoResponse)) // Mock repo data fetch
      .mockImplementationOnce(() => Promise.resolve({ data: [] })); // and commits fetch

    (insertRepository as jest.Mock).mockResolvedValue(mockInsertRepoResult);
    (insertCommit as jest.Mock).mockResolvedValue([]);

    await fetchAndStoreRepositoryData('owner', 'repo', '2024-01-01T00:00:00Z');

    expect(insertRepository).toHaveBeenCalledWith({
      full_name: 'owner/repo',
      description: 'Repository Description',
      url: 'https://github.com/owner/repo',
      language: 'TypeScript',
      forks_count: 10,
      stars_count: 20,
      open_issues_count: 5,
      watchers_count: 15,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-08-01T00:00:00Z',
    });

  });

});
