## IRIS Scrapper

Contains code that can be to gather some data from IRIS NITK. This
uses Selenium to automate the process of fetching data and then
logging it.

## Usage

1. Clone this repository by running the following command in your
   terminal:

```sh
git clone https://github.com/sbansal1999/iris-scrapper
```

2. Move to the directory containing the cloned repository:

```sh
cd iris-scrapper
```

3. Install the required dependencies:

```sh
npm install
```

4. Move the `.env.example` file to `.env` and fill in the required
   details such as your IRIS username and password:

```sh
mv .env.example .env
```

5. Run the script:

```sh
node index.js
```

6. When the script starts running, a browser window will open and then
   you will be logged in to IRIS. The script will then wait for ~30
   seconds for you to select the Year and do some chages to the table,
   such as filtering the data by Branch, etc. After that, the script
   will start fetching the data.

   Note that this script only fetches the data from the first page of
   the table.

## Contributing

Feel free to contribute to this project by opening an issue or
submitting a pull request.

I will be happy to review your changes and merge them if they seem
good to me.
