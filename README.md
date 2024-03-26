
# Retrieve Delegates Cron

- Get a code for a cron job and push it to your GitHub (or any other git provider)
- Create a Vercel account from your GitHub (or any other git provider) and set up an "Enterprise" subscription to have maximum execution time for serverless functions(Cron jobs)
- Go to your Vercel account click on "add new"  and select "Project" and you will see a list of existing projects on your GitHub
- Select the project with the Cron job and click "Import"

## Configure Project
- Set all Environment Variables you need in "Environment Variables" section and follow the naming belove
``` 
    API_ENDPOINT - endpoint to trigger in order to get delegates
    GOVERNOR_ID - Governor Id
    ORGANIZATION_ID - Organization Id
    TALLY_API_KEY - API key to be able to get delegates
``` 
- after variables are set up click deploy

## Storage Configuration
- Open your newly created project dashboard
- Click on the storage tab and choose blob and click create
- Enter a name for your blob and click create
- Select the environments you want to work with and click Connect
- Go to the tab Deployments click on three dots on the last deployment and choose "Redeploy" to make storage visible for the project
- Now when everything is set up go to the storage tab select the blob storage you've created for the project and you can see  "delegates-data.json" file was created
- click on this file and then click copy the URL and open the URL in a new tab of your browser to see the file
- You can use the same URL to fetch the file on the front-end part of your application