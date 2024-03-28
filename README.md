# Delegate exporter
The cron job is designed for retrieving delegates and storing them in Cloudflare R2 storage
## Deployment
- Obtain a code for a cron job and push it to your GitHub (or any other Git provider).
- Create a Vercel account from your GitHub (or any other Git provider) and set up an "Enterprise" subscription to maximize the execution time for serverless functions (Cron jobs).
- Go to your Vercel account, click on "Add New," and select "Project." You will then see a list of existing projects on your GitHub.
- Select the project containing the Cron job and click "Import."

### Configure Project
- Set all the environment variables you need in the "Environment Variables" section and follow the naming conventions below:
``` 
    API_ENDPOINT - Endpoint to trigger to retrieve delegates
    GOVERNOR_ID - Governor ID
    ORGANIZATION_ID - Organization ID
    TALLY_API_KEY - API key required to fetch delegates
``` 
- After setting the variables, click "Deploy."

## Storage Configuration
- Open your newly created project's dashboard.
- Click on the 'Storage' tab, choose 'Blob,' and click 'Create.'
- Enter a name for your blob and click 'Create.'
- Select the environments you want to work with and click 'Connect.'
- Go to the 'Settings' tab on the right sidebar, choose 'Environment Variables,' and you will see the 'BLOB_READ_WRITE_TOKEN' variable has been added. 
- In the 'Deployments' tab, click on the three dots on the last deployment and choose 'Redeploy' to make the storage visible to the project.
- Once everything is set up, go to the 'Storage' tab, select the blob storage you've created for the project, and you will see that the "delegates-data.json" file has been created.
- Click on this file, then click 'Copy URL' and open the URL in a new browser tab to view the file.
- Use the same URL to fetch the file in the front-end part of your application.
- Add a new environment variable "NEXT_PUBLIC_DELEGATES_FETCH_URL" to your front-end application.

    ```
    NEXT_PUBLIC_DELEGATES_FETCH_URL="Link to your file"
    ```
## Error Handling
- To prevent a 429 error, increase the limits for your API token.

## Local development

- **Install CLI globally**
    ```
    npm i -g vercel
    ```
- **vercel login**
    ```
    vercel login
    ```
- **To run the project locally run:**

    ```
    vercel dev 
    ```
- **After running the command above you will be asked to**
    ```
     Set up and develop path\to\your\file? [Y/n] 
    ```
    Type "y" and follow the steps in the console to find and link your project to an instance on Vercel.

    After the project is linked to Vercel running the command ```vercel dev``` will be enough to start local development.