# Delegate exporter
The cron job is designed for retrieving delegates and storing them in Cloudflare R2 storage
## Deployment
- Obtain a code for a cron job and push it to your GitHub (or any other Git provider).
- Create a Vercel account from your GitHub (or any other Git provider) and set up an `Enterprise` subscription to maximize the execution time for serverless functions (Cron jobs).
- Go to your Vercel account, click on `Add New`, and select `Project`. You will then see a list of existing projects on your GitHub.
- Select the project containing the Cron job and click `Import`.

### Configure Project
- Set all the environment variables you need in the `Environment Variables` section and follow the naming conventions below:
``` 
    API_ENDPOINT - Endpoint to trigger to retrieve delegates
    GOVERNOR_ID - Governor ID
    ORGANIZATION_ID - Organization ID
    TALLY_API_KEY - API key required to fetch delegates
``` 
- After setting the variables, click `Deploy`.

## Storage Configuration

### Creating bucket
- Create account on https://www.cloudflare.com/.
- Navigate to R2 section in the left sidebar.
- Verify your email.
- Return to the R2 section enter your credit card details and confirm the subscription.
- After the subscription is successfully created click `Create bucket`
- Enter your Bucket name course Automatic location and click `Create` 
- To make the files in the bucket public go to the `Settings` tab of your bucket.
- Scroll to the `Public access` section, and find `R2.dev subdomain` then click `allow access` and follow the steps to allow access.

### Creating API Tokens
- Open `R2` section and click `Manage R2 API Tokens` and then on `Create API Token`.
- Give a name for your token
- Select `Object Read & Write` Permissions
- Click `Create API Token`
- Save all the information there: `Token value`, `Access Key ID`, `Secret Access Key`, `jurisdiction-specific endpoints`  because you won't be able to see it again

### Adding environment variables to Vercel project
- Open your Vercel project dashboard and go to the `Settings` tab.
- Select the `Environmental Variables` section.
- Select Environmental Variables and add variables as specified below

    ```
    R2_ENDPOINT="default endpoint"
    R2_ACCESS_KEY_ID="your Access Key ID"
    R2_ACCESS_KEY="Secret Access Key"
    R2_BUCKET_NAME="name of your bucket"
    ```
- Redeploy your app to make new variables visible.
- Go to the `Deployments` tab, find your current production deployment, then click on three dots, and  then click `Redeploy`.
- After the application is deployed go to the `Project` tab and click on the Screenshot of your app, wait until the execution of the function is finished and a new file should appear in the bucket, this is the file with delegates.
- Open the file and you will see a `R2.dev URL` This is the URL that you can use to access the file on the Front-end.
- Use this Environment variable to access the file.
    ```
    NEXT_PUBLIC_DELEGATES_FETCH_URL="Link to your file with delegates"
    ```

### Set up CORS Policy
- Open your R2 bucket, go to the `Setting` tab, and find `CORS Policy`.
- Click `Add CORS policy` and add all the URLs that will be able to fetch the via link.
    ```
    [
        {
            "AllowedOrigins": [
                "http://localhost:4000",
                "https://https://example.com"
            ],
            "AllowedMethods": [
                "GET"
            ]
        }
    ]
    ```
- Save changes and you should be able to access your files via the `R2.dev URL` link.

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
    Type `y` and follow the steps in the console to find and link your project to an instance on Vercel.

    After the project is linked to Vercel running the command ```vercel dev``` will be enough to start local development.

- **To redeploy function push changes to the main branch of your project**
# Merkle Tree Uploader
## Handler setup
- After the app is deployed add one more environmental variable and Create a secret key to use as a header to upload the Merkle tree to CDN.
    ```
      MERKLE_TREE_LOAD_KEY=<Secret key>
    ```
- After the variable is added edeploy your app to make new variables visible.
- Go to the `Deployments` tab, find your current production deployment, then click on three dots, and  then click `Redeploy`.
## Merkle Tree Uploading process
- Open your project on Vercel and take your app domain to use it as a basic URL for endpoint to upload your Merkle tree to CDN
- Make a post call to the endpoint `<YOUR_DOMAIN>/api/merkleTreeLoader`, add header `merkle_tree_load_key` with the Secret key you set in your Environmental Variables, inside your body pass an `uuid` param, that is uuid of your Merkle tree.
- After the call is executed a new file should appear in the bucket  `merkle-tree-data.json`
- Open the file and you will see a `R2.dev URL` This is the URL that you can use to access the file on the Front-end.
- Use this Environment variable to access the file.
      ```
        NEXT_PUBLIC_MERKLE_TREE_FETCH_URL="Link to your file with Merkle Tree"
      ```