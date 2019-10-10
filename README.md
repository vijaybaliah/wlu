# Woman Like You

## Dev Evironment Setup

* For running dev eviromnment in your local you would need to install [Theme kit](https://shopify.github.io/themekit)

```
brew tap shopify/shopify
brew install themekit
```

* Now clone this repo

```
cd wlu
```

* Copy paste your config.yml and run the following command.

```
theme watch
```

## Deploying

After pushing your changes to git, run the below command

```
theme deploy --env=production
```

## Todo

need to setup automated deployment through deploybot
