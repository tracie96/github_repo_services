import { CronJob } from 'cron';
import { fetchAndStoreRepositoryData } from './app';

const owner = 'chromium'; 
const repo = 'chromium'; 

const sinceDate = '2024-01-01T00:00:00Z'; 

const cronSchedule = '0 * * * *';

const job = new CronJob(cronSchedule, async () => {
    console.log('Starting job to fetch and store data...');
    try {
        await fetchAndStoreRepositoryData(owner, repo, sinceDate);
        console.log('Job completed');
    } catch (error) {
        console.error('Job failed with error:', error);
    }
});

job.start();
console.log(`Cron job started. Monitoring repository: ${owner}/${repo}`);

