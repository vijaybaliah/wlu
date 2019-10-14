# Woman Like You

## Dev Evironment Setup

* For running dev eviromnment in your local you would need to install [Theme kit](https://shopify.github.io/themekit)

```
brew tap shopify/shopify
brew install themekit
```

* Now clone this repo. 

```
cd wlu
```

#### Note
always create your feature branch on top of `release` branch

* Copy paste your config.yml into your local folder and run the following command.

```
theme watch --env=development
```

* To see the preview
```
theme open --env=development
```

## Deployment Steps

After pushing your changes to git `release` branch and run the below command

```
theme deploy --env=production
```

## Todo

need to setup automated deployment through deploybot
