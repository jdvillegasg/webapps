# Deploy Material for Mkdocs in Github

Steps to deploy on github:

- Go to your Github account webpage
- Click on your profile image
- Go to Settings
- Go to Developer Settings
- Go to Personal access tokens
- Go to Tokens (classic) 
- Go to Generate new token (classic)
- Tick the **repo** and **workflow** boxes
- Open a terminal and set the current working directory to your project directory
- Enter the following command:

!!! failure "Authenticate in github"
    git remote set-url origin https://username:token@github.com/username/reponame.git

- Follow the tutorial on [How to create a BEAUTIFUL documentation-blog website for FREE! | MkDocs Material](https://www.youtube.com/watch?v=DeZjkCtttss) (specifically the last section)
